import React from 'react';
import { ToggleStatus } from '../hooks/useToggle';
import Portal from './Portal';
import TooltipBody from './TooltipBody';
const Tooltip = ({ content, offset, position, target }) => {
    const targetRef = React.createRef();
    const renderTarget = (toggle) => {
        const show = () => { toggle(ToggleStatus.Close); };
        const hide = () => { toggle(ToggleStatus.Close); };
        return (React.createElement("div", { ref: targetRef, onMouseEnter: show, onMouseLeave: hide }, target));
    };
    const renderContent = () => (React.createElement(TooltipBody, { offset: offset, position: position, targetRef: targetRef }, content()));
    return (React.createElement(Portal, { target: renderTarget, content: renderContent }));
};
export default Tooltip;
