import React from 'react';
import Observer from '../Observer';
import Spinner from '../Spinner';
import AnnotationLayer from './AnnotationLayer';
import CanvasLayer from './CanvasLayer';
import './pageLayer.css';
import TextLayer from './TextLayer';
const PageLayer = ({ doc, height, keywordRegexp, match, pageIndex, rotation, scale, width, onJumpToDest, onPageVisibilityChanged, }) => {
    const [pageSize, setPageSize] = React.useState({
        isCalculated: false,
        page: null,
        pageHeight: height,
        pageWidth: width,
    });
    const { isCalculated, page, pageHeight, pageWidth } = pageSize;
    const intersectionThreshold = Array(10).fill(null).map((_, i) => i / 10);
    const scaledWidth = pageWidth * scale;
    const scaledHeight = pageHeight * scale;
    const isVertical = Math.abs(rotation) % 180 === 0;
    const w  = (isVertical ? scaledWidth : scaledHeight ) * 1.5;
    const h = (isVertical ? scaledHeight : scaledWidth) * 1.5;
    const visibilityChanged = (params) => {
        const ratio = params.isVisible ? params.ratio : 0;
        onPageVisibilityChanged(pageIndex, ratio);
        if (params.isVisible && !isCalculated) {
            doc.getPage(pageIndex + 1).then((pdfPage) => {
                const viewport = pdfPage.getViewport({ scale: 1 });
                setPageSize({
                    isCalculated: true,
                    page: pdfPage,
                    pageHeight: viewport.height,
                    pageWidth: viewport.width,
                });
            });
        }
    };
    const jumpToMatch = (pageIndex, top, left) => {
        onJumpToDest(pageIndex, pageHeight - top, scale);
    };
    return (React.createElement(Observer, { onVisibilityChanged: visibilityChanged, threshold: intersectionThreshold },
        React.createElement("div", { className: "viewer-page", style: {
                alignItems: 'center',
                display: 'flex',
                height: `${h}px`,
                justifyContent: 'center',
                margin: '0 auto',
                position: 'relative',
                width: `${w}px`,
                maxWidth: 1000,
            } }, !page
            ? React.createElement(Spinner, null)
            : (React.createElement(React.Fragment, null,
                React.createElement(CanvasLayer, { height: h, page: page, rotation: rotation, scale: scale, width: w }),
                React.createElement(TextLayer, { keywordRegexp: keywordRegexp, match: match, page: page, pageIndex: pageIndex, rotation: rotation, scale: scale, onJumpToMatch: jumpToMatch }),
                React.createElement(AnnotationLayer, { doc: doc, page: page, rotation: rotation, scale: scale, onJumpToDest: onJumpToDest }))))));
};
export default PageLayer;
