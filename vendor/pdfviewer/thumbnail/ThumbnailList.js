import React from 'react';
import ThumbnailContainer from './ThumbnailContainer';
import './thumbnailList.css';
const ThumbnailList = ({ currentPage, doc, pageHeight, pageWidth, rotation, onJumpToPage, }) => {
    const { numPages } = doc;
    return (React.createElement(React.Fragment, null, [...Array(numPages).keys()].map((index) => {
        const onClick = () => onJumpToPage(index);
        return (React.createElement("div", { key: `thumbnail-${index}` },
            React.createElement("div", { className: currentPage === index ? 'viewer-thumbnail-selected' : 'viewer-thumbnail', style: {
                    padding: '8px',
                }, onClick: onClick },
                React.createElement(ThumbnailContainer, { doc: doc, pageHeight: pageHeight, pageIndex: index, pageWidth: pageWidth, rotation: rotation }))));
    })));
};
export default ThumbnailList;
