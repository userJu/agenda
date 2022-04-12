import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalStyle";
import AppRouter from "./Router";
import { mainTheme } from "./theme";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./service/fireBase";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fbInit, userInfo } from "./atoms";

const GrandContainer = styled.div`
  margin: auto;
`;

const Loding = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.lightBeigeColor};
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 15px;
  }
`;

function App() {
  const [isInit, setIsInit] = useRecoilState(fbInit);
  const setUserI = useSetRecoilState(userInfo);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserI({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          // 만약 없을 경우 보여주지 말라
        });
      } else {
        console.log("user 없음");
      }
      setIsInit(true);
    });
  }, []);

  return (
    <GrandContainer>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyle />
        {isInit ? (
          <AppRouter />
        ) : (
          <Loding>
            <h1>Loading...</h1>
          </Loding>
        )}
      </ThemeProvider>
    </GrandContainer>
  );
}

export default App;
