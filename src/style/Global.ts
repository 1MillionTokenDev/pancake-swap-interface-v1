import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  #root {
    font-family: Kanit Regular;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  ul {
    list-style: none; 
  }

  li {
    display: flex;
    align-items: center;
  }

  li::before {
    content: "•";
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 8px;
  }

  .b1MT-logo {
    height: 55px;
    margin-top: 4px;
  }
`

export default GlobalStyle
