import { useLabirintStore } from "@src/store/Labirint";
import { useHistory } from "react-router";

import finishImg from '../../images/icons/002-trophy.png'
import startImg from '../../images/icons/027-flower.png';
import downloadImg from '../../images/icons/028-floppy disk.png';
import goBackImg from '../../images/icons/076-monitor.png';
import clearImg from '../../images/icons/011-bones.png';
import testLabirintImg from '../../images/icons/039-gamepad.png';
import createRandomLabirintImg from '../../images/icons/089-magic wand.png';
import { downloadMap, formResultAnswer } from "./helpers";
import { IsLabirintStructureCorrect } from "@src/helper/checkLabirintStructure";
import { routes } from "@src/config/routes";
import { createRandomLabirint } from "@src/helper/create-random-labirint";

export type VideoInstructionProps = Record<string, string>

const videoInstructions: VideoInstructionProps = {
  ['Инструмент "Добавление старта"']: 'добавляет старт',
  ['Инструмент "Добавление финиша"']: 'добавляет финиш',
  ['Инструмент "Проверка лабиринта"']: 'проверяет структуру и проходимость лабиринта',
  ['Инструмент "Загрузка лабиринта"']: 'загружает созданную карту на ваш пк',
  ['Инструмент "Удаление лабиринта"']: 'полностью стирает лабиринт',
  ['Инструмент "Генерация лабиринта"']: 'генерирует структуру лабиринта',
  ['"Выйти в главное меню"']: 'возвращает в главное меню',
}

const keys = Object.keys(videoInstructions)

interface MenuItemProps {
  title: string;
  description: string;
  img: string;
  onClick?: () => void;
  videotitle?: string;
  width?: number;
}

// const store = useLabirintStore();
// const history = useHistory();

const clearlabirint = () => {
  const answer = window.confirm('Вы точно хотите удалить лабиринт?');
  if(answer) {
    // store.clearLabirint();
  }
}

export const items: MenuItemProps[][] = [
  [
    {
      title: keys[0],
      description: videoInstructions[keys[0]],
      img: startImg,
      videotitle: 'set-start'
    },
    {
      title: keys[1],
      description: videoInstructions[keys[1]],
      img: finishImg,
      videotitle: 'set-finish'
    },
  ],
  [
    {
      title: keys[2],
      description: videoInstructions[keys[2]],
      img: testLabirintImg,
      // onClick: (labirint) => formResultAnswer(IsLabirintStructureCorrect(store.labirint))
    },
    {
      title: keys[3],
      description: videoInstructions[keys[3]],
      img: downloadImg,
      // onClick: () => downloadMap(store.labirint)
    },
  ],
  [
    {
      title: keys[4],
      description: videoInstructions[keys[4]],
      img: clearImg,
      videotitle: 'delete-labirint',
      onClick: clearlabirint
    },
    {
      title: keys[5],
      description: videoInstructions[keys[5]],
      img: createRandomLabirintImg,
      // onClick: (labirint) => store.labirint = createRandomLabirint(store.labirint.length, store.labirint[0].length)
    },
  ],
  [
    {
      title: keys[6],
      description: videoInstructions[keys[6]],
      img: clearImg,
      // onClick: () => history.push(routes.home)
    },
  ]
]