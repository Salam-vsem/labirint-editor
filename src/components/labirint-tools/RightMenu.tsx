import React, { useState, useRef } from 'react';
import { useLabirintStore } from '../../store/Labirint';
import { observer } from 'mobx-react-lite';
import { MenuOptions } from '../../types';
import styled from 'styled-components';
import finishImg from '../../images/icons/002-trophy.png'
import startImg from '../../images/icons/027-flower.png';
import downloadImg from '../../images/icons/028-floppy disk.png';
import goBackImg from '../../images/icons/076-monitor.png';
import clearImg from '../../images/icons/011-bones.png';
import testLabirintImg from '../../images/icons/039-gamepad.png';
import createRandomLabirintImg from '../../images/icons/089-magic wand.png';
import Item, { VideoDescriptionProps } from './Item';
import { saveAs } from 'file-saver';
import { useHistory } from 'react-router';
import { routes } from '../../config/routes';
import { IsLabirintStructureCorrect } from '../../helper/checkLabirintStructure';
import { createRandomLabirint } from '../../helper/create-random-labirint';
import Alert from 'react-s-alert';
import KeysList from './KeysList';
import { colors } from '@src/config/colors';
import { items } from './items';

const Container = styled.div`
  display: flex;
  width: 450px;
  max-height: 100vh;
  /* align-self: flex-start; */
  /* margin-left: 80px; */
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.rightMenuBg};
`;

const Menu = styled.div`
  width: 200px;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Row = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
`;


const videoDescriptions: VideoDescriptionProps[] = [
  {
    title: 'Инструмент "Добавление старта"',
    description: 'добавляет старт'
  },
  {
    title: 'Инструмент "Добавление финиша"',
    description: 'добавляет финиш'
  },
  {
    title: 'Инструмент "Редактирование стен"',
    description: 'добавляет и убирает стены'
  },
  {
    title: 'Инструмент "Удаление лабиринта"',
    description: 'полностью стирает лабиринт'
  },
  {
    title: 'Инструмент "Добавление ключей"',
    description: 'добавляет выбранный ключ в клетку'
  },
  {
    title: 'Инструмент "Редактирование дверей"',
    description: 'добавляет или убирает дверь с выбранным ключом'
  },
  {
    title: 'Инструмент "Проверка лабиринта"',
    description: 'проверяет структуру и проходимость лабиринта'
  },
]

export const EditPanel: React.FC = observer(() => {
  const store = useLabirintStore();
  const history = useHistory();

  const download = () => {
    const blob = new Blob([JSON.stringify(store.labirint)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "hello world.json");
  };

  const formResultAnswer = (result: string | boolean) => {
    if(typeof result === 'string') {
      Alert.error(result, {
        effect: 'stackslide'
      });
    }
    else {
      Alert.success('Лабиринт успешно прошел проверку!', {
        effect: 'stackslide'        
      });
    }
  }

  const clearlabirint = () => {
    const answer = window.confirm('Вы точно хотите удалить лабиринт?');
    if(answer) {
      store.clearLabirint();
    }
  }

  // TODO Record<Title, description>
  return (
    <Container>
      <KeysList />
      <Menu>
        <Row>
          <Item
            menuOption={store.menuOption}
            updateMenuOption={(option) => store.menuOption = option} 
            value={MenuOptions.start}
            img={startImg}
            title="Start"
            videotitle='set-start'
            videoDescription={videoDescriptions[0]}
          />
          <Item
            menuOption={store.menuOption}
            updateMenuOption={(option) => store.menuOption = option}
            value={MenuOptions.finish}
            img={finishImg}
            title="Finish"
            videotitle='set-finish'
            videoDescription={videoDescriptions[1]}
            discrLeftPos={530}
          />
        </Row>
        <Row>
          <Item
            menuOption={store.menuOption}
            updateMenuOption={(option) => store.menuOption = option}
            img={testLabirintImg}
            title="Check Labirint"
            onClickFunc={() => formResultAnswer(IsLabirintStructureCorrect(store.labirint))}
            videotitle='check-labirint'
            videoDescription={videoDescriptions[6]}
          />
          <Item 
            menuOption={store.menuOption}
            updateMenuOption={(option) => store.menuOption = option}
            img={downloadImg}
            title="Download" onClickFunc={download}
          />
        </Row>
        <Row>
          <Item
            menuOption={store.menuOption}
            updateMenuOption={(option) => store.menuOption = option}
            img={clearImg}
            title="Clear Labirint"
            onClickFunc={clearlabirint}
            videotitle='delete-labirint'
            videoDescription={videoDescriptions[3]}
          />
          <Item
            menuOption={store.menuOption}
            updateMenuOption={(option) => store.menuOption = option}
            img={createRandomLabirintImg}
            title="Create Random Labirint"
            onClickFunc={() => store.labirint = createRandomLabirint(store.labirint.length, store.labirint[0].length)}
          />
        </Row>
        <Row>
          <Item
            menuOption={store.menuOption}
            updateMenuOption={(option) => store.menuOption = option}
            img={goBackImg}
            title="Main Menu" width={180}
            onClickFunc={() => history.push(routes.home)}
          />
        </Row>
      </Menu>
    </Container>
  )
})

export default EditPanel;