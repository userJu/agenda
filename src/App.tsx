import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./globalStyle";
import AppRouter from "./Router";
import { mainTheme } from "./theme";

function App() {
  return (
    <>
      {/* <ThemeProvider theme={mainTheme}> */}
      <GlobalStyle />
      <AppRouter />
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
