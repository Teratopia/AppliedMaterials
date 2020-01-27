import React from 'react';
import PopoverBody from './PopoverBody';
import PopoverOverlay from './PopoverOverlay';
import Portal from './Portal';
const Popover = ({ closeOnClickOutside, closeOnEscape, content, offset, position, target }) => {
    const targetRef = React.createRef();
    const renderTarget = (toggle, opened) => (React.createElement("div", { ref: targetRef }, target(toggle, opened)));
    const renderContent = (toggle) => (React.createElement(PopoverOverlay, { closeOnClickOutside: closeOnClickOutside, onClose: toggle },
        React.createElement(PopoverBody, { closeOnEscape: closeOnEscape, offset: offset, position: position, targetRef: targetRef, onToggle: toggle }, content(toggle))));
    return (React.createElement(Portal, { content: renderContent, target: renderTarget }));
};
export default Popover;
