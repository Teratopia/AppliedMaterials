import React from 'react';
var ToggleStatus;
(function (ToggleStatus) {
    ToggleStatus["Close"] = "Close";
    ToggleStatus["Open"] = "Open";
    ToggleStatus["Toggle"] = "Toggle";
})(ToggleStatus || (ToggleStatus = {}));
const useToggle = () => {
    const [opened, setOpened] = React.useState(false);
    const toggle = (status) => {
        switch (status) {
            case ToggleStatus.Close:
                setOpened(false);
                break;
            case ToggleStatus.Open:
                setOpened(true);
                break;
            case ToggleStatus.Toggle:
            default:
                setOpened((isOpened) => !isOpened);
                break;
        }
    };
    return { opened, toggle };
};
export { ToggleStatus };
export default useToggle;
