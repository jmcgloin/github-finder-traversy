import React from 'react';
import PropTypes from 'prop-types';

export default function RepoItem(props) {
    const { name, fork, forks } = props.repo;
    return (
        <div>
            <h3>{name}</h3>
            <p>{fork && `Forks: ${forks}`}</p>
        </div>
    );
}

RepoItem.propTypes = {
    repo: PropTypes.object.isRequired,
};
