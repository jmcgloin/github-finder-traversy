import React from 'react';

export default function Alert({ message, type = null }) {
    return type && <div className={`alert alert-${type}`}>{message}</div>;
}
