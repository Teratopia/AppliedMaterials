import React from 'react';
import LocalizationContext from '../localization/LocalizationContext';
import MenuDivider from '../menu/MenuDivider';
import MenuItem from '../menu/MenuItem';
import Popover from '../portal/Popover';
import Position from '../portal/Position';
import { SpecialLevel } from './zoomingLevel';
const LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
const PORTAL_OFFSET = { left: 0, top: 8 };
const ZoomPopover = ({ scale, onZoom }) => {
    const l10n = React.useContext(LocalizationContext);
    const getSpcialLevelLabel = (level) => {
        switch (level) {
            case SpecialLevel.ActualSize: return l10n.zoom.actualSize;
            case SpecialLevel.PageFit: return l10n.zoom.pageFit;
            case SpecialLevel.PageWidth: return l10n.zoom.pageWidth;
        }
    };
    const arrow = () => {
        return (React.createElement("span", { style: {
                borderColor: 'rgba(0, 0, 0, .6) transparent transparent transparent',
                borderStyle: 'solid',
                borderWidth: '8px 4px 0 4px',
                height: '0',
                width: '0',
            } }));
    };
    const renderTarget = (toggle) => {
        const click = () => { toggle(); };
        return (React.createElement("span", { style: {
                alignItems: 'center',
                display: 'flex',
            }, onClick: click },
            React.createElement("span", { style: { padding: '4px' } },
                Math.round(scale * 100),
                "%"),
            arrow()));
    };
    const renderContent = (toggle) => (React.createElement("div", { style: { padding: '8px 0' } },
        React.createElement("ul", { style: {
                listStyleType: 'none',
                margin: '0',
                padding: '0',
            } },
            Object.keys(SpecialLevel).map((k) => {
                const level = k;
                const clickMenuItem = () => { toggle(); onZoom(level); };
                return (React.createElement(MenuItem, { key: level, onClick: clickMenuItem }, getSpcialLevelLabel(level)));
            }),
            React.createElement(MenuDivider, null),
            LEVELS.map((level) => {
                const clickMenuItem = () => { toggle(); onZoom(level); };
                return (React.createElement(MenuItem, { key: level, onClick: clickMenuItem }, `${Math.round(level * 100)}%`));
            }))));
    return (React.createElement(Popover, { position: Position.BottomCenter, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET, closeOnClickOutside: true, closeOnEscape: true }));
};
export default ZoomPopover;
