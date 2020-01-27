import React from 'react';
import Spinner from '../Spinner';
const PropertiesLoader = ({ doc, render }) => {
    const [data, setData] = React.useState();
    React.useEffect(() => {
        doc.getMetadata().then((meta) => {
            return Promise.resolve(meta);
        }).then((meta) => {
            return doc.getDownloadInfo().then((d) => {
                return Promise.resolve({
                    fileName: meta.contentDispositionFilename || '',
                    info: meta.info,
                    length: d.length,
                });
            });
        }).then((response) => {
            setData(response);
        });
    }, []);
    return (data ? render(data) : React.createElement("div", { style: { textAlign: 'center' } },
        React.createElement(Spinner, null)));
};
export default PropertiesLoader;
