const wrap = (ele, startOffset, endOffset) => {
    const range = new Range();
    range.setStart(ele, startOffset);
    range.setEnd(ele, endOffset);
    const wrapper = document.createElement('span');
    range.surroundContents(wrapper);
    return wrapper;
};
export default wrap;
