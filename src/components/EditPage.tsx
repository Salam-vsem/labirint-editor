import React, { useEffect } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import {useLabirintStore } from '../store/Labirint';
import LabirintLayer from './LabirintLayer';
import styled from 'styled-components';
import LabirintDoorsLayer from './LabirintDoorsLayer';
import EditPanel from './add-Items-components/RightMenu';
import CellLayer from './CellLayer';
import bgImage from  '../images/editpage-bg.jpg';
import { colors } from '@src/config/colors';


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

const StyledStage = styled(Stage)`
  margin-left: 5vw;
`;

export const EditPage: React.FC = () => {
  const store = useLabirintStore();
  const wallSize = store.wallSize;
  const cellSize = store.cellSize;

  // useEffect(() => {
  //   store.updateSizes();
  // }, [])

  return (
    <Container>
      <StyledStage
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
      </StyledStage>
      <EditPanel />
    </Container>
  );
}

export default EditPage;