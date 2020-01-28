import React from 'react';
const defaultToolbar = (toolbarSlot) => {
    return (React.createElement("div", { style: {
            alignItems: 'center',
            display: 'flex',
            width: '100%',
        }},
        React.createElement("div", { style: {
                alignItems: 'center',
                display: 'flex',
                width: "100%",
            } },
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.toggleSidebarButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.searchPopover),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.previousPageButton),
            React.createElement("div", { style: { padding: '0 2px' } },
                toolbarSlot.currentPageInput,
                " / ",
                toolbarSlot.numPages),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.nextPageButton)),
        React.createElement("div", { style: {
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                flexShrink: 1,
                justifyContent: 'center',
                
            } },
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.zoomOutButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.zoomPopover),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.zoomInButton)),
        React.createElement("div", { style: {
                alignItems: 'center',
                display: 'flex',
                marginLeft: 'auto',
            } },
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.fullScreenButton),
            // React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.openFileButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.downloadButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.moreActionsPopover)
            )));
};
export default defaultToolbar;
