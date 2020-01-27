import React from 'react';
import useKeyUp from '../hooks/useKeyUp';
import useLockScroll from '../hooks/useLockScroll';
const ModalBody = ({ children, closeOnEscape, onToggle }) => {
    const contentRef = React.createRef();
    useLockScroll();
    useKeyUp(27, () => closeOnEscape && onToggle());
    return (React.createElement("div", { ref: contentRef, style: {
            background: '#FFF',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            margin: '160px auto 0 auto',
            maxWidth: '480px',
        } }, children));
};
export default ModalBody;
