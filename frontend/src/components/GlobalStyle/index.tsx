import { createGlobalStyle, css } from 'styled-components'

const GlobalStyle = createGlobalStyle(
  (props: any) => css`
    :root {
      --background-color: ${props.theme.backgroundColor};
      --color: ${props.theme.color};
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      height: 100%;
      line-height: 1.5;
      cursor: default;
      background-color: var(--background-color);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }

    body {
      min-height: 100%;
      display: flex;
      margin: 0;
      line-height: 1.5;
      font-size: 1rem;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      color: var(--color);
      font-family: Arial, Helvetica, sans-serif;
    }

    #wrapper {
      max-width: 100%;
      flex: 1;
    }

    a {
      color: var(--color);
    }

    p {
      margin: 0;

      & + & {
        margin-top: 1rem;
      }
    }

    img {
      vertical-align: middle;
      border-style: none;
      max-width: 100%;
    }
  `
)

export default GlobalStyle
