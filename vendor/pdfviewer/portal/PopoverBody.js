import React from 'react';
import useKeyUp from '../hooks/useKeyUp';
import usePosition from '../hooks/usePosition';
import Arrow from './Arrow';
const PopoverBody = ({ children, closeOnEscape, offset, position, targetRef, onToggle, }) => {
    const contentRef = React.createRef();
    useKeyUp(27, () => closeOnEscape && onToggle());
    usePosition(contentRef, targetRef, position, offset);
    return (React.createElement("div", { ref: contentRef, style: {
            background: '#FFF',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            left: 0,
            position: 'absolute',
            top: '-9999px',
            zIndex: 9999,
        } },
        React.createElement(Arrow, { position: position, styles: { background: '#FFF' } }),
        children));
};
export default PopoverBody;
