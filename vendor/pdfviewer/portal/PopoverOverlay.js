import React from 'react';
const PopoverOverlay = ({ children, closeOnClickOutside, onClose }) => {
    const onClick = (e) => {
        if (e.target === e.currentTarget && closeOnClickOutside) {
            onClose();
        }
    };
    React.useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).position;
        if (closeOnClickOutside) {
            document.body.style.position = 'relative';
        }
        return () => {
            document.body.style.setProperty('overflow', originalStyle);
        };
    }, [closeOnClickOutside]);
    return (closeOnClickOutside
        ? (React.createElement("div", { style: {
                bottom: '0',
                left: '0',
                position: 'absolute',
                right: '0',
                top: '0',
            }, onClick: onClick }, children))
        : React.createElement(React.Fragment, null, children));
};
export default PopoverOverlay;
