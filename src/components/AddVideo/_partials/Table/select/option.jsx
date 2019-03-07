import React from 'react';

const Options = ({ children, value }) => (
    <option value={value}>{children}</option>
);

export default Options;