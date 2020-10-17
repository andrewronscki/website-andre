import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    color: #f1f1f1;
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  a {
    cursor: pointer;
  }
`;