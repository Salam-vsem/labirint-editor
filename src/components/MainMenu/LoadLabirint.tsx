import React, { useRef } from 'react';
import { Item, Image, HoverPlate } from './Styles';
import editedLabirint from '../../images/edited-labirint.png';
import styled from 'styled-components';
import { useLabirintStore, saveLabirint } from '../../store/Labirint';
import { useHistory } from 'react-router';
import { routes } from '../../config/routes';
import { Link } from 'react-router-dom';
import { Labirint } from '../../types';
import bgImage from '../../images/loadpage-bg.jpg';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bgImage});
  background-repeat:no-repeat;
  background-position:center;
`;

const Menu = styled.div`
  width: 35vw;
  height: 45vh;
  display: flex;
  /* background-color: #000000; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledInput = styled.input`
  width :100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity:0;
  overflow:hidden;
  position:absolute;
`;

const BottomMenu = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 16px;
  cursor: pointer;
`;

const InputGroup = styled.div`
  width:120px;
  position: relative;
  border: 2px solid #e631f9;
  border-radius: 5px;
  padding: 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  background-color: transparent;
  margin-bottom: 20px;

  &:hover {
    background-color: #e631f9;
  }
`;

const Styledlink = styled(Link)`
  font-size: 16px;
  text-decoration : none;
  color: #e631f9;
  transition: color 0.3s ease;
  &:hover {
    color: #551A8B;
  }
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

const loadJson = (inputRef: React.RefObject<HTMLInputElement>): Promise<Labirint> => {
  return new Promise((resolve, reject) => {
    const files = inputRef.current!.files;
    if (!files) {
      reject();
      // alert('ошибка');
      return;
    }
    const file = files.item(0);
    if (!file) {
      reject();
      // alert('ошибка');
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', event => {
      resolve(JSON.parse(String(event.target!.result)));
    });
    reader.readAsText(file);
  });
};

export const LoadLabirint: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const store = useLabirintStore();
  const history = useHistory();

  const loadFile = async () => {
    try {
      const json = await loadJson(inputRef);
      store.labirint = json;
      history.push(routes.editPage);
    } catch (e) {
      console.log(e)
      alert('error');
    }
  };
  
  return (
    <Container>
      <Menu>
        <PageTitle>load labirint</PageTitle>
        <BottomMenu>
          <InputGroup>
            <StyledInput 
                ref={inputRef}
                onChange={loadFile}
                type="file"
            />
            <Title>Добавить файл</Title>
          </InputGroup>
          <Styledlink to={routes.home}>Back to Main Menu</Styledlink>
        </BottomMenu>
      </Menu>
    </Container>
  );
}
export default LoadLabirint;