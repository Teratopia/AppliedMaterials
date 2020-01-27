import React from 'react';
import usePosition from '../hooks/usePosition';
import Arrow from './Arrow';
const TooltipBody = ({ children, offset, position, targetRef }) => {
    const contentRef = React.createRef();
    usePosition(contentRef, targetRef, position, offset);
    return (React.createElement("div", { ref: contentRef, style: {
            background: '#000',
            borderRadius: '4px',
            color: '#FFF',
            left: 0,
            maxWidth: '300px',
            position: 'absolute',
            textAlign: 'center',
            top: '-9999px',
            zIndex: 9999,
        } },
        React.createElement(Arrow, { position: position, styles: { background: '#000' } }),
        children));
};
export default TooltipBody;
