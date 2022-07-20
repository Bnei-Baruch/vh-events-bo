import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./i18n";
import App from "./App";
import "./index.css";

import store from "./redux/store/index";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
