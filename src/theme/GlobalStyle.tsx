import { createGlobalStyle } from 'styled-components';
import { colors } from '../config/colors'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.bodyBg};
    color: #e2e2e2;
    font-size: 24px;
    /* font-weight: 100; */
    font-family: sans-serif;
  }
`;

export default GlobalStyle;
