import React from 'react';
import defaultLayout from './layouts/defaultLayout';
import defaultToolbar from './layouts/defaultToolbar';
import DocumentLoader from './loader/DocumentLoader';
import LocalizationProvider from './localization/LocalizationProvider';
import PageSizeCalculator from './PageSizeCalculator';
import downloadFile from './utils/downloadFile';
import ViewerInner from './ViewerInner';
const Viewer = ({ fileUrl, layout, localization, parent }) => {
    
    const [file, setFile] = React.useState({
        data: fileUrl,
        name: fileUrl,
        parent,
    });
    const layoutOption = (isSidebarOpened, main, toolbar, sidebar) => {
        return defaultLayout(isSidebarOpened, main, toolbar(defaultToolbar), sidebar);
    };
    const openFile = (fileName, data) => {
        setFile({
            data,
            name: fileName,
        });
    };
    const download = () => {
        downloadFile(file.name, file.data);
    };
    const renderDoc = (doc) => {
        const renderInner = (pageSize) => (React.createElement(ViewerInner, { doc: doc, fileName: file.name, layout: layout || layoutOption, pageSize: pageSize, onDownload: download, onOpenFile: openFile, parent: parent }));
        return (React.createElement(PageSizeCalculator, { doc: doc, render: renderInner }));
    };
    return (React.createElement(LocalizationProvider, { localization: localization },
        React.createElement(DocumentLoader, { file: file.data, render: renderDoc })));
};
export default Viewer;
