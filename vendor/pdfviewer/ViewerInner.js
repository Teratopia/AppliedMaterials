import React from 'react';
import Button from './Button';
import useDragScroll from './hooks/useDragScroll';
import useDrop from './hooks/useDrop';
import useFullScreen from './hooks/useFullScreen';
import useToggle from './hooks/useToggle';
import ExitFullScreenIcon from './icons/ExitFullScreenIcon';
import PageLayer from './layers/PageLayer';
import { ScrollMode } from './MoreActionsPopover';
import DropArea from './open/DropArea';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import getFileExt from './utils/fileExt';
import { SpecialLevel } from './zoom/zoomingLevel';
const EMPTY_KEYWORD_REGEXP = new RegExp(' ');
const SCROLL_BAR_WIDTH = 17;
const PAGE_PADDING = 8;

const ReturnRef = () => {
    return React.useRef(null);
}
const ViewerInner = ({ doc, fileName, layout, pageSize, onDownload, onOpenFile }) => {
    const pagesRef = ReturnRef();
    const [scale, setScale] = React.useState(pageSize.scale * 1.25);
    
    const [currentPage, setCurrentPage] = React.useState(0);
    const [rotation, setRotation] = React.useState(0);
    const [keywordRegexp, setKeywordRegexp] = React.useState(EMPTY_KEYWORD_REGEXP);
    const [match, setMatch] = React.useState({
        matchIndex: -1,
        pageIndex: -1,
    });
    const { toggleDragScroll } = useDragScroll(pagesRef);
    const { isFullScreen, openFullScreen, closeFullScreen } = useFullScreen(pagesRef);
    const { isDragging } = useDrop(pagesRef, (files) => openFiles(files));
    const toggleSidebar = useToggle();
    const { numPages } = doc;
    const { pageWidth, pageHeight } = pageSize;
    const width = scale * pageWidth;
    const height = scale * pageHeight;
    const arr = Array(numPages).fill(null);
    const pageVisibility = arr.map((_, __) => 0);
    const pageRefs = arr.map((_, __) => ReturnRef() );
    const zoom = (newScale) => {
        const pagesEle = pagesRef.current;
        if (!pagesEle) {
            return;
        }
        switch (newScale) {
            case SpecialLevel.ActualSize:
                setScale(1);
                break;
            case SpecialLevel.PageFit:
                const scaleWidth = (pagesEle.offsetWidth - SCROLL_BAR_WIDTH) / pageWidth;
                const scaleHeight = (pagesEle.offsetHeight - 2 * PAGE_PADDING) / pageHeight;
                setScale(Math.min(scaleWidth, scaleHeight));
                break;
            case SpecialLevel.PageWidth:
                setScale((pagesEle.offsetWidth - SCROLL_BAR_WIDTH) / pageWidth);
                break;
            default:
                setScale(newScale);
                break;
        }
    };
    const pageVisibilityChanged = (pageIndex, ratio) => {
        pageVisibility[pageIndex] = ratio;
        const maxRatioPage = pageVisibility.reduce((maxIndex, item, index, array) => {
            return item > array[maxIndex] ? index : maxIndex;
        }, 0);
        setCurrentPage(maxRatioPage);
    };
    const jumpToPage = (pageIndex) => {
        if (pageIndex < 0 || pageIndex >= numPages) {
            return;
        }
        setCurrentPage(pageIndex);
        const pagesContainer = pagesRef.current;
        const targetPage = pageRefs[pageIndex].current;
        if (pagesContainer && targetPage) {
            pagesContainer.scrollTop = targetPage.offsetTop;
        }
    };
    const rotate = (degree) => {
        const updateRotation = (rotation === 360 || rotation === -360) ? degree : rotation + degree;
        setRotation(updateRotation);
    };
    const changeScrollMode = (mode) => {
        const pagesContainer = pagesRef.current;
        if (!pagesContainer) {
            return;
        }
        let styles = {};
        switch (mode) {
            case ScrollMode.Vertical:
                styles = {
                    'display': 'flex',
                    'flex-direction': 'column',
                    'flex-wrap': '',
                    'justify-content': '',
                };
                break;
            case ScrollMode.Horizontal:
                styles = {
                    'display': 'flex',
                    'flex-direction': 'row',
                    'flex-wrap': '',
                    'justify-content': '',
                };
                break;
            case ScrollMode.Wrapped:
                styles = {
                    'display': 'flex',
                    'flex-direction': 'row',
                    'flex-wrap': 'wrap',
                    'justify-content': 'center',
                };
                break;
            default:
                break;
        }
        Object.keys(styles).forEach((k) => {
            pagesContainer.style.setProperty(k, styles[k]);
        });
    };
    const openFiles = (files) => {
        if (files.length === 0) {
            return;
        }
        const file = files[0];
        if (getFileExt(file.name).toLowerCase() !== 'pdf') {
            return;
        }
        new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (e) => {
                const bytes = new Uint8Array(reader.result);
                resolve(bytes);
            };
        }).then((data) => {
            onOpenFile(file.name, data);
        });
    };
    const jumpToMatch = (target) => {
        jumpToPage(target.pageIndex);
        setMatch(target);
    };
    const jumpToDest = (pageIndex, bottomOffset, scaleTo) => {
        const pagesContainer = pagesRef.current;
        if (!pagesContainer) {
            return;
        }
        const newPageIndex = pageIndex + 1;
        doc.getPage(newPageIndex).then((page) => {
            const viewport = page.getViewport({ scale: 1 });
            let top = 0;
            const bottom = bottomOffset || 0;
            switch (scaleTo) {
                case SpecialLevel.PageFit:
                    top = 0;
                    zoom(SpecialLevel.PageFit);
                    break;
                default:
                    top = (viewport.height - bottom) * scale;
                    break;
            }
            const targetPageEle = pageRefs[pageIndex].current;
            if (targetPageEle) {
                pagesContainer.scrollTop = targetPageEle.offsetTop + top;
            }
        });
    };
    return layout(toggleSidebar.opened, {
        attrs: {
            ref: pagesRef,
            style: {
                position: 'relative',
            },
        },
        children: (React.createElement(React.Fragment, null,
            isDragging && React.createElement(DropArea, null),
            isFullScreen && (React.createElement("div", { style: {
                    bottom: 0,
                    padding: '8px',
                    position: 'fixed',
                    right: 0,
                } },
                React.createElement("div", { style: { backgroundColor: '#FFF' }, title: "Exit full screen" },
                    React.createElement(Button, { onClick: closeFullScreen },
                        React.createElement(ExitFullScreenIcon, null))))),
            [...Array(numPages).keys()].map((index) => {
                return (React.createElement("div", { key: `pagelayer-${index}`, ref: (ref) => {
                        pageRefs[index].current = ref;
                    }, style: { padding: '8px' } },
                    React.createElement(PageLayer, { doc: doc, keywordRegexp: keywordRegexp, height: height, match: match, pageIndex: index, rotation: rotation, scale: scale, width: width, onJumpToDest: jumpToDest, onPageVisibilityChanged: pageVisibilityChanged })));
            }))),
    }, (renderToolbar) => (React.createElement(Toolbar, { currentPage: currentPage, doc: doc, fileName: fileName, scale: scale, onChangeScrollMode: changeScrollMode, onDownload: onDownload, onFullScreen: openFullScreen, onJumpTo: jumpToPage, onJumpToMatch: jumpToMatch, onOpenFiles: openFiles, onRotate: rotate, onSearchFor: setKeywordRegexp, onToggleDragScroll: toggleDragScroll, onToggleSidebar: toggleSidebar.toggle, onZoom: zoom, renderToolbar: renderToolbar })), {
        attrs: {},
        children: (React.createElement(Sidebar, { currentPage: currentPage, doc: doc, height: height, rotation: rotation, width: width, onJumpToDest: jumpToDest, onJumpToPage: jumpToPage })),
    });
};
export default ViewerInner;
