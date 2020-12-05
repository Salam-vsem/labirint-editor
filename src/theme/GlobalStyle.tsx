import { createGlobalStyle } from 'styled-components';
import { colors } from '../config/colors'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.bodyBg};
    color: #e2e2e2;
    font-size: 24px;
    font-family: 'Ubuntu', sans-serif;
  }
`;

export default GlobalStyle;
