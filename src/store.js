// store.js
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import repositoriesReducer, {
  fetchRepositories,
  watchFetchRepositories
} from "./repositoriesSlice";

function* rootSaga() {
  yield all([watchFetchRepositories()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    repositories: repositoriesReducer
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export const { dispatch } = store;
export default store;
