import React, { useState, useRef } from 'react';
import { useLabirintStore } from '../../store/Labirint';
import { observer } from 'mobx-react-lite';
import { SelectedItemToChange } from '../../types';
import styled from 'styled-components';
import wallBrick from '../../images/icons/012-brickwall.png';
import keyImg from '../../images/icons/044-key.png';
import doorImg from '../../images/icons/074-ring.png'
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
import { isString } from 'util';
import { createRandomLabirint } from '../../helper/create-random-labirint';
import Alert from 'react-s-alert';
import KeysList from './KeysList';
import { colors } from '@src/config/colors';

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

export const EditPanel: React.FC = () => {
  const store = useLabirintStore();
  const history = useHistory();

  const download = () => {
    const blob = new Blob([JSON.stringify(store.labirint)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "hello world.json");
  };

  const formResultAnswer = (result: string | boolean) => {
    if(isString(result)) {
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
      title: 'Инструмент "Провекра лабиринта"',
      description: 'проверяет структуру и проходимость лабиринта'
    },
  ]

  return (
    <Container>
      <KeysList />
      <Menu>
        <Row>
          <Item value={SelectedItemToChange.start} img={startImg} title="Start" videotitle='set-start' videoDescription={videoDescriptions[0]}/>
          <Item value={SelectedItemToChange.finish} img={finishImg} title="Finish" videotitle='set-finish' videoDescription={videoDescriptions[1]} discrLeftPos={530} />
          {/* <Item value={SelectedItemToChange.walls} img={wallBrick} title="Wall" videotitle='walls-edit' videoDescription={videoDescriptions[2]} /> */}
          {/* <Item value={SelectedItemToChange.keys} img={keyImg} title="Keys" videotitle='add-keys' videoDescription={videoDescriptions[4]} /> */}
        </Row>
        <Row>
        <Item img={testLabirintImg} title="Check Labirint" onClickFunc={() => formResultAnswer(IsLabirintStructureCorrect(store.labirint))}
            videotitle='check-labirint'
            videoDescription={videoDescriptions[6]}
          />
          <Item img={downloadImg} title="Download" onClickFunc={download} />
        </Row>
        <Row>
          <Item img={clearImg} title="Clear Labirint" onClickFunc={clearlabirint} videotitle='delete-labirint' videoDescription={videoDescriptions[3]} />
          {/* <Item value={SelectedItemToChange.doors} img={doorImg} title="Doors" videotitle='edit-doors' videoDescription={videoDescriptions[5]} /> */}
          <Item img={createRandomLabirintImg} title="Create Random Labirint" onClickFunc={() => store.labirint = createRandomLabirint(store.labirint.length, store.labirint[0].length)}/>
        </Row>
        <Row>
          <Item img={goBackImg} title="Main Menu" width={180} onClickFunc={() => history.push(routes.home)} />
        </Row>
      </Menu>
    </Container>
  )
}

export default EditPanel;