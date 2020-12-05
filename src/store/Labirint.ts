import {observable, action} from 'mobx';
import { Cell, Direction, SelectedItemToChange, Labirint, PassInfo } from '../types';
import { createContext, useContext } from 'react';
import { isUndefined, isNumber, isObject } from 'util';
import clearLabirint, { clearDirections, findUneditableDirections} from '../helper/clearlabirint';
import { thisExpression } from '@babel/types';

const loadLabirint = (): Labirint => {
  try {
    return JSON.parse(
      localStorage['labirint']
    );
  } catch (error) {
    return clearLabirint; /// TODO
  }
};

const loadKeys = (): number[] | undefined => {
  try {
    return JSON.parse(
      localStorage['keys']
    );
  } catch (error) {
    return undefined; /// TODO
  }
}

export const saveLabirint = (labirint: Labirint) => {
  console.log('save labirint', new Date())
  localStorage['labirint'] = JSON.stringify(labirint);
};

export const saveKeys = (keys: number[]) => {
  localStorage['keys'] = JSON.stringify(keys);
}

export class LabirintStore {
  @observable
  private _labirint: Labirint;

  @observable
  selectedItemToChange: SelectedItemToChange;

  @observable
  keys: number[];

  @observable
  selectedKey?: number;

  @observable
  cellSize: number;

  @observable
  wallSize: number;

  get labirint(): readonly Cell[][] {
    return this._labirint;
  }

  set labirint(value) {
    this._labirint = value as Cell[][];
    this.cellSize = this.getCellSize();
    this.wallSize = this.getWallSize();
    saveLabirint(this._labirint);
  }

  constructor() {
    this._labirint = loadLabirint();
    console.log('this labirint length: ', this._labirint.length)
    console.log( document.documentElement.clientWidth)
    this.cellSize = this.getCellSize();
    this.wallSize = this.getWallSize();
    this.selectedItemToChange = SelectedItemToChange.noneSelected;
    const keys = loadKeys();
    if(keys) {
      this.keys = keys;
    }
    else {
      this.keys = this.fillKeys();
    }
  }

  @action
  getCellSize() {
    return document.documentElement.clientWidth > document.documentElement.clientHeight?
    document.documentElement.clientHeight * 0.8 / (this.labirint.length):
    document.documentElement.clientWidth * 0.8 / (this.labirint.length);
  }

  getWallSize() {
    return this.cellSize * 0.13;

  }

  @action
  updateSizes() {
    this.cellSize = this.getCellSize();
    this.wallSize = this.getWallSize();
  }

  @action
  setWall(row: number, col: number, direction: Direction, info: PassInfo) {

    if(direction === Direction.left) {
      this._labirint[row][col].directions[direction] = info;
      this._labirint[row][col - 1].directions[Direction.right] = info;
    }
    else if(direction === Direction.right) {
      this._labirint[row][col].directions[direction] = info;
      this._labirint[row][col + 1].directions[Direction.left] = info;
    }
    else if(direction === Direction.up) {
      this._labirint[row][col].directions[direction] = info;
      this._labirint[row - 1][col].directions[Direction.down] = info;
    }
    else if(direction === Direction.down) {
      this._labirint[row][col].directions[direction] = info;
      this._labirint[row + 1][col].directions[Direction.up] = info;
    }
    saveLabirint(this._labirint);
  }

  fillKeys() {
    const arr: number[] = [];
    this._labirint.map(row => row.map(cell => {
      if(cell.keys) {
        for(const cellKey of cell.keys) {
          if(arr.every(key => key !== cellKey)) {
            arr.push(cellKey);
          }
        }
      }
      Object.values(cell.directions).map(value => {
        if(isNumber(value) && arr.every(key => key !== value)) {
          arr.push(value);
        }
      })
    }));
    arr.sort();
    return arr;
  }

  @action
  clearLabirint() {

    for(let row = 0; row < this.labirint.length; row++) {
      for(let col = 0; col < this.labirint[row].length; col++) {
        let cell = this.labirint[row][col];
        if(cell.keys) {
          cell.keys = undefined;
        }
        if(cell.isStart) {
          cell.isStart = undefined;
        }
        if(cell.isFinish) {
          cell.isFinish = undefined;
        }
        const unEditableDirections = findUneditableDirections(row, col, this.labirint.length);
        if(unEditableDirections.length > 0) {
          clearDirections(cell, unEditableDirections);
        }
        else {
          clearDirections(cell);
        }
      }
    }
    this.keys = [];
    this.selectedItemToChange = SelectedItemToChange.noneSelected;
    saveLabirint(this._labirint);
    saveKeys(this.keys);
  }
}

const labirintStore = createContext(new LabirintStore());
export const useLabirintStore = () => useContext(labirintStore);