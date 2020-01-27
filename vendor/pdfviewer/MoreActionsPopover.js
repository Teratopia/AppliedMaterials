import React from 'react';
import Button from './Button';
import DownArrowIcon from './icons/DownArrowIcon';
import HandToolIcon from './icons/HandToolIcon';
import HorizontalScrollingIcon from './icons/HorizontalScrollingIcon';
import InfoIcon from './icons/InfoIcon';
import MoreIcon from './icons/MoreIcon';
import RotateBackwardIcon from './icons/RotateBackwardIcon';
import RotateForwardIcon from './icons/RotateForwardIcon';
import TextSelectionIcon from './icons/TextSelectionIcon';
import UpArrowIcon from './icons/UpArrowIcon';
import VerticalScrollingIcon from './icons/VerticalScrollingIcon';
import WrappedScrollingIcon from './icons/WrappedScrollingIcon';
import LocalizationContext from './localization/LocalizationContext';
import MenuDivider from './menu/MenuDivider';
import MenuItem from './menu/MenuItem';
import Modal from './portal/Modal';
import Popover from './portal/Popover';
import Position from './portal/Position';
import Tooltip from './portal/Tooltip';
import PropertiesModal from './property/PropertiesModal';
var ScrollMode;
(function (ScrollMode) {
    ScrollMode["Horizontal"] = "Horizontal";
    ScrollMode["Vertical"] = "Vertical";
    ScrollMode["Wrapped"] = "Wrapped";
})(ScrollMode || (ScrollMode = {}));
const PORTAL_OFFSET = { left: 0, top: 8 };
const MoreActionsPopover = ({ doc, fileName, onChangeScrollMode, onJumpToFirstPage, onJumpToLastPage, onRotate, onToggleDragScroll, }) => {
    const l10n = React.useContext(LocalizationContext);
    const [enableDragScroll, setEnableDragScroll] = React.useState(false);
    const [scrollMode, setScrollMode] = React.useState(ScrollMode.Vertical);
    const renderMoreActions = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.moreActions));
    const renderTarget = (toggle, opened) => (React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: toggle, isSelected: opened },
            React.createElement(MoreIcon, null)), content: renderMoreActions, offset: PORTAL_OFFSET }));
    const renderPropertyMenu = (toggle) => (React.createElement(MenuItem, { icon: React.createElement(InfoIcon, null), onClick: toggle }, l10n.moreActions.documentProperties));
    const renderPropertiesModal = (toggle) => (React.createElement(PropertiesModal, { doc: doc, fileName: fileName, onToggle: toggle }));
    const renderContent = (toggle) => {
        const jumpToFirstPage = () => {
            toggle();
            onJumpToFirstPage();
        };
        const jumpToLastPage = () => {
            toggle();
            onJumpToLastPage();
        };
        const rotateForward = () => {
            toggle();
            onRotate(90);
        };
        const rotateBackward = () => {
            toggle();
            onRotate(-90);
        };
        const activateTextSelectionMode = () => {
            toggle();
            setEnableDragScroll(false);
            onToggleDragScroll(false);
        };
        const activateHandMode = () => {
            toggle();
            setEnableDragScroll(true);
            onToggleDragScroll(true);
        };
        const activateScrollMode = (mode) => {
            toggle();
            setScrollMode(mode);
            onChangeScrollMode(mode);
        };
        const setVerticalScrollMode = () => activateScrollMode(ScrollMode.Vertical);
        const setHorizontalScrollMode = () => activateScrollMode(ScrollMode.Horizontal);
        const setWrappedScrollMode = () => activateScrollMode(ScrollMode.Wrapped);
        return (React.createElement("div", { style: { padding: '8px 0' } },
            React.createElement("ul", { style: {
                    listStyleType: 'none',
                    margin: 0,
                    padding: 0,
                } },
                React.createElement(MenuItem, { icon: React.createElement(UpArrowIcon, null), onClick: jumpToFirstPage }, l10n.moreActions.goToFirstPage),
                React.createElement(MenuItem, { icon: React.createElement(DownArrowIcon, null), onClick: jumpToLastPage }, l10n.moreActions.goToLastPage),
                React.createElement(MenuDivider, null),
                React.createElement(MenuItem, { icon: React.createElement(RotateForwardIcon, null), onClick: rotateForward }, l10n.moreActions.rotateForward),
                React.createElement(MenuItem, { icon: React.createElement(RotateBackwardIcon, null), onClick: rotateBackward }, l10n.moreActions.rotateBackward),
                React.createElement(MenuDivider, null),
                React.createElement(MenuItem, { checked: !enableDragScroll, icon: React.createElement(TextSelectionIcon, null), onClick: activateTextSelectionMode }, l10n.moreActions.textSelectionTool),
                React.createElement(MenuItem, { checked: enableDragScroll, icon: React.createElement(HandToolIcon, null), onClick: activateHandMode }, l10n.moreActions.handTool),
                React.createElement(MenuDivider, null),
                React.createElement(MenuItem, { checked: scrollMode === ScrollMode.Vertical, icon: React.createElement(VerticalScrollingIcon, null), onClick: setVerticalScrollMode }, l10n.moreActions.verticalScrolling),
                React.createElement(MenuItem, { checked: scrollMode === ScrollMode.Horizontal, icon: React.createElement(HorizontalScrollingIcon, null), onClick: setHorizontalScrollMode }, l10n.moreActions.horizontalScrolling),
                React.createElement(MenuItem, { checked: scrollMode === ScrollMode.Wrapped, icon: React.createElement(WrappedScrollingIcon, null), onClick: setWrappedScrollMode }, l10n.moreActions.wrappedScrolling),
                React.createElement(MenuDivider, null),
                React.createElement(Modal, { target: renderPropertyMenu, content: renderPropertiesModal, closeOnClickOutside: true, closeOnEscape: true }))));
    };
    return (React.createElement(Popover, { position: Position.BottomRight, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET, closeOnClickOutside: true, closeOnEscape: true }));
};
export { ScrollMode };
export default MoreActionsPopover;
