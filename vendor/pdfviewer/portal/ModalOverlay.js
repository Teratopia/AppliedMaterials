import React from 'react';
const ModalOverlay = ({ children, closeOnClickOutside, onClose }) => {
    const onClick = (e) => {
        if (e.target === e.currentTarget && closeOnClickOutside) {
            onClose();
        }
    };
    return (React.createElement("div", { style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            bottom: 0,
            left: 0,
            position: 'fixed',
            right: 0,
            top: 0,
            zIndex: 9999,
        }, onClick: onClick }, children));
};
export default ModalOverlay;
