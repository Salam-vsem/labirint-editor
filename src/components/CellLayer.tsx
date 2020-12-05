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
    // console.log(cell.isStart);
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
      {/* <Text text="Some text on canvas" fontSize={15} />
      <Rect
        x={20}
        y={50}
        width={100}
        height={100}
        fill="red"
        shadowBlur={10}
      />
      <Circle x={200} y={100} radius={50} fill="green" />
      <Line
        x={20}
        y={200}
        points={[0, 0, 100, 0, 100, 100]}
        tension={0.5}
        closed
        stroke="black"
        fillLinearGradientStartPoint={{ x: -50, y: -50 }}
        fillLinearGradientEndPoint={{ x: 50, y: 50 }}
        fillLinearGradientColorStops={[0, 'red', 1, 'yellow']} */}
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