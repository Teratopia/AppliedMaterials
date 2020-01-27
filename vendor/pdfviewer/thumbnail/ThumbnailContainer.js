import React from 'react';
import Observer from '../Observer';
import Spinner from '../Spinner';
import ThumbnailItem from './ThumbnailItem';
const THUMBNAIL_WIDTH = 100;
const ThumbnailContainer = ({ doc, pageHeight, pageIndex, pageWidth, rotation }) => {
    const [pageSize, setPageSize] = React.useState({
        height: pageHeight,
        isCalculated: false,
        page: null,
        width: pageWidth,
    });
    const { isCalculated, page, height, width } = pageSize;
    const scale = width / height;
    const isVertical = Math.abs(rotation) % 180 === 0;
    const w = isVertical ? THUMBNAIL_WIDTH : (THUMBNAIL_WIDTH / scale);
    const h = isVertical ? (THUMBNAIL_WIDTH / scale) : THUMBNAIL_WIDTH;
    const onVisibilityChanged = (params) => {
        if (params.isVisible && !isCalculated) {
            doc.getPage(pageIndex + 1).then((pdfPage) => {
                const viewport = pdfPage.getViewport({ scale: 1 });
                setPageSize({
                    height: viewport.height,
                    isCalculated: true,
                    page: pdfPage,
                    width: viewport.width,
                });
            });
        }
    };
    return (React.createElement(Observer, { onVisibilityChanged: onVisibilityChanged },
        React.createElement("div", { style: {
                alignItems: 'center',
                boxShadow: '2px 2px 8px 0 rgba(0, 0, 0, 0.2)',
                display: 'flex',
                height: `${h}px`,
                justifyContent: 'center',
                margin: '0 auto',
                position: 'relative',
                width: `${w}px`,
            } }, !page
            ? React.createElement(Spinner, null)
            : (React.createElement(ThumbnailItem, { page: page, pageHeight: isVertical ? height : width, pageWidth: isVertical ? width : height, rotation: rotation, thumbnailHeight: h, thumbnailWidth: w })))));
};
export default ThumbnailContainer;
