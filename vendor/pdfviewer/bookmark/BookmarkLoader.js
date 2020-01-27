import React from 'react';
import LocalizationContext from '../localization/LocalizationContext';
import Spinner from '../Spinner';
import BookmarkList from './BookmarkList';
const BookmarkLoader = ({ doc, onJumpToDest }) => {
    const l10n = React.useContext(LocalizationContext);
    const [bookmarks, setBookmarks] = React.useState({
        isLoaded: false,
        items: [],
    });
    React.useEffect(() => {
        doc.getOutline().then((outline) => {
            setBookmarks({
                isLoaded: true,
                items: outline || [],
            });
        });
    }, []);
    return (!bookmarks.isLoaded
        ? React.createElement(Spinner, null)
        : (React.createElement("div", { style: { width: '100%' } }, bookmarks.items.length === 0
            ? React.createElement("div", { style: { textAlign: 'center' } }, l10n.bookmark.noBookmark)
            : (React.createElement(BookmarkList, { bookmarks: bookmarks.items, depth: 0, doc: doc, onJumpToDest: onJumpToDest })))));
};
export default BookmarkLoader;
