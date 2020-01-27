import React from 'react';
import LocalizationContext from '../localization/LocalizationContext';
const WrongPassword = ({ verifyPasswordFn }) => {
    const l10n = React.useContext(LocalizationContext);
    const [password, setPassword] = React.useState('');
    const changePassword = (e) => {
        setPassword(e.target.value);
    };
    const submit = () => {
        verifyPasswordFn(password);
    };
    return (React.createElement("div", { style: {
            alignItems: 'center',
            border: '1px solid rgba(0, 0, 0, .3)',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
        } },
        React.createElement("div", null,
            React.createElement("div", { style: { margin: '8px 0' } },
                l10n.wrongPassword.tryAgain,
                ":"),
            React.createElement("input", { style: {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '8px',
                }, type: "password", onChange: changePassword }),
            React.createElement("div", { style: { margin: '8px 0' } },
                React.createElement("button", { style: {
                        backgroundColor: '#357EDD',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#FFF',
                        cursor: 'pointer',
                        padding: '8px 16px',
                    }, onClick: submit }, l10n.wrongPassword.submit)))));
};
export default WrongPassword;
