import React from 'react';

const VideoListSelect = ({ children, ...props }) => (
    <select { ...props }>{children}</select>
);

export default VideoListSelect;