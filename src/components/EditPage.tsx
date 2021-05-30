import React, { useEffect, useRef } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import {useLabirintStore } from '../store/Labirint';
import LabirintLayer from './LabirintLayer';
import styled from 'styled-components';
import LabirintDoorsLayer from './LabirintDoorsLayer';
import EditPanel from './labirint-tools/RightMenu';
import CellLayer from './CellLayer';
import bgImage from  '../images/editpage-bg.jpg';
import { colors } from '@src/config/colors';
import { observer } from 'mobx-react-lite';


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    /* background-image: url(${bgImage});
    background-position:center; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
  `;

export const EditPage: React.FC = observer(() => {
  const store = useLabirintStore();
  const wallSize = store.wallSize;
  const cellSize = store.cellSize;
  const ref = useRef<Stage>(null);

  useEffect(() => {
    window.addEventListener('resize', (ev: UIEvent) => store.updateSizes())
    return window.removeEventListener('resize', (ev: UIEvent) => store.updateSizes())
  }, [])

  return (
    <Container>
      <Stage
        size
        ref={ref}
        width={(cellSize + wallSize + 10) * store.labirint.length}
        height={(cellSize + wallSize + 10) * store.labirint.length}
      >
        <Layer>
          <Rect
            x = {40}
            y = {40}
            width={(cellSize + wallSize) * store.labirint.length}
            height={(cellSize + wallSize) * store.labirint.length}
            fill={colors.cellColor}
          />
        </Layer>
        <CellLayer />
        <LabirintLayer wallValue={false} />
        <LabirintDoorsLayer />
        <LabirintLayer wallValue={true} />
      </Stage>
      <EditPanel />
    </Container>
  );
});

export default EditPage;