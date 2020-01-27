import React from 'react';
import Spinner from '../Spinner';
const ThumbnailItem = ({ page, pageHeight, pageWidth, rotation, thumbnailHeight, thumbnailWidth, }) => {
    const renderTask = React.useRef();
    const [src, setSrc] = React.useState('');
    React.useEffect(() => {
        const task = renderTask.current;
        if (task) {
            task.cancel();
        }
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d', { alpha: false });
        const w = thumbnailWidth;
        const h = w / (pageWidth / pageHeight);
        const scale = w / pageWidth;
        canvas.height = h;
        canvas.width = w;
        canvas.style.height = `${h}px`;
        canvas.style.width = `${w}px`;
        const viewport = page.getViewport({ rotation, scale });
        renderTask.current = page.render({ canvasContext, viewport });
        renderTask.current.promise.then((_) => setSrc(canvas.toDataURL()), (_) => { });
    }, [rotation]);
    return (!src
        ? React.createElement(Spinner, null)
        : React.createElement("img", { src: src, height: `${thumbnailHeight}px`, width: `${thumbnailWidth}px` }));
};
export default ThumbnailItem;
