import React from 'react';
const Icon = ({ children, size = 24 }) => {
    const width = `${size || 24}px`;
    return (React.createElement("svg", { height: width, viewBox: "0 0 24 24", fill: "none", stroke: "rgb(0, 0, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", width: width }, children));
};
export default Icon;
