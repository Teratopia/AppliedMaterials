import React from 'react';
import ReactDOM from 'react-dom';
import useToggle from '../hooks/useToggle';
const Portal = ({ content, target }) => {
    const { opened, toggle } = useToggle();
    return (React.createElement(React.Fragment, null,
        target(toggle, opened),
        opened && ReactDOM.createPortal(content(toggle), document.body)));
};
export default Portal;
