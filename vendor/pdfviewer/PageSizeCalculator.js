import React from 'react';
import Spinner from './Spinner';
const PageSizeCalculator = ({ doc, render }) => {
    const pagesRef = React.useRef(null);
    const [pageSize, setPageSize] = React.useState({
        pageHeight: 0,
        pageWidth: 0,
        scale: 1,
    });
    React.useEffect(() => {
        doc.getPage(1).then((pdfPage) => {
            const viewport = pdfPage.getViewport({ scale: 1 });
            const w = viewport.width;
            const h = viewport.height;
            const pagesEle = pagesRef.current;
            if (!pagesEle) {
                return;
            }
            const scale = Math.min(1, pagesEle.offsetWidth / w);
            setPageSize({
                pageHeight: h,
                pageWidth: w,
                scale,
            });
        });
    }, [doc]);
    const { pageWidth } = pageSize;
    return (React.createElement("div", { ref: pagesRef }, pageWidth === 0
        ? (React.createElement("div", { style: {
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                width: '100%',
            } },
            React.createElement(Spinner, null)))
        : render(pageSize)));
};
export default PageSizeCalculator;
