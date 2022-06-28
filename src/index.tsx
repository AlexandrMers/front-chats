import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./state/store";

import "styles/index.scss";

import App from "./App";
import { ConnectedRouter } from "connected-react-router";

import { history } from "./state/store";

ReactDOM.render(
  <Provider store={store}>
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
    {/*  @ts-ignore*/}
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
