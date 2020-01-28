import React from 'react';
const defaultLayout = (isSidebarOpened, main, toolbar, sidebar) => {
    return (React.createElement("div", { style: {
            border: '1px solid rgba(0, 0, 0, .3)',
            display: 'grid',
            gridTemplateAreas: isSidebarOpened ? "'toolbar toolbar' 'sidebar main'" : "'toolbar' 'main'",
            gridTemplateColumns: isSidebarOpened ? '30% 1fr' : '1fr',
            gridTemplateRows: '40px calc(100% - 40px)',
            height: '100%',
            overflow: 'hidden',
            width: '100%',
            position: "fixed",
        } },
        React.createElement("div", { style: {
            alignItems: 'center',
            backgroundColor: '#EEE',
            borderBottom: '1px solid rgba(0, 0, 0, .1)',
            display: 'flex',
            gridArea: 'toolbar',
            justifyContent: 'center',
            padding: '0px 4px',
            // position: "fixed",
            // width: "100%",
            // zIndex: 40000
             
        } }, toolbar),
        
        React.createElement("div", { style: {
                borderRight: '1px solid rgba(0, 0, 0, 0.2)',
                display: isSidebarOpened ? 'flex' : 'none',
                gridArea: 'sidebar',
                justifyContent: 'center',
            } }, sidebar.children),
        React.createElement("div", Object.assign({}, main.attrs, { style: Object.assign({}, {
                gridArea: 'main',
                overflow: 'scroll',
            }, main.attrs.style) }), main.children)));
};
export default defaultLayout;
