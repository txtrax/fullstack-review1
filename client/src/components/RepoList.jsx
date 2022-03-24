import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo) => {
      return (
        <li>
          <a href={repo.git_url}>{repo.repo_name}
          </a>
        </li>
      )
    })}
  </div>
)

export default RepoList;