import getFileName from './fileName';
const downloadFile = (url, data) => {
    const blobUrl = (typeof data === 'string')
        ? ''
        : URL.createObjectURL(new Blob([data], { type: '' }));
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl || url;
    link.setAttribute('download', getFileName(url));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
    }
};
export default downloadFile;
