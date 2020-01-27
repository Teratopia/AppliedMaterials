import React from 'react';
const PropertyItem = ({ label, value }) => {
    return (React.createElement("dl", { style: { margin: '8px 0' } },
        React.createElement("dt", { style: {
                display: 'inline-block',
                paddingRight: '8px',
                width: '30%',
            } },
            label,
            ":"),
        React.createElement("dd", { style: { display: 'inline-block' } }, value || '-')));
};
export default PropertyItem;
