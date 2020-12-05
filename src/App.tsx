import React, { ComponentType } from 'react';
import logo from './logo.svg';
import './App.css';
import EditPage from './components/EditPage';
import { BrowserRouter } from 'react-router-dom';
import ContentPage from './components/ContentPage';
import GlobalStyle from './theme/GlobalStyle';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ContentPage />
      </BrowserRouter>
      <Alert stack={{limit: 2} } timeout={5000} position="top-left" />
    </>
  );
}

export default App;
