import React, { useState, useEffect } from 'react';
import { Rect, Group, Text } from 'react-konva';
import { SelectedItemToChange } from '@src/types';
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
  index: number;
}

export const CellObject: React.FC<CellProps> = observer((props) => {
  const {x, y, bg, row, index} = props;
  const store = useLabirintStore();
  const labirint = store.labirint;
  const cellSize = store.cellSize;
  const cell = labirint[row][index];

  const [color, setColor] = useState(bg);
  const startImage = new window.Image(100,100);
  startImage.src = startImg;

  useEffect(() => {
    setColor(bg);
  }, [bg]);

  const switchColor = (): string => {
    if(store.selectedItemToChange === SelectedItemToChange.noneSelected && !store.selectedKey) {
      return colors.cellColor
    }
    if(bg === colors.startColor) {
      return colors.startHoverColor;
    }
    if(bg === colors.finishColor) {
      return colors.finishHoverColor;
    }
    return colors.cellHoverColor;
  }

  const onClickFunc = () => {
    if(store.selectedItemToChange === SelectedItemToChange.start && (!hasStart(labirint) || cell.isStart)) {
      cell.isFinish = false;
      const isStart = cell.isStart;
      isStart? cell.isStart = !isStart: cell.isStart = true;
    }
    else if(store.selectedItemToChange === SelectedItemToChange.finish && (!hasFinish(labirint) || cell.isFinish)) {
      cell.isStart = false;
      const isFinish = cell.isFinish;
      isFinish? cell.isFinish = !isFinish: cell.isFinish = true;
    }
    else if(
      store.selectedKey&&
      !cell.isStart &&
      !cell.isFinish &&
      (cell.keys === undefined || cell.keys.length < 4)
    ){
      if(cell.keys) {
        if(cell.keys.every(key => key !== store.selectedKey)) {
          cell.keys.push(store.selectedKey);
        }
        else {
          const index = cell.keys.indexOf(store.selectedKey);
          cell.keys.splice(index, 1);
        }
      }
      else {
        cell.keys = [];
        cell.keys.push(store.selectedKey);
      }
    }
    saveLabirint(store.labirint as any);
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
          key={index}
          height={cellSize}
          text={cell.keys.slice().sort().join(', ')}
        />
      }
    </Group>
  )
});

export default CellObject