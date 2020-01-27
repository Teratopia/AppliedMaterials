import React from 'react';
import './bookmarkItem.css';
import BookmarkList from './BookmarkList';
const BookmarkItem = ({ bookmark, depth, doc, onClick, onJumpToDest }) => {
    const toggleRef = React.createRef();
    const subItemRef = React.createRef();
    const subItemsDisplayed = React.useRef(true);
    const hasSubItems = bookmark.items && bookmark.items.length > 0;
    const toggleSubItems = () => {
        subItemsDisplayed.current = !subItemsDisplayed.current;
        const subItemsEle = subItemRef.current;
        const toggleEle = toggleRef.current;
        if (!subItemsEle || !toggleEle) {
            return;
        }
        subItemsEle.style.display = subItemsDisplayed.current ? 'block' : 'none';
        toggleEle.style.transform = subItemsDisplayed.current ? 'rotate(90deg)' : '';
    };
    const clickBookmak = () => {
        if (hasSubItems) {
            onClick(bookmark.dest);
        }
    };
    const clickItem = () => {
        if (!hasSubItems) {
            onClick(bookmark.dest);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "viewer-bookmark-item", style: {
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                padding: `6px 4px 6px ${depth * 20 + 4}px`,
            }, onClick: clickItem },
            hasSubItems && (React.createElement("span", { ref: toggleRef, style: {
                    marginRight: '4px',
                    transform: 'rotate(90deg)',
                }, onClick: toggleSubItems }, "\u25BA")),
            React.createElement("div", { onClick: clickBookmak, style: {
                    flexGrow: 1,
                    flexShrink: 1,
                } }, bookmark.title)),
        hasSubItems && (React.createElement("div", { ref: subItemRef },
            React.createElement(BookmarkList, { bookmarks: bookmark.items, depth: depth + 1, doc: doc, onJumpToDest: onJumpToDest })))));
};
export default BookmarkItem;
