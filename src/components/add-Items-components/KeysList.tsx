import React, { useRef, useState } from 'react';
import { useLabirintStore, saveLabirint, saveKeys } from '../../store/Labirint';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { isNumber, isUndefined } from 'util';
import { Direction } from '../../types';
import { Kaleidoscope } from 'konva/types/filters/Kaleidoscope';
import { colors } from '@src/config/colors';

interface ContainerProps {
  top: number;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-self: flex-end;
  align-items: center;
  min-width: 200px;
  height: 100vh;
  background-color: ${colors.keysListBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  display: none;

  &.show {
    display: inherit;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 150px;
  font-size: 18px;
  background: transparent;
  border: 2px solid #e631f9;
  margin: 15px 0;
`;

const StyledOption = styled.option`
  padding: 5px;
  color: #fff;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #e631f9;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #e631f9;
  border: none;
  /* border-width: 80%; */
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #a225af;
  }
`;

// const StyledInput = styled.input`
//   border: 1px solid red;
//   padding: 5px;
//   margin: 5px 0;
//   background: transparent;
// `;

export const KeysList: React.FC = observer(() => {
  const store = useLabirintStore();
  const selectRef = useRef<HTMLSelectElement>(null);

  const [selected, setSelected] = useState(false);

  const addKey = () => {
    store.keys.push(store.keys.length + 1);
    saveKeys(store.keys);
  }

  const removeKey = () => {
    const index = store.keys.length - 1;
    store.keys.splice(index, 1);
    // store.selectedKey = undefined;
    for(let i = 0; i < store.keys.length; i++) {
      store.keys[i] = i + 1;
    }
    store.labirint.map((row, rowIndex) => row.map((col, colIndex) => {
      if(col.keys && col.keys.some(key => key === index + 1)) {
        const keyIndex = col.keys.indexOf(index + 1);
        store.labirint[rowIndex][colIndex].keys!.splice(keyIndex, 1);
      }
      Object.values(col.directions).map((value, valueIndex: Direction) => {
        if(isNumber(value) && value === index + 1) {
          store.labirint[rowIndex][colIndex].directions[valueIndex] = true;
        }
      });
    }));
    saveLabirint(store.labirint as any);
    saveKeys(store.keys);
  }

  const updateSelectedKey = () => {
    const selectedKey = selectRef.current!.value;
    store.selectedKey = Number(selectedKey);
  }

  return (
    <Container
      // className={(store.selectedItemToChange === 1 || store.selectedItemToChange === 2) ? 'show': ''}
      className="show"
      top={store.selectedItemToChange * 10}
      onChange={updateSelectedKey}
    >
      <span>Select key</span>
      <StyledSelect
        ref={selectRef}
        multiple
        defaultValue={undefined}
      >
        <StyledOption
          value={undefined}
        >
          None
        </StyledOption>
        {
          store.keys.map((key, index) => (
            <StyledOption
              key={index}
              value={key}
              onDoubleClick={() => removeKey()}
            >
              {'Key ' + key}
            </StyledOption>
          ))
        }
      </StyledSelect>
      <StyledButton onClick={addKey}>Add new key</StyledButton>
    </Container>
  );
});

export default KeysList;