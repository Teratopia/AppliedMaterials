const LEVELS = [
    0.75, 1, 1.25, 1.5, 2,
    
];
var SpecialLevel;
(function (SpecialLevel) {
    SpecialLevel["ActualSize"] = "ActualSize";
    SpecialLevel["PageFit"] = "PageFit";
    SpecialLevel["PageWidth"] = "PageWidth";
})(SpecialLevel || (SpecialLevel = {}));
const increase = (currentLevel) => {
    const found = LEVELS.find((item) => item > currentLevel);
    return found || currentLevel;
};
const decrease = (currentLevel) => {
    const found = LEVELS.findIndex((item) => item >= currentLevel);
    return found === -1 || found === 0 ? currentLevel : LEVELS[found - 1];
};
export { increase, decrease, SpecialLevel };
