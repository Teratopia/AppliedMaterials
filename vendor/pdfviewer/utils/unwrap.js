const removeNode = (ele) => {
    const parent = ele.parentNode;
    if (parent) {
        parent.removeChild(ele);
    }
};
const replaceNode = (replacementNode, node) => {
    removeNode(replacementNode);
    const parent = node.parentNode;
    if (parent) {
        parent.insertBefore(replacementNode, node);
    }
    removeNode(node);
};
const unwrap = (ele) => {
    const parent = ele.parentNode;
    if (!parent) {
        return;
    }
    const range = document.createRange();
    range.selectNodeContents(ele);
    replaceNode(range.extractContents(), ele);
    parent.normalize();
};
export default unwrap;
