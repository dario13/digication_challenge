import { COLUMN_WIDTH, GUTTER_SIZE } from '../src/constants';
import {
  getNewRectangleHeight,
  getNewRectangleLeft,
  getNewRectangleTop,
  getNewRectangleWidth,
  getRectangleHeightWithGutter,
  getRectangleTopWithGutter,
  moduleWidth2RectangleWidth,
  moduleX2RectangleLeft,
  moduleX2RectangleTop,
  rectangleLeft2ModuleX,
  rectangleTop2ModuleY,
} from '../src/helpers';

describe('helpers', () => {
  test('moduleWidth2RectangleWidth', () => {
    const w = 2;
    expect(moduleWidth2RectangleWidth(w)).toEqual(w * COLUMN_WIDTH - GUTTER_SIZE);
  });

  test('moduleX2RectangleLeft', () => {
    const x = 3;
    expect(moduleX2RectangleLeft(x)).toEqual(moduleWidth2RectangleWidth(x) + GUTTER_SIZE * 2);
  });

  test('moduleX2RectangleTop', () => {
    const y = 4;
    expect(moduleX2RectangleTop(y)).toEqual(y + GUTTER_SIZE);
  });

  test('rectangleLeft2ModuleX', () => {
    const localX = 100;
    expect(rectangleLeft2ModuleX(localX)).toEqual(Math.round((localX - GUTTER_SIZE * 2) / COLUMN_WIDTH));
  });

  test('rectangleTop2ModuleY', () => {
    const localY = 150;
    expect(rectangleTop2ModuleY(localY)).toEqual(localY - GUTTER_SIZE);
  });

  test('getNewRectangleTop', () => {
    const initialPosition = 50;
    const offset = 10;
    expect(getNewRectangleTop(initialPosition, offset)).toEqual(
      initialPosition + Math.round(offset / GUTTER_SIZE) * GUTTER_SIZE
    );
  });

  test('getRectangleTopWithGutter', () => {
    const Ycoordinate = 75;
    expect(getRectangleTopWithGutter(Ycoordinate)).toEqual(moduleX2RectangleTop(Ycoordinate) - GUTTER_SIZE / 2);
  });

  test('getNewRectangleLeft', () => {
    const initialPosition = 100;
    const offset = 20;
    expect(getNewRectangleLeft(initialPosition, offset)).toEqual(
      initialPosition + Math.round(offset / COLUMN_WIDTH) * COLUMN_WIDTH
    );
  });

  test('getNewRectangleHeight', () => {
    const initialPosition = 150;
    const offset = 30;
    const height = 200;
    expect(getNewRectangleHeight(initialPosition, offset, height)).toEqual(
      getNewRectangleTop(initialPosition, offset) + height
    );
  });

  test('getRectangleHeightWithGutter', () => {
    const Ycoordinate = 250;
    const height = 200;
    expect(getRectangleHeightWithGutter(Ycoordinate, height)).toEqual(Ycoordinate + height + GUTTER_SIZE * 2);
  });

  test('getNewRectangleWidth', () => {
    const initialPosition = 300;
    const offset = 40;
    const width = 150;
    expect(getNewRectangleWidth(initialPosition, offset, width)).toEqual(
      getNewRectangleLeft(initialPosition, offset) + moduleWidth2RectangleWidth(width)
    );
  });

  test('getRectangleWidthWithGutter', () => {
    const Xcoordinate = 350;
    const width = 100;
    expect(getRectangleHeightWithGutter(Xcoordinate, width)).toEqual(Xcoordinate + width + GUTTER_SIZE * 2);
  });
});
