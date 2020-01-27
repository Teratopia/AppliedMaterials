import React from 'react';
import LocalizationContext from '../localization/LocalizationContext';
import convertDate from '../utils/convertDate';
import getFileName from '../utils/fileName';
import getFileSize from '../utils/fileSize';
import PropertiesLoader from './PropertiesLoader';
import PropertyItem from './PropertyItem';
const PropertiesModal = ({ doc, fileName, onToggle }) => {
    const l10n = React.useContext(LocalizationContext);
    const formatDate = (input) => {
        const date = convertDate(input);
        return date ? `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}` : '';
    };
    const renderData = (data) => (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { padding: '0 8px ' } },
            React.createElement(PropertyItem, { label: `${l10n.property.fileName}`, value: data.fileName || getFileName(fileName) }),
            React.createElement(PropertyItem, { label: `${l10n.property.fileSize}`, value: getFileSize(data.length) })),
        React.createElement("div", { style: { borderBottom: '1px solid rgba(0, 0, 0, .3)' } }),
        React.createElement("div", { style: { padding: '0 8px ' } },
            React.createElement(PropertyItem, { label: `${l10n.property.title}`, value: data.info.Title }),
            React.createElement(PropertyItem, { label: `${l10n.property.author}`, value: data.info.Author }),
            React.createElement(PropertyItem, { label: `${l10n.property.subject}`, value: data.info.Subject }),
            React.createElement(PropertyItem, { label: `${l10n.property.keywords}`, value: data.info.Keywords }),
            React.createElement(PropertyItem, { label: `${l10n.property.creator}`, value: data.info.Creator }),
            React.createElement(PropertyItem, { label: `${l10n.property.creationDate}`, value: formatDate(data.info.CreationDate) }),
            React.createElement(PropertyItem, { label: `${l10n.property.modificationDate}`, value: formatDate(data.info.ModDate) })),
        React.createElement("div", { style: { borderBottom: '1px solid rgba(0, 0, 0, .3)' } }),
        React.createElement("div", { style: { padding: '0 8px ' } },
            React.createElement(PropertyItem, { label: `${l10n.property.pdfProducer}`, value: data.info.Producer }),
            React.createElement(PropertyItem, { label: `${l10n.property.pdfVersion}`, value: data.info.PDFFormatVersion }),
            React.createElement(PropertyItem, { label: `${l10n.property.pageCount}`, value: `${doc.numPages}` }))));
    return (React.createElement("div", { style: { padding: '8px 0' } },
        React.createElement(PropertiesLoader, { doc: doc, render: renderData }),
        React.createElement("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: '8px',
            } },
            React.createElement("button", { style: {
                    backgroundColor: '#357EDD',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#FFF',
                    cursor: 'pointer',
                    padding: '8px',
                }, onClick: onToggle }, l10n.property.close))));
};
export default PropertiesModal;
