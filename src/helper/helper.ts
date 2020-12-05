import { Cell } from "../types";

export const hasStart = (labirint: readonly Cell[][]) => {
  let bool = false;
  labirint.map(row => row.map(cell => {
    if(cell.isStart) {
      bool = true;
    }
  }));
  return bool;
}

export const hasFinish = (labirint: readonly Cell[][]) => {
  let bool = false;
  labirint.map(row => row.map(cell => {
    if(cell.isFinish) {
      bool = true;
    }
  }));
  return bool;
}