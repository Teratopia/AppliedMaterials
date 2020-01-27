import React from 'react';
import en_US from './en_US.json';
import LocalizationContext from './LocalizationContext';
const LocalizationProvider = ({ children, localization }) => {
    const defaultL10n = en_US;
    const l10n = localization || defaultL10n;
    return (React.createElement(LocalizationContext.Provider, { value: l10n }, children));
};
export default LocalizationProvider;
