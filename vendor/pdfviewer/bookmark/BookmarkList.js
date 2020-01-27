import React from 'react';
import getDestination from '../utils/getDestination';
import BookmarkItem from './BookmarkItem';
const BookmarkList = ({ bookmarks, depth = 0, doc, onJumpToDest }) => {
    const jumpToDest = (dest) => {
        getDestination(doc, dest).then((target) => {
            const { pageIndex, bottomOffset, scaleTo } = target;
            onJumpToDest(pageIndex + 1, bottomOffset, scaleTo);
        });
    };
    return (React.createElement("ul", { style: {
            listStyleType: 'none',
            margin: '0',
            padding: '0',
        } }, bookmarks.map((bookmark, index) => {
        return (React.createElement("li", { key: index },
            React.createElement(BookmarkItem, { bookmark: bookmark, depth: depth, doc: doc, onClick: jumpToDest, onJumpToDest: onJumpToDest })));
    })));
};
export default BookmarkList;
