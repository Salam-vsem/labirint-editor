import React, { useState } from 'react';
import { Rect, Group, Text } from 'react-konva';
import { Cell, Direction, MenuOptions } from '../types';
import { useLabirintStore, saveLabirint } from '../store/Labirint';
import { isNumber, isUndefined } from 'util';
import { colors } from '../config/colors';
import { observer } from 'mobx-react-lite';
import { findUneditableDirections } from '@src/helper/clearlabirint';

interface TextPorps {
  x: number;
  y: number;
  text: string;
}

interface WallProps {
  x: number;
  y: number;
  width: number;
  height: number;
  bg: string;
  direction: Direction;
  row: number;
  index: number;
  text?: TextPorps;
}

export const Wall: React.FC<WallProps> = (props) => {
  const store = useLabirintStore();
  const {x, y, width, height, bg, direction, row, index: col, text} = props;
  const [hover, setHover] = useState(false);
  
  const editWalls = () => {
    if(findUneditableDirections(row, col, store.labirint.length).some(unEditableDirection => unEditableDirection === direction)) {
      return;
    }
    else {
      if(bg === colors.emptyWallColor) {
        // if(
        //   store.selectedItemToChange === SelectedItemToChange.walls ||
        //   store.selectedItemToChange === SelectedItemToChange.keys
        // ) {
        //   console.log('direction: ', direction);
          // try {
          // store.setWall(row, col, direction, false);
          // }catch(e){}
        // }
        // if(store.selectedItemToChange === SelectedItemToChange.doors) {
          console.log('direction: ', direction);
        if(store.selectedKey) {
          try {
            store.setWall(row, col, direction, store.selectedKey);
            }catch(e){}
        }
        // }
        else {
          try {
            store.setWall(row, col, direction, false);
          }catch(e){}
        }
      }
      else {
        console.log('direction: ', direction);
        try {
          store.setWall(row, col, direction, true);
          }catch(e){}
      }
    }
    // saveLabirint(store.labirint);
  }

  return (
    <Group
      onClick={() => editWalls()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      x={x-1}
      y={y-1}
    >
      <Rect
        width={width + 2}
        height={height + 2}
        fill={bg === colors.emptyWallColor && hover ? colors.cellHoverColor : bg}
        shadowEnabled={false}
        // strokeWidth={color === 'red'? strokeWidth: 0}
      />
      {
        text &&
        <Text 
          align="center"
          verticalAlign="middle"
          width={width + 2}
          height={height + 4}
          text={text.text}
          fill="#fff"
          fontSize = {store.cellSize * 0.1}
        />
      }
    </Group>
  )
}

export default Wall;