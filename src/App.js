import "./styles.css";

import React from "react";
import { Provider } from "react-redux";
import RepositoryList from "./RepositoryList";
import store from "./store";

const App = () => {
  return (
    <div className="container">
      <Provider store={store}>
        <RepositoryList />
      </Provider>
    </div>
  );
};

export default App;
