import { createStore, applyMiddleware, compose } from 'redux';
import { HashRouter as Router } from "react-router-dom";
import book from './store/reducers/book';
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import thunk from 'redux-thunk';
import "./index.module.scss";
import React from "react";
import App from "./App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(book, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
