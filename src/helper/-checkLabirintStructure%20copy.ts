import { Cell, Direction } from "../types";
import { isNumber } from "util";

interface Position {
  row: number;
  col: number;
}

const findStartPosition = (labirint: readonly Cell[][]): Position| undefined => {
  const row = labirint.find(row => row.find(cell => cell.isStart));
  if(row) {
    const cell = row.find(cell => cell && cell.isStart);
    const rowIndex = labirint.indexOf(row);
    if(cell) {
      const colIndex = labirint[rowIndex].indexOf(cell);
      console.log('here')
      return {
        row: rowIndex,
        col: colIndex
      }
    }
  }
  return undefined
}

const findFinishPosition = (labirint: readonly Cell[][]): Position| undefined => {
  const row = labirint.find(row => row.find(cell => cell.isFinish));
  if(row) {
    const cell = row.find(cell => cell && cell.isFinish);
    const rowIndex = labirint.indexOf(row);
    if(cell) {
      const colIndex = labirint[rowIndex].indexOf(cell);
      return {
        row: rowIndex,
        col: colIndex
      }
    }
  }
  return undefined
}

const findCell = (labirint: readonly Cell[][], position: Position): Cell => {
  return labirint[position.row][position.col];
}

const findAvailableDirections = (cell: Cell, prevDirection?: Direction): Direction[] => {
  const availableDirections = Object
  .keys(cell.directions)
  .map(key => Number(key) as Direction)
  .filter(direction =>
    (cell.directions[direction] === true || isNumber(cell.directions[direction])) &&
    (direction !== invertDirection(prevDirection!))
    );
  return availableDirections;
}

const LabirintHasKey = (selector: number, labirint: readonly Cell[][]): boolean => {
  return labirint.some(row => row.some(col => col.keys && col.keys.some(key => key === selector)));
}

const newPosition = (position: Position, direction: Direction): Position => {
  switch (direction) {
    case Direction.up:
      return {
        row: position.row - 1,
        col: position.col,
      };
    case Direction.down:
      return {
        row: position.row + 1,
        col: position.col,
      };
    case Direction.left:
      return {
        row: position.row,
        col: position.col - 1,
      };
    case Direction.right:
      return {
        row: position.row,
        col: position.col + 1,
      };
  }
}

const invertDirection = (direction: Direction) => {
  switch (direction) {
    case Direction.left:
      return Direction.right;
    case Direction.right:
      return Direction.left;
    case Direction.up:
      return Direction.down;
    case Direction.down:
      return Direction.up;
  }
}

// TODO: не выходит если находит финиш
const checkCells = (labirint: readonly Cell[][], position: Position, prevDirection?: Direction): boolean => {
  const cell = findCell(labirint, position);
  console.log('current cell: ', position.row + ' ' + position.col);
  if(cell.isFinish) {
    console.log('labirint is correct');
    return true;
  }
  const availableDirections = findAvailableDirections(cell, prevDirection);
  console.log('availableDirections: ', availableDirections);

  if(availableDirections.length === 0) {
    console.log('no directions');
    return false;
  }

  availableDirections.map(direction => {
    const directionValue = cell.directions[direction];
    if(isNumber(directionValue) && !LabirintHasKey(directionValue, labirint)) {
      console.log('door error');
      return false;
    }
    else {
      console.log('move to next cell');
      console.log('//////////////////////')
      prevDirection = direction;
      return checkCells(labirint, newPosition(position, direction), prevDirection);
    }
  });
  return false;
}

export const IsLabirintStructureCorrect = (labirint: readonly Cell[][]): boolean => {
  let answer = false;
  console.log('started');
  const startPosition = findStartPosition(labirint);
  const finishPosition = findFinishPosition(labirint);
  console.log(startPosition);
  console.log(finishPosition);
  if(startPosition && finishPosition) {
    console.log('start checking cells');
    try {
      answer = checkCells(labirint, startPosition);
      console.log('result: ', answer);
    }catch(e) {
    }
  }
  // console.log('result: ', answer);
  return answer;
}