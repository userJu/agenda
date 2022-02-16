import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalStyle";
import AppRouter from "./Router";
import { mainTheme } from "./theme";

const GrandContainer = styled.div`
  margin: auto;
`;
// declare global {
//   interface Window {
//     Kakao: any;
//     // any로 설정하는것이 맞는건가..
//   }
// }

function App() {
  // ... 블로그 kakao연결하기
  // ...
  // ...
  // Kakao.init(`%REACT_APP_JAVASCRIPT_KEY%`); // html안에 .env 넣는 법 `%%`
  // Kakao.isInitialized();
  // console.log(Kakao.isInitialized());
  // console.log(window.Kakao);

  // console.log(window.Kakao);
  // window에 Kakao라는 property가 아직 추가되지 않아서 오류가 생긴다
  // Property 'Kakao' does not exist on type 'Window & typeof globalThis'
  // winodw 인터페이스에서는 Kakao의 정의가 업기 때문에 type system에서 컴파일오류

  return (
    <GrandContainer>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </GrandContainer>
  );
}

export default App;
