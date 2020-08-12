import React from 'react';
import PropTypes from 'prop-types';

const Clear = (props) => {
    const onClick = (e) => {
        e.preventDefault();
        props.onClear();
    };
    return (
        <button onClick={onClick} className='btn'>
            Clear
        </button>
    );
};

Clear.propTypes = {
    onClear: PropTypes.func.isRequired,
};

export default Clear;
