import React from 'react';
const useKeyUp = (targetKeyCode, handler) => {
    const keyUpHandler = (e) => (e.keyCode === targetKeyCode) && handler();
    React.useEffect(() => {
        document.addEventListener('keyup', keyUpHandler);
        return () => document.removeEventListener('keyup', keyUpHandler);
    }, []);
};
export default useKeyUp;
