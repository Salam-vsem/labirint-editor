import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Group } from 'react-konva';
import {useLabirintStore} from '../store/Labirint';
import Wall from './Wall';
import { Cell, Direction, PassInfo } from '../types';
import { observer } from 'mobx-react-lite';
import { isNumber } from 'util';
import { colors } from '../config/colors';


export const LabirintDoorsLayer: React.FC= observer(() => {
  const store = useLabirintStore();
  const wallSize = store.wallSize;
  const cellSize = store.cellSize;

  const formVerticalText = (text: string) => {
    let finaltext = ''
    for(let i = 0; i < text.length; i++) {
      finaltext += text[i] + '\n';
    }
    return finaltext
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
              if (isNumber(value)) {
                const x = cellIndex * (cellSize + wallSize);
                const y = rowIndex * (cellSize + wallSize);

                switch (index) {
                  case (Direction.down):
                    if(rowIndex === 4) {
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
                          bg={colors.doorColor}
                          text={{
                            x: x + cellSize / 2 - value.toString().length * 3.5,
                            y: y + wallSize + wallSize * 0.2,
                            text: value.toString()
                          }}
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
                        bg={colors.doorColor}
                        text={{
                          x: x + cellSize / 2 - value.toString().length * 3.5,
                          y: y - wallSize + wallSize * 0.2,
                          text: value.toString()
                        }}
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
                        height={cellSize + cellSize * 0.24}
                        bg={colors.doorColor}
                        text={{
                          x: x + cellSize + wallSize * 0.3,
                          y: y + cellSize / 2 - value.toString().length * 5,
                          text: formVerticalText(value.toString())
                        }}
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
                          height={cellSize + cellSize * 0.24}
                          bg={colors.doorColor}
                          text={{
                            x: x - wallSize / 2,
                            y: y,
                            text: formVerticalText(value.toString())
                          }}
                        />
                      )
                    }
                  }
                }
            })
          )))
        }
      </Layer>
    </>
  )
});

export default LabirintDoorsLayer;