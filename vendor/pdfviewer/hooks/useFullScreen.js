import React from 'react';
import { addFullScreenChangeListener, exitFullScreen, getFullScreenElement, removeFullScreenChangeListener, requestFullScreen, } from '../utils/fullScreen';
const useFullScreen = (ref) => {
    const [isFullScreen, setIsFullScreen] = React.useState(false);
    React.useEffect(() => {
        addFullScreenChangeListener(onFullScreenChange);
        return () => {
            removeFullScreenChangeListener(onFullScreenChange);
        };
    }, [ref.current]);
    const closeOtherFullScreen = () => {
        const ele = getFullScreenElement();
        return (ele && ele !== ref.current)
            ? exitFullScreen(ele)
            : Promise.resolve();
    };
    const openFullScreen = () => {
        closeOtherFullScreen().then((_) => {
            if (ref.current) {
                requestFullScreen(ref.current);
            }
        });
    };
    const closeFullScreen = () => {
        const ele = getFullScreenElement();
        if (isFullScreen && ele && ele === ref.current) {
            exitFullScreen(document);
        }
    };
    const onFullScreenChange = () => {
        const ele = getFullScreenElement();
        setIsFullScreen(ele === ref.current);
    };
    return {
        closeFullScreen,
        isFullScreen,
        openFullScreen,
    };
};
export default useFullScreen;
