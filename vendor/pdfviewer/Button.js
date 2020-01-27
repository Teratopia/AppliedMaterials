import React from 'react';
import './button.css';
const Button = ({ children, isSelected = false, onClick }) => {
    return (React.createElement("button", { className: "viewer-button", style: {
            backgroundColor: isSelected ? 'rgba(0, 0, 0, .1)' : '',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '8px',
        }, onClick: onClick }, children));
};
export default Button;
