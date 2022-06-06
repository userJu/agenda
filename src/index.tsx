import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import App from "./App";
import AuthService from "./service/AuthService";
import { FireStore } from "./service/fireStore";

const authService = new AuthService();
const queryClient = new QueryClient();
const fireStore = new FireStore();

ReactDOM.render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App authService={authService} fireStore={fireStore} />
    </QueryClientProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// strictMode가 있을 때만 발생하는 문제
// findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of BackgroundCells which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here:
