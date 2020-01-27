import React from 'react';
import calculatePosition from '../utils/calculatePosition';
const usePosition = (contentRef, targetRef, position, offset) => {
    React.useEffect(() => {
        const targetEle = targetRef.current;
        const contentEle = contentRef.current;
        if (!contentEle || !targetEle) {
            return;
        }
        const { top, left } = calculatePosition(contentEle, targetEle, position, offset);
        contentEle.style.top = `${top}px`;
        contentEle.style.left = `${left}px`;
    }, []);
};
export default usePosition;
