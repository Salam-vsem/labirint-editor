import { Cell, Direction, PassInfo } from "../types";

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

const isAvailableDoor = (directionValue: PassInfo, keys: number[]): boolean => {
  return (typeof directionValue === 'number') && keys.some(key => key === directionValue)
}

const findAvailableDirections = (cell: Cell, keys: number[], prevDirection?: Direction): Direction[] => {
  return Object
    .keys(cell.directions)
    .map(key => Number(key) as Direction)
    .filter(direction =>
      (cell.directions[direction] === true || isAvailableDoor(cell.directions[direction], keys)) &&
      (direction !== invertDirection(prevDirection!))
    );
}

const findClosedDoors = (cell: Cell, keys: number[], prevDirection?: Direction): Direction[] => {
  return Object
    .keys(cell.directions)
    .map(key => Number(key) as Direction)
    .filter(direction =>
      (typeof cell.directions[direction] === 'number') &&
      !isAvailableDoor(cell.directions[direction], keys) &&
      (direction !== invertDirection(prevDirection!))
    );
}

const isEmtyDirection = (cell: Cell, direction: Direction) => {
  return Object.values(cell.directions).some((value, index) => (
    index === direction && !((typeof value === 'number') || !value)
  ));
}
const isTilesStructureCorrect = (labirint: readonly Cell[][]): boolean => {
  let result = true;
  for(let row = 0; row < labirint.length - 1; row++) {
    for (let col = 0; col < labirint[row].length - 1; col++) {
      const cell1 = labirint[row][col];
      const cell2 = labirint[row + 1][col];
      const cell3 = labirint[row][col + 1];
      const cell4 = labirint[row + 1][col + 1];
      if(isEmtyDirection(cell1, Direction.right) && 
        isEmtyDirection(cell2, Direction.up) &&
        isEmtyDirection(cell3, Direction.down) &&
        isEmtyDirection(cell4, Direction.left)) {
        result = false;
      }
    }
  }
  return result;
}

const getNewPosition = (position: Position, direction: Direction): Position => {
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

type Step = true | undefined;
type RememberedDoors = Record<number, [Position, Direction]>;

export const IsLabirintStructureCorrect = (labirint: readonly Cell[][]): true | string => {
  const steps: Step[][] = [];
  for(let i = 0; i < labirint.length; i++) {
    steps[i] = [];
  }
  const rememberedDoors: RememberedDoors = {}
  const keys: number[] = [];
  const startPosition = findStartPosition(labirint);
  const finishPosition = findFinishPosition(labirint);

  const checkCells = (
    position: Position,
    prevDirection?: Direction
  ): boolean => {
    const cell = findCell(labirint, position);

    if (cell.isFinish) {
      return true;
    }

    steps[position.row][position.col] = true;

    if(cell.keys) {
      keys.push(...cell.keys);
      for (const key of cell.keys) {
        if (key in rememberedDoors) {
          const [newPosition, newPrevDirection] = rememberedDoors[key];
          const foundFinish = checkCells(newPosition, newPrevDirection);
          if (foundFinish) {
            return true;
          }
        }
      }
    }

    const availableDirections = findAvailableDirections(cell, keys, prevDirection);
    const closedDoors = findClosedDoors(cell, keys, prevDirection); 
    closedDoors.map(direction => {
      const key = cell.directions[direction];
      if((typeof key === 'number') && (prevDirection !== undefined)) {
        rememberedDoors[key] = [position, prevDirection];
      }
    });
    // получить массив который содержит в себе | ключ: [новую позицию, prevDirection] -> rememberedDoors

    for (const direction of availableDirections) {
      const newPosition = getNewPosition(position, direction);
      if(!steps[newPosition.row][newPosition.col]) {
        prevDirection = direction;
        const foundFinish = checkCells(newPosition, prevDirection);
        if(foundFinish) {
          return true;
        }
      }
    }
    return false;
  }

  if(!startPosition || !finishPosition) {
    return 'Нужно добавить старт и финиш';
  }

  if(!isTilesStructureCorrect(labirint)) {
    return 'Слишком много пустых клеток';
  }

  const result = checkCells(startPosition);

  if (!result) {
    return 'Лабиринт невозможно пройти';
  }

  return true;
}