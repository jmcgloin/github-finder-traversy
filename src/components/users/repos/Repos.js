import React from 'react';
import PropTypes from 'prop-types';

import RepoItem from './RepoItem';

export default function Repos({ repos }) {
    return repos.map((repo) => {
        return <RepoItem repo={repo} key={repo.id} />;
    });
}

Repos.propsTypes = {
    repos: PropTypes.array.isRequired,
};
