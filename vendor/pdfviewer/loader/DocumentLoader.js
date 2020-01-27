import React from 'react';
import PdfJs from '../PdfJs';
import Spinner from '../Spinner';
import AskForPasswordState from './AskForPasswordState';
import AskingPassword from './AskingPassword';
import CompletedState from './CompletedState';
import FailureState from './FailureState';
import LoadingState from './LoadingState';
import WrongPassword from './WrongPassword';
import WrongPasswordState from './WrongPasswordState';
const DocumentLoader = ({ file, render }) => {
    const [status, setStatus] = React.useState(new LoadingState(0));
    React.useEffect(() => {
        setStatus(new LoadingState(0));
        const loadingTask = PdfJs.getDocument(file);
        loadingTask.onPassword = (verifyPassword, reason) => {
            switch (reason) {
                case PdfJs.PasswordResponses.NEED_PASSWORD:
                    setStatus(new AskForPasswordState(verifyPassword));
                    break;
                case PdfJs.PasswordResponses.INCORRECT_PASSWORD:
                    setStatus(new WrongPasswordState(verifyPassword));
                    break;
                default:
                    break;
            }
        };
        loadingTask.promise.then((doc) => setStatus(new CompletedState(doc)), (err) => setStatus(new FailureState(err.message || 'Cannot load document')));
        return () => {
            loadingTask.destroy();
        };
    }, [file]);
    switch (true) {
        case (status instanceof AskForPasswordState):
            const s = status;
            return React.createElement(AskingPassword, { verifyPasswordFn: status.verifyPasswordFn });
        case (status instanceof WrongPasswordState):
            return React.createElement(WrongPassword, { verifyPasswordFn: status.verifyPasswordFn });
        case (status instanceof CompletedState):
            return render(status.doc);
        case (status instanceof FailureState):
            return (React.createElement("div", { style: {
                    textAlign: 'center',
                } }, status.error));
        case (status instanceof LoadingState):
        default:
            return (React.createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '16px 0',
                    width: '100%',
                } },
                React.createElement(Spinner, null)));
    }
};
export default DocumentLoader;
