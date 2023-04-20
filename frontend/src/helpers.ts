import { COLUMN_WIDTH, GUTTER_SIZE, CONTAINER_WIDTH } from './constants';
import RectangleInterface from './types/RectangleInterface';

/**
 * Converts module width to rectangle width.
 * @param {number} moduleW - The module width.
 * @returns {number} The rectangle width.
 */
export const moduleWidth2RectangleWidth = (moduleW: number): number => moduleW * COLUMN_WIDTH - GUTTER_SIZE;

/**
 * Converts module X position to rectangle left position.
 * @param {number} moduleX - The module X position.
 * @returns {number} The rectangle left position.
 */
export const moduleX2RectangleLeft = (moduleX: number): number => moduleWidth2RectangleWidth(moduleX) + GUTTER_SIZE * 2;

/**
 * Converts module Y position to rectangle top position.
 * @param {number} moduleY - The module Y position.
 * @returns {number} The rectangle top position.
 */
export const moduleX2RectangleTop = (moduleY: number): number => moduleY + GUTTER_SIZE;

/**
 * Converts rectangle left position to module X position.
 * @param {number} localX - The rectangle left position.
 * @returns {number} The module X position.
 */
export const rectangleLeft2ModuleX = (localX: number): number => {
  return Math.round((localX - GUTTER_SIZE * 2) / COLUMN_WIDTH);
};

/**
 * Converts rectangle top position to module Y position.
 * @param {number} localY - The rectangle top position.
 * @returns {number} The module Y position.
 */
export const rectangleTop2ModuleY = (localY: number): number => {
  return localY - GUTTER_SIZE;
};

/**
 * Calculates the new top position of a rectangle.
 * @param {number} initialPosition - The initial position.
 * @param {number} offset - The offset.
 * @returns {number} The top position of a rectangle.
 */
export const getNewRectangleTop = (initialPosition: number, offset: number): number => {
  return initialPosition + Math.round(offset / GUTTER_SIZE) * GUTTER_SIZE;
};

/**
 * Calculates the top position of a rectangle with gutter.
 * @param {number} Ycoordinate - The Y coordinate.
 * @returns {number} The top position of a rectangle with gutter.
 */
export const getRectangleTopWithGutter = (Ycoordinate: number): number => {
  return moduleX2RectangleTop(Ycoordinate) - GUTTER_SIZE / 2;
};

/**
 * Calculates the new left position of a rectangle.
 * @param {number} initialPosition - The initial position.
 * @param {number} offset - The offset.
 * @returns {number} The left position of a rectangle.
 */
export const getNewRectangleLeft = (initialPosition: number, offset: number): number => {
  return initialPosition + Math.round(offset / COLUMN_WIDTH) * COLUMN_WIDTH;
};

/**
 * Calculates the height of a rectangle.
 * @param {number} initialPosition - The initial position.
 * @param {number} offset - The offset.
 * @param {number} height - The height.
 * @returns {number} The height of a rectangle.
 */
export const getNewRectangleHeight = (initialPosition: number, offset: number, height: number): number => {
  return getNewRectangleTop(initialPosition, offset) + height;
};

/**
 * Calculates the height of a rectangle with gutter.
 * @param {number} Ycoordinate - The Y coordinate.
 * @param {number} height - The height.
 * @returns {number} The height of a rectangle with gutter.
 */
export const getRectangleHeightWithGutter = (Ycoordinate: number, height: number): number => {
  return Ycoordinate + height + GUTTER_SIZE * 2;
};

/**
 * Calculates the width of a rectangle.
 * @param {number} initialPosition - The initial position.
 * @param {number} offset - The offset.
 * @param {number} width - The width.
 * @returns {number} The width of a rectangle.
 */
export const getNewRectangleWidth = (initialPosition: number, offset: number, width: number): number => {
  return getNewRectangleLeft(initialPosition, offset) + moduleWidth2RectangleWidth(width);
};

/**
 * Calculates the width of a rectangle with gutter.
 * @param {number} Xcoordinate - The X coordinate.
 * @param {number} width - The width.
 * @returns {number} The width of a rectangle with gutter.
 */
export const getRectangleWidthWithGutter = (Xcoordinate: number, width: number): number => {
  return moduleX2RectangleLeft(Xcoordinate) + moduleWidth2RectangleWidth(width);
};

/**
 * Determines if two rectangles are colliding.
 * @param {RectangleInterface} rectA - The first rectangle.
 * @param {RectangleInterface} rectB - The second rectangle.
 * @returns {boolean} True if the rectangles are colliding, false otherwise.
 */
export const isRectangleColliding = (rectA: RectangleInterface, rectB: RectangleInterface): boolean => {
  return rectA.left < rectB.width && rectA.width > rectB.left && rectA.top < rectB.height && rectA.height > rectB.top;
};

/**
 * Determines if a rectangle is out of bounds.
 * @param {RectangleInterface} rect - The rectangle to check.
 * @param {number} containerHeight - The container height.
 * @returns {boolean} True if the rectangle is out of bounds, false otherwise.
 */
export const isOutOfBounds = (rect: RectangleInterface, containerHeight: number): boolean => {
  const { top, left, height, width } = rect;
  if (top < 0 || left < 0 || height > containerHeight || width > CONTAINER_WIDTH) {
    return true;
  }
  return false;
};
