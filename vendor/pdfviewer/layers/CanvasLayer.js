import React from 'react';
import WithScale from '../WithScale';
const CanvasLayer = ({ height, page, rotation, scale, width }) => {
    const canvasRef = React.createRef();
    const renderTask = React.useRef();
    const renderCanvas = () => {
        const task = renderTask.current;
        if (task) {
            task.cancel();
        }
        const canvasEle = canvasRef.current;
        const canvasContext = canvasEle.getContext('2d');
        const viewport = page.getViewport({ rotation, scale });
        renderTask.current = page.render({ canvasContext, viewport });
        renderTask.current.promise.then((_) => { }, (_) => { });
    };
    return (React.createElement(WithScale, { callback: renderCanvas, rotation: rotation, scale: scale },
        React.createElement("canvas", { height: height * 0.666, ref: canvasRef, style: {
                left: '0',
                position: 'absolute',
                top: '0',
            }, width: width * 0.666 })));
};
export default CanvasLayer;
