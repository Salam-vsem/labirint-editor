import React from 'react';
import styled from 'styled-components';
import editedLabirint from '../../images/edited-labirint.png';
import { Item, Image, HoverPlate, Title } from './Styles';
import { useHistory } from 'react-router';
import { routes } from '../../config/routes';
import { useLabirintStore } from '../../store/Labirint';
import { Link } from 'react-router-dom';
import emptyLabirint from '../../images/empty-labirint.png';

export const MediumContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const PageTitle = styled.div`
  margin: 100px 0 100px 0;
  font-family: 'Press Start 2P', cursive;
  font-size: 72px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  vertical-align: middle;
`;

const BgVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 102vh;
  overflow: hidden;
`;

export const Styledlink = styled(Link)`
  font-size: 26px;
  text-decoration : none;
  text-transform: uppercase;
  /* background-color: #4eeae4; */
  font-family: 'Press Start 2P', cursive;
  padding: 5px 10px;
  color: #eeeeee;
  /* font-weight: 700; */
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const CreateLabirint: React.FC = () => {
  const history = useHistory();

  return (
    <Item onClick={() => history.push(routes.createNewLabirint)}>
      <Image src={emptyLabirint} />
      <HoverPlate />
      <Title>Создать новый лабиринт</Title>
    </Item>
  );
};

const LoadLabirint: React.FC = () => {
  const history = useHistory();

  return (
    <Item onClick={() => history.push(routes.loadLabirint)}>
      <Image
        src={editedLabirint}
      />
      <HoverPlate />
      <Title>Загрузить лабиринт</Title>
    </Item>
  );
};

export const MainPage: React.FC = () => {
  const bgVideo = `${process.env.PUBLIC_URL}/video/bg-video.mp4`;

  return (
    <Container>
      <PageTitle>Quest Editor</PageTitle>
      <MediumContainer>
        <CreateLabirint />
        <LoadLabirint />
      </MediumContainer>
      {
        localStorage['labirint'] &&
        <Styledlink to={routes.editPage}>back</Styledlink>
      }
      {/* <BgVideo autoPlay loop>
        <source src={bgVideo} type="video/mp4" />
      </BgVideo> */}
    </Container>
  )
} 

export default MainPage;