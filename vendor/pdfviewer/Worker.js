import React from 'react';
import PdfJs from './PdfJs';
const Worker = ({ children, workerUrl }) => {
    PdfJs.GlobalWorkerOptions.workerSrc = workerUrl;
    return React.createElement(React.Fragment, null, children);
};
export default Worker;
