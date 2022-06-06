import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalStyle";
import AppRouter from "./Router";
import { mainTheme } from "./theme";
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

function App({ authService, fireStore }: any) {
  const [isInit, setIsInit] = useRecoilState(fbInit);
  const [userI, setUserI] = useRecoilState(userInfo);

  useEffect(() => {
    authService.onAuthChange((user: any) => {
      if (user) {
        console.log("유저가 있습니다");
        setUserI({
          uid: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
        });
      } else {
        setUserI({
          uid: "",
          email: "",
          displayName: "",
          photoURL: "",
        });
        console.log("유저가 없습니다");
      }
      setIsInit(true);
    });
  }, []);
  console.log(userI);
  return (
    <GrandContainer>
      <ThemeProvider theme={mainTheme}>
        <GlobalStyle />
        {isInit ? (
          <AppRouter authService={authService} fireStore={fireStore} />
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
