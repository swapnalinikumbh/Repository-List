// repositoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: {
    repositories: [],
    isLoading: false,
    error: null
  },
  reducers: {
    fetchRepositoriesStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchRepositoriesSuccess(state, action) {
      state.repositories = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchRepositoriesFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchRepositoriesStart,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure
} = repositoriesSlice.actions;

function* fetchRepositoriesSaga() {
  try {
    const response = yield fetch(
      "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
    );
    const data = yield response.json();
    yield put(fetchRepositoriesSuccess(data.items));
  } catch (error) {
    yield put(fetchRepositoriesFailure(error.message));
  }
}

export function* watchFetchRepositories() {
  yield takeLatest(fetchRepositoriesStart.type, fetchRepositoriesSaga);
}

export default repositoriesSlice.reducer;
