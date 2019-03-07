import React from 'react';

const Option = ({ children, value }) => (
    <option value={value}>{children}</option>
);

export default Option;