import React from 'react';
import Icon from './Icon';
const FullScreenIcon = () => {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: `M15.5,8.499l8-8
                M0.5,23.499l8-8
                M5.5,23.499h-5v-5
                M23.5,5.499v-5h-5
                M15.5,15.499l8,8
                M0.5,0.499l8,8
                M0.5,5.499v-5h5
                M18.5,23.499h5v-5` })));
};
export default FullScreenIcon;
