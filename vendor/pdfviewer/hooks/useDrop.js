import React from 'react';
const useDrop = (ref, onDrop) => {
    const dragCount = React.useRef(0);
    const [isDragging, setDragging] = React.useState(false);
    const onDropHandler = (e) => {
        e.preventDefault();
        setDragging(false);
        dragCount.current = 0;
        if (e.dataTransfer) {
            onDrop(e.dataTransfer.files);
        }
    };
    const onDragOverHandler = (e) => {
        e.preventDefault();
    };
    const onDragEnterHandler = (e) => {
        e.preventDefault();
        dragCount.current += 1;
        if (dragCount.current <= 1) {
            setDragging(true);
        }
    };
    const onDragLeaveHandler = (e) => {
        e.preventDefault();
        dragCount.current -= 1;
        if (dragCount.current <= 0) {
            setDragging(false);
        }
    };
    React.useEffect(() => {
        const ele = ref.current;
        if (!ele) {
            return;
        }
        ele.addEventListener('drop', onDropHandler);
        ele.addEventListener('dragover', onDragOverHandler);
        ele.addEventListener('dragenter', onDragEnterHandler);
        ele.addEventListener('dragleave', onDragLeaveHandler);
        return () => {
            ele.removeEventListener('drop', onDropHandler);
            ele.removeEventListener('dragover', onDragOverHandler);
            ele.removeEventListener('dragenter', onDragEnterHandler);
            ele.removeEventListener('dragleave', onDragLeaveHandler);
        };
    }, [ref.current]);
    return { isDragging };
};
export default useDrop;
