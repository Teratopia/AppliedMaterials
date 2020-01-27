import React from 'react';
import Button from './Button';
import DownloadIcon from './icons/DownloadIcon';
import FullScreenIcon from './icons/FullScreenIcon';
import LeftSidebarIcon from './icons/LeftSidebarIcon';
import NextIcon from './icons/NextIcon';
import PreviousIcon from './icons/PreviousIcon';
import ZoomInIcon from './icons/ZoomInIcon';
import ZoomOutIcon from './icons/ZoomOutIcon';
import LocalizationContext from './localization/LocalizationContext';
import MoreActionsPopover from './MoreActionsPopover';
import OpenFileButton from './open/OpenFileButton';
import Position from './portal/Position';
import Tooltip from './portal/Tooltip';
import SearchPopover from './search/SearchPopover';
import { decrease, increase } from './zoom/zoomingLevel';
import ZoomPopover from './zoom/ZoomPopover';
const TOOLTIP_OFFSET = { left: 0, top: 8 };
const Toolbar = ({ currentPage, doc, fileName, scale, onChangeScrollMode, onDownload, onFullScreen, onJumpTo, onJumpToMatch, onOpenFiles, onRotate, onSearchFor, onToggleDragScroll, onToggleSidebar, onZoom, renderToolbar, }) => {
    const l10n = React.useContext(LocalizationContext);
    const [pageTextboxFocused, setPageTextboxFocused] = React.useState(false);
    const [editingPage, setEditingPage] = React.useState(currentPage);
    const [isSidebarOpened, setSidebarOpened] = React.useState(false);
    const { numPages } = doc;
    const zoomOut = () => {
        const newLevel = decrease(scale);
        onZoom(newLevel);
    };
    const zoomIn = () => {
        const newLevel = increase(scale);
        onZoom(newLevel);
    };
    const gotoNextPage = () => {
        const nextPage = currentPage + 1;
        if (nextPage < numPages) {
            setEditingPage(nextPage);
            onJumpTo(nextPage);
        }
    };
    const gotoPreviousPage = () => {
        const previousPage = currentPage - 1;
        if (previousPage >= 0) {
            setEditingPage(previousPage);
            onJumpTo(previousPage);
        }
    };
    const changePage = (e) => {
        const newPage = parseInt(e.target.value, 10);
        if (newPage > 0 && newPage <= numPages) {
            setEditingPage(newPage - 1);
        }
    };
    const focusPageTextbox = () => {
        setPageTextboxFocused(true);
        setEditingPage(currentPage);
    };
    const blurPageTextbox = () => {
        setPageTextboxFocused(false);
    };
    const keydownPage = (e) => {
        switch (e.keyCode) {
            case 38:
                gotoPreviousPage();
                break;
            case 40:
                gotoNextPage();
                break;
            case 13:
                onJumpTo(editingPage);
                break;
            default: break;
        }
    };
    const jumpToFirstPage = () => onJumpTo(0);
    const jumpToLastPage = () => onJumpTo(numPages - 1);
    const toggleSidebar = () => {
        setSidebarOpened(!isSidebarOpened);
        onToggleSidebar();
    };
    const renderToggle = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.toggleSidebar));
    const renderPreviousPage = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.previousPage));
    const renderNextPage = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.nextPage));
    const renderZoomOut = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.zoomOut));
    const renderZoomIn = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.zoomIn));
    const renderFullScreen = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.fullScreen));
    const renderDownload = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.download));
    return renderToolbar({
        currentPage,
        currentPageInput: (React.createElement("input", { type: "text", value: pageTextboxFocused ? (editingPage + 1) : (currentPage + 1), onChange: changePage, onFocus: focusPageTextbox, onBlur: blurPageTextbox, onKeyDown: keydownPage, style: {
                border: '1px solid rgba(0, 0, 0, 0.3)',
                padding: '4px',
                width: '50px',
            } })),
        downloadButton: (React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: onDownload },
                React.createElement(DownloadIcon, null)), content: renderDownload, offset: TOOLTIP_OFFSET })),
        fullScreenButton: (React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: onFullScreen },
                React.createElement(FullScreenIcon, null)), content: renderFullScreen, offset: TOOLTIP_OFFSET })),
        moreActionsPopover: (React.createElement(MoreActionsPopover, { doc: doc, fileName: fileName, onChangeScrollMode: onChangeScrollMode, onJumpToFirstPage: jumpToFirstPage, onJumpToLastPage: jumpToLastPage, onRotate: onRotate, onToggleDragScroll: onToggleDragScroll })),
        nextPageButton: (React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: gotoNextPage },
                React.createElement(NextIcon, null)), content: renderNextPage, offset: TOOLTIP_OFFSET })),
        numPages,
        openFileButton: (React.createElement(OpenFileButton, { onOpenFiles: onOpenFiles })),
        previousPageButton: (React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: gotoPreviousPage },
                React.createElement(PreviousIcon, null)), content: renderPreviousPage, offset: TOOLTIP_OFFSET })),
        searchPopover: (React.createElement(SearchPopover, { doc: doc, onJumpToMatch: onJumpToMatch, onSearchFor: onSearchFor })),
        toggleSidebarButton: (React.createElement(Tooltip, { position: Position.BottomCenter, target: (React.createElement(Button, { onClick: toggleSidebar, isSelected: isSidebarOpened },
                React.createElement(LeftSidebarIcon, null))), content: renderToggle, offset: TOOLTIP_OFFSET })),
        zoomInButton: (React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: zoomIn },
                React.createElement(ZoomInIcon, null)), content: renderZoomIn, offset: TOOLTIP_OFFSET })),
        zoomOutButton: (React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: zoomOut },
                React.createElement(ZoomOutIcon, null)), content: renderZoomOut, offset: TOOLTIP_OFFSET })),
        zoomPopover: (React.createElement(ZoomPopover, { scale: scale, onZoom: onZoom })),
    });
};
export default Toolbar;
