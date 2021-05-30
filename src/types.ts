import { isObject } from "util";


export enum Direction {
    left,
    right,
    up,
    down,
}

export enum MenuOptions {
    noneSelected,
    // keys,
    // doors,
    start,
    finish,
    // walls,
}

export interface Position {
    row: number;
    col: number; 
}

export interface Player {
    name: string;
    locationMessage: string;
    lookDirection: Direction;
    position: {
        row: number;
        col: number;
    };
    keys: number[];
}

export type DoorKey = number;
export type CanMove = boolean;
export type PassInfo = (CanMove | DoorKey);
export type DirectionsInfo = Record<Direction, PassInfo>;

export interface Cell {
    directions: DirectionsInfo;
    keys?: number[];
    isStart?: boolean;
    isFinish?: boolean;
}

export type Labirint = Cell[][];


/// ...

// const autosave = <T extends Object>(p: T, onSave: () => void): T => (
//     new Proxy(p as any, {
//         get(o, k) {
//             if (isObject(o[k])) {
//                 return autosave(o[k], onSave);
//             }
//             return o[k];
//         },
//         set(o, k, v) {
//             console.log(k, v);
//             o[k] = v;
//             onSave();
//             return true;
//         },
//     })
// );

// const pattern = {
//     test: 'test',
//     obj: { test: 'test' },
//     arr: [1,2,3],
// };
// console.log(pattern);
// const test = autosave(pattern, () => console.log(pattern))
// test.test = '!!!';
// const obj = test.obj;
// obj.test = ')))';
// test.arr[1] = 5;
