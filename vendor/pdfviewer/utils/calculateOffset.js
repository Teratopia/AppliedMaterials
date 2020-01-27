const calculateOffset = (children, parent) => {
    let top = children.offsetTop;
    let left = children.offsetLeft;
    let p = children.parentElement;
    while (p && p !== parent) {
        top += p.offsetTop;
        left += p.offsetLeft;
        p = p.parentElement;
    }
    return {
        left,
        top,
    };
};
export default calculateOffset;
