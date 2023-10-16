// RepositoryList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRepositoriesStart,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure
} from "./repositoriesSlice";

const RepositoryList = () => {
  const dispatch = useDispatch();
  const repositories = useSelector((state) => state.repositories.repositories);
  const isLoading = useSelector((state) => state.repositories.isLoading);
  const error = useSelector((state) => state.repositories.error);

  useEffect(() => {
    dispatch(fetchRepositoriesStart());

    // Call the GitHub API and fetch the repositories based on selected time period
    fetch(
      "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchRepositoriesSuccess(data.items));
      })
      .catch((error) => {
        dispatch(fetchRepositoriesFailure(error.message));
      });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading repositories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Repository List</h2>
      {repositories.map((repo) => (
        <div key={repo.id}>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          <p>Stars: {repo.stargazers_count}</p>
          <p>Issues: {repo.open_issues_count}</p>
          <p>
            Owner: {repo.owner.login} -{" "}
            <img src={repo.owner.avatar_url} alt="Owner Avatar" />
          </p>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
