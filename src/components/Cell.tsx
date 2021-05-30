import React, { useState, useEffect } from 'react';
import { Rect, Group, Text } from 'react-konva';
import { MenuOptions } from '@src/types';
import { useLabirintStore, saveLabirint } from '@src/store/Labirint';
import { colors } from '@src/config/colors';
import { observer } from 'mobx-react-lite';
import { hasStart, hasFinish } from '@src/helper/helper';
import startImg from '../images/icons/027-flower.png';

interface CellProps {
  x: number;
  y: number;
  bg: string;
  row: number;
  col: number;
}

export const CellObject: React.FC<CellProps> = observer((props) => {
  const {x, y, bg, row, col} = props;
  const store = useLabirintStore();
  const labirint = store.labirint;
  const cellSize = store.cellSize;
  const cell = labirint[row][col];

  const [color, setColor] = useState(bg);
  const startImage = new window.Image(100,100);
  startImage.src = startImg;

  useEffect(() => {
    setColor(bg);
  }, [bg]);

  const switchColor = (): string => {
    if(cell.isStart) {
      return colors.startHoverColor;
    }
    if(cell.isFinish) {
      return colors.finishHoverColor;
    }
    return colors.cellHoverColor;
  }

  const onClickFunc = () => {
    if(store.menuOption === MenuOptions.start ) {
      cell.isFinish = false;
      cell.keys = [];
      cell.isStart? cell.isStart = !cell.isStart: cell.isStart = true;
      labirint.forEach((v, rowI) => v.forEach((v, colI) => {
        if(row === rowI && col === colI) {
          return
        }
        if(v.isStart) {
          return labirint[rowI][colI].isStart = false
        }
      }))
    }
    else if(store.menuOption === MenuOptions.finish) {
      cell.isStart = false;
      cell.keys = [];
      cell.isFinish? cell.isFinish = !cell.isFinish: cell.isFinish = true;
      labirint.forEach((v, rowI) => v.forEach((v, colI) => {
        if(row === rowI && col === colI) {
          return
        }
        if(v.isFinish) {
          return labirint[rowI][colI].isFinish = false
        }
      }))
    }
    else if(
      store.selectedKey &&
      !cell.isStart &&
      !cell.isFinish
    ){
      if(cell.keys) {
        if(cell.keys.every(key => key !== store.selectedKey) && cell.keys.length < 4) {
          cell.keys.push(store.selectedKey);
        }
        else if(cell.keys.some(key => key === store.selectedKey)){
          const index = cell.keys.indexOf(store.selectedKey);
          cell.keys.splice(index, 1);
        }
      }
      else {
        cell.keys = [];
        cell.keys.push(store.selectedKey);
      }
    }
    saveLabirint(labirint as any);
  }

  return (
    <Group
      onMouseEnter={() => setColor(switchColor())}
      onMouseLeave={() => setColor(bg)}
      onclick={onClickFunc}
      x={x}
      y={y}
    >
      <Rect
        width={cellSize}
        height={cellSize}
        // fill={colors.cellColor}
        fill={color}
        // stroke={'black'}
        // onClick={() => console.log('clicked\n', 'x:', x, '\ny: ', y)}
      />
      {
        cell.keys &&
        <Text
          // padding= {20}
          width={cellSize}
          align= 'center'
          verticalAlign= 'middle'
          fill="#fff"
          fontStyle="bold"
          fontSize={cellSize * 0.2}
          key={col}
          height={cellSize}
          text={cell.keys.slice().sort().join(', ')}
        />
      }
    </Group>
  )
});

export default CellObject