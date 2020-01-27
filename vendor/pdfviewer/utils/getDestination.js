import { SpecialLevel } from '../zoom/zoomingLevel';
const parse = (pageIndex, destArray) => {
    let bottomOffset;
    let scale;
    switch (destArray[1].name) {
        case 'XYZ':
            bottomOffset = destArray[3];
            scale = destArray[4];
            return {
                bottomOffset,
                pageIndex: pageIndex - 1,
                scaleTo: scale,
            };
        case 'Fit':
            return {
                bottomOffset: 0,
                pageIndex: pageIndex - 1,
                scaleTo: SpecialLevel.PageFit,
            };
        default:
            return {
                bottomOffset: 0,
                pageIndex: pageIndex - 1,
                scaleTo: 1,
            };
    }
};
const getDestination = (doc, dest) => {
    return new Promise((res, _) => {
        new Promise((resolve, __) => {
            if (typeof dest === 'string') {
                doc.getDestination(dest).then((destArray) => {
                    resolve(destArray);
                });
            }
            else {
                resolve(dest);
            }
        }).then((destArray) => {
            doc.getPageIndex(destArray[0]).then((pageIndex) => {
                const target = parse(pageIndex, destArray);
                res(target);
            });
        });
    });
};
export default getDestination;
