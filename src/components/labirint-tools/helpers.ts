import { LabirintStore } from "@src/store/Labirint";
import { Cell } from "@src/types";
import Alert from 'react-s-alert';

export const downloadMap = (labrint: readonly Cell[][]) => {
  const blob = new Blob([JSON.stringify(labrint)], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "hello world.json");
};

export const formResultAnswer = (result: string | boolean) => {
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