import React from 'react';
import './spinner.css';
const Spinner = () => {
    return (React.createElement("svg", { className: "viewer-spinner", width: "64px", height: "64px", viewBox: "0 0 32 32" },
        React.createElement("circle", { cx: "16", cy: "16", fill: "none", r: "12", stroke: "rgba(0, 0, 0, 0.4)", strokeDasharray: Math.PI * 2 * 9, strokeLinecap: "round", strokeWidth: "4" })));
};
export default Spinner;
