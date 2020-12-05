import { Cell, Direction } from "../types";
// const generator = require('generate-maze');
const mazegeneration = require('maze-generation');

export const createRandomLabirint = (rows: number, cols: number) => {
  const maze = mazegeneration(rows, cols, 35, 'DEPTHFIRST');
  console.log(maze.toString());
  const cells = maze.cells;
  const array: Cell[][] = [];

  for(let i = 0; i < cells.length; i++) {
    array[i] = [];
    for(let j = 0; j < cells[i].length; j++) {
      const walls = cells[i][j].walls;
      array[i][j] = {
        directions: {
          [Direction.up]: !walls.up,
          [Direction.down]: !walls.down,
          [Direction.left]: !walls.left,
          [Direction.right]: !walls.right,
        }
      }
    }
  }
  return array;
}

// export const createRandomLabirint = () => {
//   const maze = generator(5,5);
//   console.log(maze.toString());
//   const array: Cell[][] = [];

//   for(let i = 0; i < maze.length; i++) {
//     array[i] = [];
//     for(let j = 0; j < maze[i].length; j++) {
//       const cell = maze[i][j];
//       array[i][j] = {
//         directions: {
//           [Direction.up]: !cell.top,
//           [Direction.down]: !cell.bottom,
//           [Direction.left]: !cell.left,
//           [Direction.right]: !cell.right,
//         }
//       }
//     }
//   }
//   return array;
// }