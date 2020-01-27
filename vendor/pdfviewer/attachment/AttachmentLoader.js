import React from 'react';
import Spinner from '../Spinner';
import AttachmentList from './AttachmentList';
const AttachmentLoader = ({ doc }) => {
    const [attachments, setAttachments] = React.useState({
        files: [],
        isLoaded: false,
    });
    React.useEffect(() => {
        doc.getAttachments().then((response) => {
            const files = response
                ? Object.keys(response).map((file) => {
                    return {
                        data: response[file].content,
                        fileName: response[file].filename,
                    };
                })
                : [];
            setAttachments({
                files,
                isLoaded: true,
            });
        });
    }, []);
    return (!attachments.isLoaded
        ? React.createElement(Spinner, null)
        : React.createElement(AttachmentList, { files: attachments.files }));
};
export default AttachmentLoader;
