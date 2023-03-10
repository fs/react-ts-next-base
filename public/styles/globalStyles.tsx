import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  html {
    text-size-adjust: 100%;
  }

  body {
    min-height: calc(var(--vh) * 100);
    margin: 0;
    padding: 0;
    font-family: 'Gilroy', sans-serif;
  }

  :focus {
    outline: 0;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  input,
  textarea {
    font-family: 'Gilroy', sans-serif;
  }

  a, button {
    cursor: pointer;
    font-family: 'Gilroy', sans-serif;
  }

  a {
    text-decoration: none;
    transition: all .25s ease-in-out 0s;
    outline: none;
    color: ${({ theme }) => theme.colors.blue_500};
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
