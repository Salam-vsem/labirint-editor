import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Group } from 'react-konva';
import {useLabirintStore} from '../store/Labirint';
import Wall from './Wall';
import { Cell, Direction, PassInfo } from '../types';
import { observer } from 'mobx-react-lite';
import { isNumber } from 'util';
import { colors } from '../config/colors';

interface LabirintCellProps {
  wallValue: boolean
}

export const LabirintLayer: React.FC<LabirintCellProps> = observer((props) => {
  const store = useLabirintStore();
  const wallSize = store.wallSize;
  const cellSize = store.cellSize;
  const wallValue = props.wallValue;

  const chooseColor = (value: PassInfo) => {
    if(value === false) {
      return colors.wallColor;
    }
    return colors.emptyWallColor;
  }

  return (
    <>
    <Layer
        x={50}
        y={50}
      >
        {
          store.labirint.map((row, rowIndex) => row.map((cell, cellIndex) => (
            Object.values(cell.directions).map((value, index) => {
              if (value === wallValue || isNumber(value)) {
                return null;
              }
              const x = cellIndex * (cellSize + wallSize);
              const y = rowIndex * (cellSize + wallSize);

              switch (index) {
                case (Direction.down):
                  if(rowIndex === store.labirint[rowIndex].length - 1) {
                    return (
                      <Wall
                        row={rowIndex}
                        index={cellIndex}
                        direction={Direction.down}
                        key={index}
                        x={x - (cellSize * 0.25 / 2)}
                        y={y + cellSize}
                        width={cellSize + cellSize * 0.25}
                        height={wallSize}
                        bg={chooseColor(value)}
                      />
                    )
                  }
                  return;
                case Direction.up:
                  return (
                    <Wall
                      row={rowIndex}
                      index={cellIndex}
                      direction={Direction.up}
                      key={index}
                      x={x - (cellSize * 0.25 / 2)}
                      y={y - wallSize}
                      width={cellSize + cellSize * 0.25}
                      height={wallSize}
                      bg={chooseColor(value)}
                    />
                  )
                case Direction.right:
                  return (
                    <Wall
                      row={rowIndex}
                      index={cellIndex}
                      direction={Direction.right}
                      key={index}
                      x={x + cellSize}
                      y={y - (cellSize * 0.25 / 2)}
                      width={wallSize}
                      height={cellSize + cellSize * 0.25}
                      bg={chooseColor(value)}
                    />
                  )
                case (Direction.left):
                  if(cellIndex === 0) {
                    return (
                      <Wall
                        row={rowIndex}
                        index={cellIndex}
                        direction={Direction.left}
                        key={index}
                        x={x - wallSize}
                        y={y - (cellSize * 0.25 / 2)}
                        width={wallSize}
                        height={cellSize + cellSize * 0.25}
                        bg={chooseColor(value)}
                      />
                    )
                  }
                  return;
                }
            })
          )))
        }
      </Layer>
    </>
  )
});

export default LabirintLayer;