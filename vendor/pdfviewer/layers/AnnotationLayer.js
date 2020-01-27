import React from 'react';
import PdfJs from '../PdfJs';
import getDestination from '../utils/getDestination';
import WithScale from '../WithScale';
import './annotationLayer.css';
const AnnotationLayer = ({ doc, page, rotation, scale, onJumpToDest }) => {
    const containerRef = React.createRef();
    const renderAnnotation = () => {
        const container = containerRef.current;
        if (container) {
            container.innerHTML = '';
        }
        const viewport = page.getViewport({ rotation, scale });
        page.getAnnotations({ intent: 'display' }).then((annotations) => {
            if (annotations.length === 0) {
                return;
            }
            const linkService = {
                getDestinationHash: (dest) => {
                    return (typeof dest === 'string')
                        ? `#${escape(dest)}`
                        : `#${escape(JSON.stringify(dest))}`;
                },
                navigateTo: (dest) => {
                    getDestination(doc, dest).then((target) => {
                        const { pageIndex, bottomOffset, scaleTo } = target;
                        onJumpToDest(pageIndex + 1, bottomOffset, scaleTo);
                    });
                },
            };
            const clonedViewPort = viewport.clone({ dontFlip: true });
            PdfJs.AnnotationLayer.render({
                annotations,
                div: container,
                linkService,
                page,
                viewport: clonedViewPort,
            });
        });
    };
    return (React.createElement(WithScale, { callback: renderAnnotation, rotation: rotation, scale: scale },
        React.createElement("div", { className: "viewer-annotation", ref: containerRef })));
};
export default AnnotationLayer;
