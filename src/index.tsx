import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";

ReactDOM.render(
  // <React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// strictMode가 있을 때만 발생하는 문제
// findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of BackgroundCells which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here:
