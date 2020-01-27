import React from 'react';
import ModalBody from './ModalBody';
import ModalOverlay from './ModalOverlay';
import Portal from './Portal';
const Modal = ({ closeOnClickOutside, closeOnEscape, content, target }) => {
    const renderContent = (toggle) => (React.createElement(ModalOverlay, { closeOnClickOutside: closeOnClickOutside, onClose: toggle },
        React.createElement(ModalBody, { closeOnEscape: closeOnEscape, onToggle: toggle }, content(toggle))));
    return (React.createElement(Portal, { target: target, content: renderContent }));
};
export default Modal;
