import React from 'react';
import { useLabirintStore } from '../store/Labirint';
import { Group, Layer } from 'react-konva';
import CellObject from './Cell';
import { colors } from '../config/colors';
import { Cell } from '../types';
import { observer } from 'mobx-react-lite';

export const CellLayer: React.FC = observer(() => {
  const store = useLabirintStore();
  const cellSize = store.cellSize;
  const wallSize = store.wallSize;

  const switchColor = (cell: Cell) => {
    if(cell.isStart === true) {
      return (colors.startColor);
    }
    else if(cell.isFinish === true) {
      return colors.finishColor;
    }
    return colors.cellColor;
  }
  return (
    <Layer>
        <Group
          x={50}
          y={50}
        >
          {
            store.labirint.map((row, rowIndex) => row.map((cell, cellIndex) => (
              <CellObject
                key={cellIndex}
                x={cellIndex * (cellSize + wallSize)}
                y={rowIndex * (cellSize + wallSize)}
                row={rowIndex}
                index={cellIndex}
                bg={switchColor(cell)}
              />
            )))
          }
        {/* {
          rectangles.map(row => row.map((cell, index) => (
            <Cell
              key={index}
              cell={cell}
            />
          )))
        } */}
        </Group>
    </Layer>
  );
});

export default CellLayer;