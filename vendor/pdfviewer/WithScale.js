import React from 'react';
const WithScale = ({ callback, children, rotation, scale }) => {
    React.useEffect(() => {
        callback();
    }, [rotation, scale ]);
    return (React.createElement(React.Fragment, null, children));
};
export default WithScale;
