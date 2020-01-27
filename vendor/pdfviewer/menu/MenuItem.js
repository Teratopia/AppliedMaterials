import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import './menuItem.css';
const MenuItem = ({ checked = false, children, icon = null, onClick }) => {
    return (React.createElement("li", { className: "viewer-menu-item", style: {
            alignItems: 'center',
            display: 'flex',
            padding: '4px 0',
        }, onClick: onClick },
        React.createElement("div", { style: {
                paddingLeft: '16px',
                paddingRight: '8px',
            } }, icon),
        React.createElement("div", { style: {
                flexGrow: 1,
                flexShrink: 1,
                paddingRight: '32px',
            } }, children),
        React.createElement("div", { style: { paddingRight: '16px' } }, checked && React.createElement(CheckIcon, null))));
};
export default MenuItem;
