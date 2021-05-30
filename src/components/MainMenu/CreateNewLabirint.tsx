import React from 'react';
import { MediumContainer, Styledlink } from './MainPage';
import { Image, HoverPlate, Title, Item } from './Styles';
import { routes } from '@src/config/routes';
import fiveByFiveMap from '../../images/5x5.png';
import tenByTenMap from '../../images/10x10.png';
import fifteenByFifteenMap from '../../images/15x15.png';
import { useHistory } from 'react-router';
import { useLabirintStore } from '@src/store/Labirint';
import { createLabirint } from '@src/helper/clearlabirint';
import styled from 'styled-components';
import bgImage from '../../images/create-new-labirint-bg.jpg';

// TODO
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  /* background-image: url(${bgImage}); */
  /* background-repeat:no-repeat; */
  /* background-position:center; */
`;

const PageTitle = styled.div`
  margin: 100px 0 100px 0;
  font-family: 'Press Start 2P', cursive;
  font-size: 48px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  vertical-align: middle;
`;

// const Styledlink = styled(Link)`
//   font-size: 16px;
//   margin-top: 10px;
//   text-decoration : none;
//   color: #e631f9;
//   transition: color 0.3s ease;
//   text-transform: uppercase;
//   &:hover {
//     color: #551A8B;
//   }
// `;

export const CreateNewLabirint: React.FC = () => {
  const history = useHistory();
  const store = useLabirintStore();

  const createNewLabirint = (rows: number, cols: number) => {
    store.labirint = createLabirint(rows, cols);
    store.keys = []
    history.push(routes.editPage);
  }

  return (
    <Container>
      <PageTitle>Select Labirint size</PageTitle>
      <MediumContainer>
        <Item onClick={() => createNewLabirint(5, 5)}>
          <Image src={fiveByFiveMap} />
          <HoverPlate />
          <Title>5 Х 5</Title>
        </Item>
        <Item onClick={() => createNewLabirint(10, 10)}>
          <Image src={tenByTenMap} />
          <HoverPlate />
          <Title>10 Х 10</Title>
        </Item>
        <Item onClick={() => createNewLabirint(15, 15)}>
          <Image src={fifteenByFifteenMap} />
          <HoverPlate />
          <Title>15 Х 15</Title>
        </Item>
      </MediumContainer>
        <Styledlink to={routes.home}>back</Styledlink>
    </Container>
  );
}

export default CreateNewLabirint;