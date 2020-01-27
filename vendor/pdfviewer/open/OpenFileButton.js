import React from 'react';
import OpenFileIcon from '../icons/OpenFileIcon';
import LocalizationContext from '../localization/LocalizationContext';
import Position from '../portal/Position';
import Tooltip from '../portal/Tooltip';
import './openFileButton.css';
const TOOLTIP_OFFSET = { left: 0, top: 8 };
const OpenFileButton = ({ onOpenFiles }) => {
    const l10n = React.useContext(LocalizationContext);
    const openFiles = (e) => {
        const files = e.target.files;
        if (files) {
            onOpenFiles(files);
        }
    };
    const renderContent = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.openFile));
    return (React.createElement(Tooltip, { position: Position.BottomCenter, target: (React.createElement("div", { className: "viewer-open-file", style: {
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                position: 'relative',
            } },
            React.createElement("input", { multiple: false, style: {
                    bottom: '0',
                    height: '100%',
                    left: '0',
                    opacity: 0,
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    width: '100%',
                }, type: "file", onChange: openFiles }),
            React.createElement(OpenFileIcon, null))), content: renderContent, offset: TOOLTIP_OFFSET }));
};
export default OpenFileButton;
