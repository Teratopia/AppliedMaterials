import React from 'react';
import LocalizationContext from '../localization/LocalizationContext';
import downloadFile from '../utils/downloadFile';
import './attachmentList.css';
const AttachmentList = ({ files }) => {
    const l10n = React.useContext(LocalizationContext);
    const renderItem = (file) => {
        const onClick = () => downloadFile(file.fileName, file.data);
        return (React.createElement("li", { className: "viewer-attachment-item", key: `attachment-${file.fileName}`, style: { padding: '8px' }, title: `${l10n.attachment.clickToDownload}`, onClick: onClick }, file.fileName));
    };
    return (files.length === 0
        ? React.createElement("div", null, l10n.attachment.noAttachment)
        : (React.createElement("ul", { style: {
                listStyleType: 'none',
                margin: '0',
                padding: '0',
                width: '100%',
            } }, files.map(renderItem))));
};
export default AttachmentList;
