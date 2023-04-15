import { Html, Head, Main, NextScript } from 'next/document'
import styled from 'styled-components';


const StyledBody = styled.main`
  background: linear-gradient(90deg, #5FDDFF 0%, #10FF84 100%);
`
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
