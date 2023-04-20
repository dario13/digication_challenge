import React from 'react';
import { Box } from '@mui/material';
import { useDrag, useDragDropManager } from 'react-dnd';
import { useRafLoop } from 'react-use';

import ModuleInterface from '../types/ModuleInterface';
import {
  getRectangleHeightWithGutter,
  getRectangleTopWithGutter,
  getNewRectangleHeight,
  getNewRectangleLeft,
  getNewRectangleWidth,
  getNewRectangleTop,
  isOutOfBounds,
  isRectangleColliding,
  rectangleLeft2ModuleX,
  rectangleTop2ModuleY,
  moduleWidth2RectangleWidth,
  moduleX2RectangleLeft,
  moduleX2RectangleTop,
  getRectangleWidthWithGutter,
} from '../helpers';
import RectangleInterface from '../types/RectangleInterface';

type ModuleProps = {
  data: ModuleInterface;
  moveModule: (module: ModuleInterface) => void;
  containerHeight: number;
  modules: ModuleInterface[];
};

const Module = (props: ModuleProps) => {
  const {
    data: {
      id,
      coord: { x, y, w, h },
    },
    containerHeight,
    modules,
    moveModule,
  } = props;

  // `isValidMove` is a useCallback function that checks if the new position of the rectangle
  // is within the grid boundaries and not colliding with any other rectangle.
  // It returns true if the new position is valid and false otherwise.
  const isValidMove = React.useCallback(
    (rectangle: RectangleInterface) => {
      // Check if the rectangle is within the grid boundaries
      if (isOutOfBounds(rectangle, containerHeight)) {
        return false;
      }

      // Iterate through the other modules to check for collisions
      for (const module of modules) {
        // Skip the current module
        if (module.id === id) continue;

        const { coord } = module;

        // Get the rectangle of the other module
        const rectangleToCheck: RectangleInterface = {
          top: getRectangleTopWithGutter(coord.y),
          left: moduleX2RectangleLeft(coord.x),
          height: getRectangleHeightWithGutter(coord.y, coord.h),
          width: getRectangleWidthWithGutter(coord.x, coord.w),
        };

        // Check if the current module is colliding with the other module
        if (isRectangleColliding(rectangleToCheck, rectangle)) return false;
      }

      return true;
    },
    [containerHeight, h, id, modules, w]
  );

  // Transform x, y to left, top
  const [{ top, left }, setPosition] = React.useState(() => ({
    top: moduleX2RectangleTop(y),
    left: moduleX2RectangleLeft(x),
  }));

  const dndManager = useDragDropManager();
  const initialPosition = React.useRef<{ top: number; left: number }>();

  // Use request animation frame to process dragging
  const [stop, start] = useRafLoop(() => {
    const movement = dndManager.getMonitor().getDifferenceFromInitialOffset();

    if (!initialPosition.current || !movement) {
      return;
    }

    // Get the new position of the rectangle based on the initial position and the movement
    const rectangle: RectangleInterface = {
      top: getNewRectangleTop(initialPosition.current.top, movement.y),
      left: getNewRectangleLeft(initialPosition.current.left, movement.x),
      height: getNewRectangleHeight(initialPosition.current.top, movement.y, h),
      width: getNewRectangleWidth(initialPosition.current.left, movement.x, w),
    };

    if (isValidMove(rectangle)) {
      setPosition({ top: rectangle.top, left: rectangle.left });

      moveModule({
        id,
        coord: { x: rectangleLeft2ModuleX(rectangle.left), y: rectangleTop2ModuleY(rectangle.top), w, h },
      });
    }
  }, false);

  // Wire the module to DnD drag system
  const [, drag] = useDrag(
    () => ({
      type: 'module',
      item: () => {
        // Track the initial position at the beginning of the drag operation
        initialPosition.current = { top, left };

        // Start raf
        start();
        return { id };
      },
      end: stop,
    }),
    [top, left]
  );

  return (
    <Box
      ref={drag}
      display="flex"
      position="absolute"
      border={1}
      borderColor="grey.500"
      padding="10px"
      bgcolor="rgba(0, 0, 0, 0.5)"
      top={top}
      left={left}
      width={moduleWidth2RectangleWidth(w)}
      height={h}
      sx={{
        transitionProperty: 'top, left',
        transitionDuration: '0.1s',
        '& .resizer': {
          opacity: 0,
        },
        '&:hover .resizer': {
          opacity: 1,
        },
      }}
    >
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={40}
        color="#fff"
        sx={{ cursor: 'move' }}
        draggable
      >
        <Box sx={{ userSelect: 'none', pointerEvents: 'none' }}>{id}</Box>
      </Box>
    </Box>
  );
};

export default React.memo(Module);
