import React from 'react';
const Observer = ({ children, threshold, onVisibilityChanged }) => {
    const containerRef = React.useRef(null);
    React.useEffect(() => {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const isVisible = entry.isIntersecting;
                const ratio = entry.intersectionRatio;
                onVisibilityChanged({ isVisible, ratio });
            });
        }, {
            threshold: threshold || 0,
        });
        const container = containerRef.current;
        if (!container) {
            return;
        }
        io.observe(container);
        return () => {
            io.unobserve(container);
        };
    }, []);
    return (React.createElement("div", { ref: containerRef }, children));
};
export default Observer;
