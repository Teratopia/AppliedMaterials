'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var PdfJs = require('pdfjs-dist');

var Button = function (_a) {
    var children = _a.children, _b = _a.isSelected, isSelected = _b === void 0 ? false : _b, onClick = _a.onClick;
    return (React.createElement("button", { className: "viewer-button", style: {
            backgroundColor: isSelected ? 'rgba(0, 0, 0, .1)' : '',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '8px',
        }, onClick: onClick }, children));
};

var Icon = function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? 24 : _b;
    var width = (size || 24) + "px";
    return (React.createElement("svg", { height: width, viewBox: "0 0 24 24", fill: "none", stroke: "rgb(0, 0, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1", width: width }, children));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var defaultLayout = function (isSidebarOpened, main, toolbar, sidebar) {
    return (React.createElement("div", { style: {
            border: '1px solid rgba(0, 0, 0, .3)',
            display: 'grid',
            gridTemplateAreas: isSidebarOpened ? "'toolbar toolbar' 'sidebar main'" : "'toolbar' 'main'",
            gridTemplateColumns: isSidebarOpened ? '30% 1fr' : '1fr',
            gridTemplateRows: '40px calc(100% - 40px)',
            height: '100%',
            overflow: 'hidden',
            width: '100%',
        } },
        React.createElement("div", { style: {
                alignItems: 'center',
                backgroundColor: '#EEE',
                borderBottom: '1px solid rgba(0, 0, 0, .1)',
                display: 'flex',
                gridArea: 'toolbar',
                justifyContent: 'center',
                padding: '4px',
            } }, toolbar),
        React.createElement("div", { style: {
                borderRight: '1px solid rgba(0, 0, 0, 0.2)',
                display: isSidebarOpened ? 'flex' : 'none',
                gridArea: 'sidebar',
                justifyContent: 'center',
            } }, sidebar.children),
        React.createElement("div", __assign({}, main.attrs, { style: Object.assign({}, {
                gridArea: 'main',
                overflow: 'scroll',
            }, main.attrs.style) }), main.children)));
};

var defaultToolbar = function (toolbarSlot) {
    return (React.createElement("div", { style: {
            alignItems: 'center',
            display: 'flex',
            width: '100%',
        } },
        React.createElement("div", { style: {
                alignItems: 'center',
                display: 'flex',
            } },
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.toggleSidebarButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.searchPopover),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.previousPageButton),
            React.createElement("div", { style: { padding: '0 2px' } },
                toolbarSlot.currentPageInput,
                " / ",
                toolbarSlot.numPages),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.nextPageButton)),
        React.createElement("div", { style: {
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                flexShrink: 1,
                justifyContent: 'center',
            } },
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.zoomOutButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.zoomPopover),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.zoomInButton)),
        React.createElement("div", { style: {
                alignItems: 'center',
                display: 'flex',
                marginLeft: 'auto',
            } },
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.fullScreenButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.openFileButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.downloadButton),
            React.createElement("div", { style: { padding: '0 2px' } }, toolbarSlot.moreActionsPopover))));
};

var MenuDivider = function () {
    return (React.createElement("li", { style: {
            borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
            margin: '4px 0',
        } }));
};

var CheckIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M23.5,0.499l-16.5,23l-6.5-6.5" })));
};

var MenuItem = function (_a) {
    var _b = _a.checked, checked = _b === void 0 ? false : _b, children = _a.children, _c = _a.icon, icon = _c === void 0 ? null : _c, onClick = _a.onClick;
    return (React.createElement("li", { className: "viewer-menu-item", style: {
            alignItems: 'center',
            display: 'flex',
            padding: '4px 0',
        }, onClick: onClick },
        React.createElement("div", { style: {
                paddingLeft: '16px',
                paddingRight: '8px',
            } }, icon),
        React.createElement("div", { style: {
                flexGrow: 1,
                flexShrink: 1,
                paddingRight: '32px',
            } }, children),
        React.createElement("div", { style: { paddingRight: '16px' } }, checked && React.createElement(CheckIcon, null))));
};

var useKeyUp = function (targetKeyCode, handler) {
    var keyUpHandler = function (e) { return (e.keyCode === targetKeyCode) && handler(); };
    React.useEffect(function () {
        document.addEventListener('keyup', keyUpHandler);
        return function () { return document.removeEventListener('keyup', keyUpHandler); };
    }, []);
};

var useLockScroll = function () {
    React.useEffect(function () {
        var originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return function () {
            document.body.style.overflow = originalStyle;
        };
    }, []);
};

var ModalBody = function (_a) {
    var children = _a.children, closeOnEscape = _a.closeOnEscape, onToggle = _a.onToggle;
    var contentRef = React.createRef();
    useLockScroll();
    useKeyUp(27, function () { return closeOnEscape && onToggle(); });
    return (React.createElement("div", { ref: contentRef, style: {
            background: '#FFF',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            margin: '160px auto 0 auto',
            maxWidth: '480px',
        } }, children));
};

var ModalOverlay = function (_a) {
    var children = _a.children, closeOnClickOutside = _a.closeOnClickOutside, onClose = _a.onClose;
    var onClick = function (e) {
        if (e.target === e.currentTarget && closeOnClickOutside) {
            onClose();
        }
    };
    return (React.createElement("div", { style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            bottom: 0,
            left: 0,
            position: 'fixed',
            right: 0,
            top: 0,
            zIndex: 9999,
        }, onClick: onClick }, children));
};

var ToggleStatus;
(function (ToggleStatus) {
    ToggleStatus["Close"] = "Close";
    ToggleStatus["Open"] = "Open";
    ToggleStatus["Toggle"] = "Toggle";
})(ToggleStatus || (ToggleStatus = {}));
var useToggle = function () {
    var _a = React.useState(false), opened = _a[0], setOpened = _a[1];
    var toggle = function (status) {
        switch (status) {
            case ToggleStatus.Close:
                setOpened(false);
                break;
            case ToggleStatus.Open:
                setOpened(true);
                break;
            case ToggleStatus.Toggle:
            default:
                setOpened(function (isOpened) { return !isOpened; });
                break;
        }
    };
    return { opened: opened, toggle: toggle };
};

var Portal = function (_a) {
    var content = _a.content, target = _a.target;
    var _b = useToggle(), opened = _b.opened, toggle = _b.toggle;
    return (React.createElement(React.Fragment, null,
        target(toggle, opened),
        opened && ReactDOM.createPortal(content(toggle), document.body)));
};

var Modal = function (_a) {
    var closeOnClickOutside = _a.closeOnClickOutside, closeOnEscape = _a.closeOnEscape, content = _a.content, target = _a.target;
    var renderContent = function (toggle) { return (React.createElement(ModalOverlay, { closeOnClickOutside: closeOnClickOutside, onClose: toggle },
        React.createElement(ModalBody, { closeOnEscape: closeOnEscape, onToggle: toggle }, content(toggle)))); };
    return (React.createElement(Portal, { target: target, content: renderContent }));
};

var Position;
(function (Position) {
    Position["TopLeft"] = "TOP_LEFT";
    Position["TopCenter"] = "TOP_CENTER";
    Position["TopRight"] = "TOP_RIGHT";
    Position["RightTop"] = "RIGHT_TOP";
    Position["RightCenter"] = "RIGHT_CENTER";
    Position["RightBottom"] = "RIGHT_BOTTOM";
    Position["BottomLeft"] = "BOTTOM_LEFT";
    Position["BottomCenter"] = "BOTTOM_CENTER";
    Position["BottomRight"] = "BOTTOM_RIGHT";
    Position["LeftTop"] = "LEFT_TOP";
    Position["LeftCenter"] = "LEFT_CENTER";
    Position["LeftBottom"] = "LEFT_BOTTOM";
})(Position || (Position = {}));
var Position$1 = Position;

var calculatePosition = function (content, target, position, offset) {
    var targetRect = target.getBoundingClientRect();
    var contentRect = content.getBoundingClientRect();
    var height = contentRect.height, width = contentRect.width;
    var top = 0;
    var left = 0;
    switch (position) {
        case Position$1.TopLeft:
            top = targetRect.top - height;
            left = targetRect.left;
            break;
        case Position$1.TopCenter:
            top = targetRect.top - height;
            left = targetRect.left + targetRect.width / 2 - width / 2;
            break;
        case Position$1.TopRight:
            top = targetRect.top - height;
            left = targetRect.left + targetRect.width - width;
            break;
        case Position$1.RightTop:
            top = targetRect.top;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.RightCenter:
            top = targetRect.top + targetRect.height / 2 - height / 2;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.RightBottom:
            top = targetRect.top + targetRect.height - height;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.BottomLeft:
            top = targetRect.top + targetRect.height;
            left = targetRect.left;
            break;
        case Position$1.BottomCenter:
            top = targetRect.top + targetRect.height;
            left = targetRect.left + targetRect.width / 2 - width / 2;
            break;
        case Position$1.BottomRight:
            top = targetRect.top + targetRect.height;
            left = targetRect.left + targetRect.width - width;
            break;
        case Position$1.LeftTop:
            top = targetRect.top;
            left = targetRect.left - width;
            break;
        case Position$1.LeftCenter:
            top = targetRect.top + targetRect.height / 2 - height / 2;
            left = targetRect.left - width;
            break;
        case Position$1.LeftBottom:
            top = targetRect.top + targetRect.height - height;
            left = targetRect.left - width;
            break;
    }
    return {
        left: left + document.body.scrollLeft + (offset.left || 0),
        top: top + document.body.scrollTop + (offset.top || 0),
    };
};

var usePosition = function (contentRef, targetRef, position, offset) {
    React.useEffect(function () {
        var targetEle = targetRef.current;
        var contentEle = contentRef.current;
        if (!contentEle || !targetEle) {
            return;
        }
        var _a = calculatePosition(contentEle, targetEle, position, offset), top = _a.top, left = _a.left;
        contentEle.style.top = top + "px";
        contentEle.style.left = left + "px";
    }, []);
};

var Arrow = function (_a) {
    var position = _a.position, styles = _a.styles;
    var updatedStyles = Object.assign({}, {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        height: '10px',
        position: 'absolute',
        width: '10px',
        zIndex: 0,
    }, styles);
    var posStyles = {};
    switch (position) {
        case Position$1.TopLeft:
            posStyles = {
                bottom: 0,
                left: 0,
                transform: 'translate(50%, 50%) rotate(45deg)',
            };
            break;
        case Position$1.TopCenter:
            posStyles = {
                bottom: 0,
                left: '50%',
                transform: 'translate(-50%, 50%) rotate(45deg)',
            };
            break;
        case Position$1.TopRight:
            posStyles = {
                bottom: 0,
                right: 0,
                transform: 'translate(-50%, 50%) rotate(45deg)',
            };
            break;
        case Position$1.RightTop:
            posStyles = {
                left: 0,
                top: 0,
                transform: 'translate(-50%, 50%) rotate(135deg)',
            };
            break;
        case Position$1.RightCenter:
            posStyles = {
                left: 0,
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(135deg)',
            };
            break;
        case Position$1.RightBottom:
            posStyles = {
                bottom: 0,
                left: 0,
                transform: 'translate(-50%, -50%) rotate(135deg)',
            };
            break;
        case Position$1.BottomLeft:
            posStyles = {
                left: 0,
                top: 0,
                transform: 'translate(50%, -50%) rotate(225deg)',
            };
            break;
        case Position$1.BottomCenter:
            posStyles = {
                left: '50%',
                top: 0,
                transform: 'translate(-50%, -50%) rotate(225deg)',
            };
            break;
        case Position$1.BottomRight:
            posStyles = {
                right: 0,
                top: 0,
                transform: 'translate(-50%, -50%) rotate(225deg)',
            };
            break;
        case Position$1.LeftTop:
            posStyles = {
                right: 0,
                top: 0,
                transform: 'translate(50%, 50%) rotate(315deg)',
            };
            break;
        case Position$1.LeftCenter:
            posStyles = {
                right: 0,
                top: '50%',
                transform: 'translate(50%, -50%) rotate(315deg)',
            };
            break;
        case Position$1.LeftBottom:
            posStyles = {
                bottom: 0,
                right: 0,
                transform: 'translate(50%, -50%) rotate(315deg)',
            };
            break;
    }
    return (React.createElement("div", { style: Object.assign({}, posStyles, updatedStyles) }));
};

var PopoverBody = function (_a) {
    var children = _a.children, closeOnEscape = _a.closeOnEscape, offset = _a.offset, position = _a.position, targetRef = _a.targetRef, onToggle = _a.onToggle;
    var contentRef = React.createRef();
    useKeyUp(27, function () { return closeOnEscape && onToggle(); });
    usePosition(contentRef, targetRef, position, offset);
    return (React.createElement("div", { ref: contentRef, style: {
            background: '#FFF',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            left: 0,
            position: 'absolute',
            top: '-9999px',
            zIndex: 9999,
        } },
        React.createElement(Arrow, { position: position, styles: { background: '#FFF' } }),
        children));
};

var PopoverOverlay = function (_a) {
    var children = _a.children, closeOnClickOutside = _a.closeOnClickOutside, onClose = _a.onClose;
    var onClick = function (e) {
        if (e.target === e.currentTarget && closeOnClickOutside) {
            onClose();
        }
    };
    React.useEffect(function () {
        var originalStyle = window.getComputedStyle(document.body).position;
        if (closeOnClickOutside) {
            document.body.style.position = 'relative';
        }
        return function () {
            document.body.style.setProperty('overflow', originalStyle);
        };
    }, [closeOnClickOutside]);
    return (closeOnClickOutside
        ? (React.createElement("div", { style: {
                bottom: '0',
                left: '0',
                position: 'absolute',
                right: '0',
                top: '0',
            }, onClick: onClick }, children))
        : React.createElement(React.Fragment, null, children));
};

var Popover = function (_a) {
    var closeOnClickOutside = _a.closeOnClickOutside, closeOnEscape = _a.closeOnEscape, content = _a.content, offset = _a.offset, position = _a.position, target = _a.target;
    var targetRef = React.createRef();
    var renderTarget = function (toggle, opened) { return (React.createElement("div", { ref: targetRef }, target(toggle, opened))); };
    var renderContent = function (toggle) { return (React.createElement(PopoverOverlay, { closeOnClickOutside: closeOnClickOutside, onClose: toggle },
        React.createElement(PopoverBody, { closeOnEscape: closeOnEscape, offset: offset, position: position, targetRef: targetRef, onToggle: toggle }, content(toggle)))); };
    return (React.createElement(Portal, { content: renderContent, target: renderTarget }));
};

var TooltipBody = function (_a) {
    var children = _a.children, offset = _a.offset, position = _a.position, targetRef = _a.targetRef;
    var contentRef = React.createRef();
    usePosition(contentRef, targetRef, position, offset);
    return (React.createElement("div", { ref: contentRef, style: {
            background: '#000',
            borderRadius: '4px',
            color: '#FFF',
            left: 0,
            maxWidth: '300px',
            position: 'absolute',
            textAlign: 'center',
            top: '-9999px',
            zIndex: 9999,
            
        } },
        React.createElement(Arrow, { position: position, styles: { background: '#000' } }),
        children));
};

var Tooltip = function (_a) {
    var content = _a.content, offset = _a.offset, position = _a.position, target = _a.target;
    var targetRef = React.createRef();
    var renderTarget = function (toggle) {
        var show = function () { toggle(ToggleStatus.Open); };
        var hide = function () { toggle(ToggleStatus.Close); };
        // onMouseEnter: show, 
        return (React.createElement("div", { ref: targetRef, onMouseLeave: hide }, target));
    };
    var renderContent = function () { return (React.createElement(TooltipBody, { offset: offset, position: position, targetRef: targetRef }, content())); };
    return (React.createElement(Portal, { target: renderTarget, content: renderContent }));
};

var Spinner = function () {
    return (React.createElement("svg", { className: "viewer-spinner", width: "64px", height: "64px", viewBox: "0 0 32 32" },
        React.createElement("circle", { cx: "16", cy: "16", fill: "none", r: "12", stroke: "rgba(0, 0, 0, 0.4)", strokeDasharray: Math.PI * 2 * 9, strokeLinecap: "round", strokeWidth: "4" })));
};

var LoadingStatus = (function () {
    function LoadingStatus() {
    }
    return LoadingStatus;
}());

var AskForPasswordState = (function (_super) {
    __extends(AskForPasswordState, _super);
    function AskForPasswordState(verifyPasswordFn) {
        var _this = _super.call(this) || this;
        _this.verifyPasswordFn = verifyPasswordFn;
        return _this;
    }
    return AskForPasswordState;
}(LoadingStatus));

var LocalizationContext = React.createContext({});

var AskingPassword = function (_a) {
    var verifyPasswordFn = _a.verifyPasswordFn;
    var l10n = React.useContext(LocalizationContext);
    var _b = React.useState(''), password = _b[0], setPassword = _b[1];
    var changePassword = function (e) {
        setPassword(e.target.value);
    };
    var submit = function () {
        verifyPasswordFn(password);
    };
    return (React.createElement("div", { style: {
            alignItems: 'center',
            border: '1px solid rgba(0, 0, 0, .3)',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
        } },
        React.createElement("div", null,
            React.createElement("div", { style: { margin: '8px 0' } },
                l10n.askingPassword.requirePasswordToOpen,
                ":"),
            React.createElement("input", { style: {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '8px',
                }, type: "password", onChange: changePassword }),
            React.createElement("div", { style: { margin: '8px 0' } },
                React.createElement("button", { style: {
                        backgroundColor: '#357EDD',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#FFF',
                        cursor: 'pointer',
                        padding: '8px 16px',
                    }, onClick: submit }, l10n.askingPassword.submit)))));
};

var CompletedState = (function (_super) {
    __extends(CompletedState, _super);
    function CompletedState(doc) {
        var _this = _super.call(this) || this;
        _this.doc = doc;
        return _this;
    }
    return CompletedState;
}(LoadingStatus));

var FailureState = (function (_super) {
    __extends(FailureState, _super);
    function FailureState(error) {
        var _this = _super.call(this) || this;
        _this.error = error;
        return _this;
    }
    return FailureState;
}(LoadingStatus));

var LoadingState = (function (_super) {
    __extends(LoadingState, _super);
    function LoadingState(percentages) {
        var _this = _super.call(this) || this;
        _this.percentages = percentages;
        return _this;
    }
    return LoadingState;
}(LoadingStatus));

var WrongPassword = function (_a) {
    var verifyPasswordFn = _a.verifyPasswordFn;
    var l10n = React.useContext(LocalizationContext);
    var _b = React.useState(''), password = _b[0], setPassword = _b[1];
    var changePassword = function (e) {
        setPassword(e.target.value);
    };
    var submit = function () {
        verifyPasswordFn(password);
    };
    return (React.createElement("div", { style: {
            alignItems: 'center',
            border: '1px solid rgba(0, 0, 0, .3)',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
        } },
        React.createElement("div", null,
            React.createElement("div", { style: { margin: '8px 0' } },
                l10n.wrongPassword.tryAgain,
                ":"),
            React.createElement("input", { style: {
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    padding: '8px',
                }, type: "password", onChange: changePassword }),
            React.createElement("div", { style: { margin: '8px 0' } },
                React.createElement("button", { style: {
                        backgroundColor: '#357EDD',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#FFF',
                        cursor: 'pointer',
                        padding: '8px 16px',
                    }, onClick: submit }, l10n.wrongPassword.submit)))));
};

var WrongPasswordState = (function (_super) {
    __extends(WrongPasswordState, _super);
    function WrongPasswordState(verifyPasswordFn) {
        var _this = _super.call(this) || this;
        _this.verifyPasswordFn = verifyPasswordFn;
        return _this;
    }
    return WrongPasswordState;
}(LoadingStatus));

var DocumentLoader = function (_a) {
    var file = _a.file, render = _a.render;
    var _b = React.useState(new LoadingState(0)), status = _b[0], setStatus = _b[1];
    React.useEffect(function () {
        setStatus(new LoadingState(0));
        var loadingTask = PdfJs.getDocument(file);
        loadingTask.onPassword = function (verifyPassword, reason) {
            switch (reason) {
                case PdfJs.PasswordResponses.NEED_PASSWORD:
                    setStatus(new AskForPasswordState(verifyPassword));
                    break;
                case PdfJs.PasswordResponses.INCORRECT_PASSWORD:
                    setStatus(new WrongPasswordState(verifyPassword));
                    break;
            }
        };
        loadingTask.promise.then(function (doc) { return setStatus(new CompletedState(doc)); }, function (err) { return setStatus(new FailureState(err.message || 'Cannot load document')); });
        return function () {
            loadingTask.destroy();
        };
    }, [file]);
    switch (true) {
        case (status instanceof AskForPasswordState):
            return React.createElement(AskingPassword, { verifyPasswordFn: status.verifyPasswordFn });
        case (status instanceof WrongPasswordState):
            return React.createElement(WrongPassword, { verifyPasswordFn: status.verifyPasswordFn });
        case (status instanceof CompletedState):
            return render(status.doc);
        case (status instanceof FailureState):
            return (React.createElement("div", { style: {
                    textAlign: 'center',
                } }, status.error));
        case (status instanceof LoadingState):
        default:
            return (React.createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '16px 0',
                    width: '100%',
                } },
                React.createElement(Spinner, null)));
    }
};

var askingPassword = {
	requirePasswordToOpen: "This document requires a password to open",
	submit: "Submit"
};
var attachment = {
	clickToDownload: "Click to download",
	noAttachment: "There is no attachment"
};
var bookmark = {
	noBookmark: "There is no bookmark"
};
var main = {
	dragDropFile: "Drag and drop a PDF document here"
};
var moreActions = {
	documentProperties: "Document Properties",
	goToFirstPage: "Go to First Page",
	goToLastPage: "Go to Last Page",
	handTool: "Hand Tool",
	horizontalScrolling: "Horizontal Scrolling",
	rotateBackward: "Rotate Counterclockwise",
	rotateForward: "Rotate Clockwise",
	textSelectionTool: "Text Selection Tool",
	verticalScrolling: "Vertical Scrolling",
	wrappedScrolling: "Wrapped Scrolling"
};
var property = {
	author: "Author",
	close: "Close",
	creationDate: "Creation date",
	creator: "Creator",
	fileName: "File name",
	fileSize: "File size",
	keywords: "Keywords",
	modificationDate: "Modification date",
	pageCount: "Page count",
	pdfProducer: "PDF producer",
	pdfVersion: "PDF Version",
	subject: "Subject",
	title: "Title"
};
var search = {
	close: "Close",
	enterToSearch: "Enter to search",
	matchCase: "Match case",
	nextMatch: "Next match",
	previousMatch: "Previous match",
	wholeWords: "Whole words"
};
var sidebar = {
	attachment: "Attachment",
	bookmark: "Bookmark",
	thumbnail: "Thumbnail"
};
var toolbar = {
	download: "Download",
	fullScreen: "Full screen",
	moreActions: "More actions",
	nextPage: "Next page",
	openFile: "Open file",
	previousPage: "Previous page",
	search: "Search",
	toggleSidebar: "Toggle sidebar",
	zoomIn: "Zoom in",
	zoomOut: "Zoom out"
};
var wrongPassword = {
	submit: "Submit",
	tryAgain: "The password is wrong. Please try again"
};
var zoom = {
	actualSize: "Actual size",
	pageFit: "Page fit",
	pageWidth: "Page width"
};
var en_US = {
	askingPassword: askingPassword,
	attachment: attachment,
	bookmark: bookmark,
	main: main,
	moreActions: moreActions,
	property: property,
	search: search,
	sidebar: sidebar,
	toolbar: toolbar,
	wrongPassword: wrongPassword,
	zoom: zoom
};

var LocalizationProvider = function (_a) {
    var children = _a.children, localization = _a.localization;
    var defaultL10n = en_US;
    var l10n = localization || defaultL10n;
    return (React.createElement(LocalizationContext.Provider, { value: l10n }, children));
};

var LEVELS = [
    0.5, 0.75, 1, 1.25, 1.5, 2,
     2.5
];
var SpecialLevel;
(function (SpecialLevel) {
    SpecialLevel["ActualSize"] = "ActualSize";
    SpecialLevel["PageFit"] = "PageFit";
    SpecialLevel["PageWidth"] = "PageWidth";
})(SpecialLevel || (SpecialLevel = {}));
var increase = function (currentLevel) {
    var found = LEVELS.find(function (item) { return item > currentLevel; });
    return found || currentLevel;
};
var decrease = function (currentLevel) {
    var found = LEVELS.findIndex(function (item) { return item >= currentLevel; });
    return found === -1 || found === 0 ? currentLevel : LEVELS[found - 1];
};

const GimmeRef = () => {
    return React.useRef(null);
}
var PageSizeCalculator = function (_a) {
    var doc = _a.doc, render = _a.render;
    var pagesRef = GimmeRef();
    var _b = React.useState({
        pageHeight: 0,
        pageWidth: 0,
        scale: 1,
    }), pageSize = _b[0], setPageSize = _b[1];
    React.useEffect(function () {
        doc.getPage(1).then(function (pdfPage) {
            var viewport = pdfPage.getViewport({ scale: 1 });
            var w = viewport.width;
            var h = viewport.height;
            var pagesEle = pagesRef.current;
            if (!pagesEle) {
                return;
            }
            var scaled = pagesEle.offsetWidth / w;
            var scale = decrease(Math.max(1, scaled));
            setPageSize({
                pageHeight: h,
                pageWidth: w,
                scale: scale,
            });
        });
    }, [doc]);
    var pageWidth = pageSize.pageWidth;
    return (React.createElement("div", { ref: pagesRef }, pageWidth === 0
        ? (React.createElement("div", { style: {
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
                width: '100%',
            } },
            React.createElement(Spinner, null)))
        : render(pageSize)));
};

var fileName = function (url) {
    var str = url.split('/').pop();
    return !!str ? str.split('#')[0].split('?')[0] : url;
};

var downloadFile = function (url, data) {
    var blobUrl = (typeof data === 'string')
        ? ''
        : URL.createObjectURL(new Blob([data], { type: '' }));
    var link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl || url;
    link.setAttribute('download', fileName(url));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
    }
};

var GRAB_CLASS = 'viewer-grab';
var GRABBING_CLASS = 'viewer-grabbing';
var useDragScroll = function (ref) {
    var _a = React.useState(false), enabled = _a[0], setEnabled = _a[1];
    var pos = React.useRef({ top: 0, left: 0, x: 0, y: 0 });
    var onMouseDownHandler = function (e) {
        var ele = ref.current;
        if (!enabled || !ele) {
            return;
        }
        ele.classList.remove(GRAB_CLASS);
        ele.classList.add(GRABBING_CLASS);
        e.preventDefault();
        e.stopPropagation();
        pos.current = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };
        document.addEventListener('mousemove', onMouseMoveHandler);
        document.addEventListener('mouseup', onMouseUpHandler);
    };
    var onMouseMoveHandler = function (e) {
        var ele = ref.current;
        if (!ele) {
            return;
        }
        ele.scrollTop = pos.current.top - (e.clientY - pos.current.y);
        ele.scrollLeft = pos.current.left - (e.clientX - pos.current.x);
    };
    var onMouseUpHandler = function () {
        var ele = ref.current;
        if (!ele) {
            return;
        }
        ele.classList.add(GRAB_CLASS);
        ele.classList.remove(GRABBING_CLASS);
        document.removeEventListener('mousemove', onMouseMoveHandler);
        document.removeEventListener('mouseup', onMouseUpHandler);
    };
    React.useEffect(function () {
        var ele = ref.current;
        if (!ele) {
            return;
        }
        enabled
            ? ele.classList.add(GRAB_CLASS)
            : ele.classList.remove(GRAB_CLASS);
        ele.addEventListener('mousedown', onMouseDownHandler);
        return function () {
            ele.removeEventListener('mousedown', onMouseDownHandler);
        };
    }, [enabled]);
    return {
        toggleDragScroll: setEnabled,
    };
};

var useDrop = function (ref, onDrop) {
    var dragCount = React.useRef(0);
    var _a = React.useState(false), isDragging = _a[0], setDragging = _a[1];
    var onDropHandler = function (e) {
        e.preventDefault();
        setDragging(false);
        dragCount.current = 0;
        if (e.dataTransfer) {
            onDrop(e.dataTransfer.files);
        }
    };
    var onDragOverHandler = function (e) {
        e.preventDefault();
    };
    var onDragEnterHandler = function (e) {
        e.preventDefault();
        dragCount.current += 1;
        if (dragCount.current <= 1) {
            setDragging(true);
        }
    };
    var onDragLeaveHandler = function (e) {
        e.preventDefault();
        dragCount.current -= 1;
        if (dragCount.current <= 0) {
            setDragging(false);
        }
    };
    React.useEffect(function () {
        var ele = ref.current;
        if (!ele) {
            return;
        }
        ele.addEventListener('drop', onDropHandler);
        ele.addEventListener('dragover', onDragOverHandler);
        ele.addEventListener('dragenter', onDragEnterHandler);
        ele.addEventListener('dragleave', onDragLeaveHandler);
        return function () {
            ele.removeEventListener('drop', onDropHandler);
            ele.removeEventListener('dragover', onDragOverHandler);
            ele.removeEventListener('dragenter', onDragEnterHandler);
            ele.removeEventListener('dragleave', onDragLeaveHandler);
        };
    }, [ref.current]);
    return { isDragging: isDragging };
};

var Api;
(function (Api) {
    Api[Api["ExitFullScreen"] = 0] = "ExitFullScreen";
    Api[Api["FullScreenChange"] = 1] = "FullScreenChange";
    Api[Api["FullScreenElement"] = 2] = "FullScreenElement";
    Api[Api["FullScreenEnabled"] = 3] = "FullScreenEnabled";
    Api[Api["RequestFullScreen"] = 4] = "RequestFullScreen";
})(Api || (Api = {}));
var defaultVendor = {
    ExitFullScreen: 'exitFullscreen',
    FullScreenChange: 'fullscreenchange',
    FullScreenElement: 'fullscreenElement',
    FullScreenEnabled: 'fullscreenEnabled',
    RequestFullScreen: 'requestFullscreen',
};
var webkitVendor = {
    ExitFullScreen: 'webkitExitFullscreen',
    FullScreenChange: 'webkitfullscreenchange',
    FullScreenElement: 'webkitFullscreenElement',
    FullScreenEnabled: 'webkitFullscreenEnabled',
    RequestFullScreen: 'webkitRequestFullscreen',
};
var msVendor = {
    ExitFullScreen: 'msExitFullscreen',
    FullScreenChange: 'MSFullscreenChange',
    FullScreenElement: 'msFullscreenElement',
    FullScreenEnabled: 'msFullscreenEnabled',
    RequestFullScreen: 'msRequestFullscreen',
};
var isBrowser = (typeof window !== 'undefined');
var vendor = isBrowser ? ((Api.FullScreenEnabled in document && defaultVendor) ||
    (webkitVendor.FullScreenEnabled in document && webkitVendor) ||
    (msVendor.FullScreenEnabled in document && msVendor) ||
    defaultVendor) : defaultVendor;
var addFullScreenChangeListener = function (handler) {
    if (isBrowser) {
        document.addEventListener(vendor.FullScreenChange, handler);
    }
};
var removeFullScreenChangeListener = function (handler) {
    if (isBrowser) {
        document.removeEventListener(vendor.FullScreenChange, handler);
    }
};
var exitFullScreen = function (element) {
    return isBrowser
        ? element[vendor.ExitFullScreen]()
        : Promise.resolve({});
};
var getFullScreenElement = function () {
    return isBrowser ? document[vendor.FullScreenElement] : null;
};
var requestFullScreen = function (element) {
    if (isBrowser) {
        element[vendor.RequestFullScreen]();
    }
};

var useFullScreen = function (ref) {
    var _a = React.useState(false), isFullScreen = _a[0], setIsFullScreen = _a[1];
    React.useEffect(function () {
        addFullScreenChangeListener(onFullScreenChange);
        return function () {
            removeFullScreenChangeListener(onFullScreenChange);
        };
    }, [ref.current]);
    var closeOtherFullScreen = function () {
        var ele = getFullScreenElement();
        return (ele && ele !== ref.current)
            ? exitFullScreen(ele)
            : Promise.resolve();
    };
    var openFullScreen = function () {
        closeOtherFullScreen().then(function (_) {
            if (ref.current) {
                requestFullScreen(ref.current);
            }
        });
    };
    var closeFullScreen = function () {
        var ele = getFullScreenElement();
        if (isFullScreen && ele && ele === ref.current) {
            exitFullScreen(document);
        }
    };
    var onFullScreenChange = function () {
        var ele = getFullScreenElement();
        setIsFullScreen(ele === ref.current);
    };
    return {
        closeFullScreen: closeFullScreen,
        isFullScreen: isFullScreen,
        openFullScreen: openFullScreen,
    };
};

var ExitFullScreenIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M10.515,9.514h3c0.552,0,1,0.448,1,1v3c0,0.552-0.448,1-1,1h-3c-0.552,0-1-0.448-1-1v-3\n                C9.515,9.962,9.963,9.514,10.515,9.514z\n                M0.531,23.499l6.984-6.985\n                M16.515,7.514L23.5,0.529\n                M21.515,7.514h-5v-5\n                M7.515,21.514v-5 h-5\n                M0.523,0.521l6.992,6.993\n                M16.515,16.514l6.985,6.985\n                M16.515,21.514v-5h5\n                M2.515,7.514h5v-5" })));
};


var Observer = function (_a) {
    var children = _a.children, threshold = _a.threshold, onVisibilityChanged = _a.onVisibilityChanged;
    var containerRef = GimmeRef();
    React.useEffect(function () {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var isVisible = entry.isIntersecting;
                var ratio = entry.intersectionRatio;
                onVisibilityChanged({ isVisible: isVisible, ratio: ratio });
            });
        }, {
            threshold: threshold || 0,
        });
        var container = containerRef.current;
        if (!container) {
            return;
        }
        io.observe(container);
        return function () {
            io.unobserve(container);
        };
    }, []);
    return (React.createElement("div", { ref: containerRef }, children));
};

var parse = function (pageIndex, destArray) {
    var bottomOffset;
    var scale;
    switch (destArray[1].name) {
        case 'XYZ':
            bottomOffset = destArray[3];
            scale = destArray[4];
            return {
                bottomOffset: bottomOffset,
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
var getDestination = function (doc, dest) {
    return new Promise(function (res, _) {
        new Promise(function (resolve, __) {
            if (typeof dest === 'string') {
                doc.getDestination(dest).then(function (destArray) {
                    resolve(destArray);
                });
            }
            else {
                resolve(dest);
            }
        }).then(function (destArray) {
            doc.getPageIndex(destArray[0]).then(function (pageIndex) {
                var target = parse(pageIndex, destArray);
                res(target);
            });
        });
    });
};

var WithScale = function (_a) {
    var callback = _a.callback, children = _a.children, rotation = _a.rotation, scale = _a.scale;
    React.useEffect(function () {
        callback();
    }, [rotation, scale]);
    return (React.createElement(React.Fragment, null, children));
};

var AnnotationLayer = function (_a) {
    var doc = _a.doc, page = _a.page, rotation = _a.rotation, scale = _a.scale, onJumpToDest = _a.onJumpToDest;
    var containerRef = React.createRef();
    var renderAnnotation = function () {
        var container = containerRef.current;
        if (container) {
            container.innerHTML = '';
        }
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        page.getAnnotations({ intent: 'display' }).then(function (annotations) {
            if (annotations.length === 0) {
                return;
            }
            var linkService = {
                getDestinationHash: function (dest) {
                    return (typeof dest === 'string')
                        ? "#" + escape(dest)
                        : "#" + escape(JSON.stringify(dest));
                },
                navigateTo: function (dest) {
                    getDestination(doc, dest).then(function (target) {
                        var pageIndex = target.pageIndex, bottomOffset = target.bottomOffset, scaleTo = target.scaleTo;
                        onJumpToDest(pageIndex + 1, bottomOffset, scaleTo);
                    });
                },
            };
            var clonedViewPort = viewport.clone({ dontFlip: true });
            PdfJs.AnnotationLayer.render({
                annotations: annotations,
                div: container,
                linkService: linkService,
                page: page,
                viewport: clonedViewPort,
            });
        });
    };
    return (React.createElement(WithScale, { callback: renderAnnotation, rotation: rotation, scale: scale },
        React.createElement("div", { className: "viewer-annotation", ref: containerRef })));
};

var CanvasLayer = function (_a) {
    var height = _a.height, page = _a.page, rotation = _a.rotation, scale = _a.scale, width = _a.width;
    var canvasRef = React.createRef();
    var renderTask = React.useRef();
    var renderCanvas = function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var canvasEle = canvasRef.current;
        var canvasContext = canvasEle.getContext('2d');
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        renderTask.current = page.render({ canvasContext: canvasContext, viewport: viewport });
        renderTask.current.promise.then(function (_) { }, function (_) { });
    };
    return (React.createElement(WithScale, { callback: renderCanvas, rotation: rotation, scale: scale },
        React.createElement("canvas", { height: height, ref: canvasRef, style: {
                left: '0',
                position: 'absolute',
                top: '0',
            }, width: width })));
};

var calculateOffset = function (children, parent) {
    var top = children.offsetTop;
    var left = children.offsetLeft;
    var p = children.parentElement;
    while (p && p !== parent) {
        top += p.offsetTop;
        left += p.offsetLeft;
        p = p.parentElement;
    }
    return {
        left: left,
        top: top,
    };
};

var removeNode = function (ele) {
    var parent = ele.parentNode;
    if (parent) {
        parent.removeChild(ele);
    }
};
var replaceNode = function (replacementNode, node) {
    removeNode(replacementNode);
    var parent = node.parentNode;
    if (parent) {
        parent.insertBefore(replacementNode, node);
    }
    removeNode(node);
};
var unwrap = function (ele) {
    var parent = ele.parentNode;
    if (!parent) {
        return;
    }
    var range = document.createRange();
    range.selectNodeContents(ele);
    replaceNode(range.extractContents(), ele);
    parent.normalize();
};

var wrap = function (ele, startOffset, endOffset) {
    var range = new Range();
    range.setStart(ele, startOffset);
    range.setEnd(ele, endOffset);
    var wrapper = document.createElement('span');
    range.surroundContents(wrapper);
    return wrapper;
};

var TextLayer = function (_a) {
    var keywordRegexp = _a.keywordRegexp, match = _a.match, page = _a.page, pageIndex = _a.pageIndex, rotation = _a.rotation, scale = _a.scale, onJumpToMatch = _a.onJumpToMatch;
    var containerRef = React.createRef();
    var renderTask = React.useRef();
    var isRendered = React.useRef(false);
    var empty = function () {
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        var spans = containerEle.querySelectorAll('span.viewer-text');
        var numSpans = spans.length;
        for (var i = 0; i < numSpans; i++) {
            var span = spans[i];
            containerEle.removeChild(span);
        }
    };
    var renderText = function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        isRendered.current = false;
        page.getTextContent().then(function (textContent) {
            empty();
            renderTask.current = PdfJs.renderTextLayer({
                container: containerEle,
                textContent: textContent,
                viewport: viewport,
            });
            renderTask.current.promise.then(function (_) {
                isRendered.current = true;
                var spans = containerEle.childNodes;
                var numSpans = spans.length;
                if (keywordRegexp) {
                    unhighlightAll();
                }
                for (var i = 0; i < numSpans; i++) {
                    var span = spans[i];
                    span.classList.add('viewer-text');
                    if (keywordRegexp) {
                        highlight(span);
                    }
                }
                scrollToMatch();
            }, function (_) { });
        });
    };
    var highlight = function (span) {
        var text = span.textContent;
        if (!keywordRegexp.source.trim() || !text) {
            return;
        }
        var startOffset = text.search(keywordRegexp);
        var firstChild = span.firstChild;
        if (startOffset === -1 || !firstChild) {
            return;
        }
        var endOffset = startOffset + keywordRegexp.source.length;
        var wrapper = wrap(firstChild, startOffset, endOffset);
        wrapper.classList.add('viewer-highlight');
    };
    var unhighlightAll = function () {
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        var highlightNodes = containerEle.querySelectorAll('span.viewer-highlight');
        var total = highlightNodes.length;
        for (var i = 0; i < total; i++) {
            unwrap(highlightNodes[i]);
        }
    };
    var scrollToMatch = function () {
        var containerEle = containerRef.current;
        if (match.pageIndex !== pageIndex || !containerEle) {
            return;
        }
        var spans = containerEle.querySelectorAll('span.viewer-highlight');
        if (match.matchIndex < spans.length) {
            var span = spans[match.matchIndex];
            var _a = calculateOffset(span, containerEle), top_1 = _a.top, left = _a.left;
            onJumpToMatch(pageIndex, top_1 / scale, left / scale);
        }
    };
    React.useEffect(function () {
        var containerEle = containerRef.current;
        if (!keywordRegexp || !isRendered.current || !containerEle) {
            return;
        }
        unhighlightAll();
        if (keywordRegexp.source.trim()) {
            var spans = containerEle.querySelectorAll('span.viewer-text');
            var numSpans = spans.length;
            for (var i = 0; i < numSpans; i++) {
                highlight(spans[i]);
            }
        }
    }, [keywordRegexp, isRendered.current]);
    React.useEffect(function () {
        if (isRendered.current) {
            scrollToMatch();
        }
    }, [match]);
    return (React.createElement(WithScale, { callback: renderText, rotation: rotation, scale: scale },
        React.createElement("div", { ref: containerRef, style: {
                height: '100%',
                left: 0,
                lineHeight: '1',
                position: 'absolute',
                top: 0,
                width: '100%',
            } })));
};

var PageLayer = function (_a) {
    var doc = _a.doc, height = _a.height, keywordRegexp = _a.keywordRegexp, match = _a.match, pageIndex = _a.pageIndex, rotation = _a.rotation, scale = _a.scale, width = _a.width, onJumpToDest = _a.onJumpToDest, onPageVisibilityChanged = _a.onPageVisibilityChanged;
    var _b = React.useState({
        isCalculated: false,
        page: null,
        pageHeight: height,
        pageWidth: width,
    }), pageSize = _b[0], setPageSize = _b[1];
    var isCalculated = pageSize.isCalculated, page = pageSize.page, pageHeight = pageSize.pageHeight, pageWidth = pageSize.pageWidth;
    var intersectionThreshold = Array(10).fill(null).map(function (_, i) { return i / 10; });
    var scaledWidth = pageWidth * scale;
    var scaledHeight = pageHeight * scale;
    var isVertical = Math.abs(rotation) % 180 === 0;
    var w = isVertical ? scaledWidth : scaledHeight;
    var h = isVertical ? scaledHeight : scaledWidth;
    var visibilityChanged = function (params) {
        var ratio = params.isVisible ? params.ratio : 0;
        onPageVisibilityChanged(pageIndex, ratio);
        if (params.isVisible && !isCalculated) {
            doc.getPage(pageIndex + 1).then(function (pdfPage) {
                var viewport = pdfPage.getViewport({ scale: 1 });
                setPageSize({
                    isCalculated: true,
                    page: pdfPage,
                    pageHeight: viewport.height,
                    pageWidth: viewport.width,
                });
            });
        }
    };
    var jumpToMatch = function (indexOfPage, top, left) {
        onJumpToDest(indexOfPage, pageHeight - top, scale);
    };
    return (React.createElement(Observer, { onVisibilityChanged: visibilityChanged, threshold: intersectionThreshold },
        React.createElement("div", { className: "viewer-page", style: {
                alignItems: 'center',
                display: 'flex',
                height: h + "px",
                justifyContent: 'center',
                margin: '0 auto',
                position: 'relative',
                width: w + "px",
            } }, !page
            ? React.createElement(Spinner, null)
            : (React.createElement(React.Fragment, null,
                React.createElement(CanvasLayer, { height: h, page: page, rotation: rotation, scale: scale, width: w }),
                React.createElement(TextLayer, { keywordRegexp: keywordRegexp, match: match, page: page, pageIndex: pageIndex, rotation: rotation, scale: scale, onJumpToMatch: jumpToMatch }),
                React.createElement(AnnotationLayer, { doc: doc, page: page, rotation: rotation, scale: scale, onJumpToDest: onJumpToDest }))))));
};

var DownArrowIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M2.32,2.966h19.452c0.552,0.001,1,0.449,0.999,1.001c0,0.182-0.05,0.36-0.144,0.516L12.9,20.552\n                c-0.286,0.472-0.901,0.624-1.373,0.338c-0.138-0.084-0.254-0.2-0.338-0.338L1.465,4.483C1.179,4.01,1.331,3.396,1.804,3.11\n                C1.96,3.016,2.138,2.966,2.32,2.966z" })));
};

var HandToolIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M11.5,5.5v-2C11.5,2.672,12.172,2,13,2s1.5,0.672,1.5,1.5v2 M14.5,11.5v-6C14.5,4.672,15.172,4,16,4\n                c0.828,0,1.5,0.672,1.5,1.5v3 M17.5,13V8.5C17.5,7.672,18.172,7,19,7s1.5,0.672,1.5,1.5v10c0,2.761-2.239,5-5,5h-3.335\n                c-1.712-0.001-3.305-0.876-4.223-2.321C6.22,18.467,4.083,14,4.083,14c-0.378-0.545-0.242-1.292,0.303-1.67\n                c0.446-0.309,1.044-0.281,1.458,0.07L8.5,15.5v-10C8.5,4.672,9.172,4,10,4s1.5,0.672,1.5,1.5v6" })));
};

var HorizontalScrollingIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M6.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z\n                M14.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z\n                M22.5,21.5 c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z" })));
};

var InfoIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M12,1.001c6.075,0,11,4.925,11,11s-4.925,11-11,11s-11-4.925-11-11S5.925,1.001,12,1.001z\n                M14.5,17.005H13\n                c-0.552,0-1-0.448-1-1v-6.5c0-0.276-0.224-0.5-0.5-0.5H10\n                M11.745,6.504L11.745,6.504\n                M11.745,6.5c-0.138,0-0.25,0.112-0.25,0.25\n                S11.607,7,11.745,7s0.25-0.112,0.25-0.25S11.883,6.5,11.745,6.5" })));
};

var MoreIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M12,0.5c1.381,0,2.5,1.119,2.5,2.5S13.381,5.5,12,5.5S9.5,4.381,9.5,3S10.619,0.5,12,0.5z\n                M12,9.5\n                c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5S9.5,13.381,9.5,12S10.619,9.5,12,9.5z\n                M12,18.5c1.381,0,2.5,1.119,2.5,2.5\n                s-1.119,2.5-2.5,2.5S9.5,22.381,9.5,21S10.619,18.5,12,18.5z" })));
};

var RotateBackwardIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M3.434,10.537c0.141-0.438,0.316-0.864,0.523-1.274\n                M3.069,14.425C3.023,14.053,3,13.679,3,13.305 c0-0.291,0.014-0.579,0.041-0.863\n                M4.389,18.111c-0.341-0.539-0.623-1.112-0.843-1.711\n                M7.163,20.9 c-0.543-0.345-1.048-0.747-1.506-1.2\n                M10.98,22.248c-0.65-0.074-1.29-0.218-1.909-0.431\n                M10,4.25h2 c4.987,0.015,9.017,4.069,9.003,9.055c-0.013,4.581-3.456,8.426-8.008,8.945\n                M13.5,1.75L10,4.25l3.5,2.5" })));
};

var RotateForwardIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M20.566,10.537c-0.141-0.438-0.316-0.864-0.523-1.274\n                M20.931,14.425C20.977,14.053,21,13.679,21,13.305 c0-0.291-0.014-0.579-0.041-0.863\n                M19.611,18.111c0.341-0.539,0.624-1.114,0.843-1.713\n                M16.837,20.9 c0.543-0.345,1.048-0.747,1.506-1.2\n                M13.02,22.248c0.65-0.074,1.29-0.218,1.909-0.431\n                M14,4.25h-2 c-4.987,0.015-9.017,4.069-9.003,9.055c0.013,4.581,3.456,8.426,8.008,8.945\n                M10.5,1.75l3.5,2.5l-3.5,2.5" })));
};

var TextSelectionIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M13.675,11.671l2.941-2.941c0.195-0.196,0.195-0.512-0.001-0.707C16.563,7.971,16.5,7.931,16.43,7.906\n                L4.168,3.527C3.908,3.434,3.622,3.57,3.529,3.83c-0.039,0.109-0.039,0.228,0,0.336l4.379,12.262\n                c0.093,0.26,0.379,0.396,0.639,0.303c0.07-0.025,0.133-0.065,0.185-0.117l2.943-2.943l6.146,6.146c0.195,0.195,0.512,0.195,0.707,0\n                l1.293-1.293c0.195-0.195,0.195-0.512,0-0.707L13.675,11.671z" })));
};

var UpArrowIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M21.783,21.034H2.332c-0.552,0-1-0.448-1-1c0-0.182,0.05-0.361,0.144-0.517L11.2,3.448\n                c0.286-0.472,0.901-0.624,1.373-0.338c0.138,0.084,0.254,0.2,0.338,0.338l9.726,16.069c0.286,0.473,0.134,1.087-0.339,1.373\n                C22.143,20.984,21.965,21.034,21.783,21.034z" })));
};

var VerticalScrollingIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M23.5,5.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V5.5z\n                M23.5,13.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V13.5z\n                M23.5,21.5 c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V21.5z" })));
};

var WrappedScrollingIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M10.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z\n                M23.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z\n                M10.5,22.5 c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z\n                M23.5,22.5c0,0.552-0.448,1-1,1 h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z" })));
};

var dateRegex = new RegExp('^D:' +
    '(\\d{4})' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '([Z|+|-])?' +
    '(\\d{2})?' +
    '\'?' +
    '(\\d{2})?' +
    '\'?');
var parse$1 = function (value, min, max, defaultValue) {
    var parsed = parseInt(value, 10);
    return (parsed >= min && parsed <= max) ? parsed : defaultValue;
};
var convertDate = function (input) {
    var matches = dateRegex.exec(input);
    if (!matches) {
        return null;
    }
    var year = parseInt(matches[1], 10);
    var month = parse$1(matches[2], 1, 12, 1) - 1;
    var day = parse$1(matches[3], 1, 31, 1);
    var hour = parse$1(matches[4], 0, 23, 0);
    var minute = parse$1(matches[5], 0, 59, 0);
    var second = parse$1(matches[6], 0, 59, 0);
    var universalTimeRelation = matches[7] || 'Z';
    var offsetHour = parse$1(matches[8], 0, 23, 0);
    var offsetMinute = parse$1(matches[9], 0, 59, 0);
    switch (universalTimeRelation) {
        case '-':
            hour += offsetHour;
            minute += offsetMinute;
            break;
        case '+':
            hour -= offsetHour;
            minute -= offsetMinute;
            break;
    }
    return new Date(Date.UTC(year, month, day, hour, minute, second));
};

var fileSize = function (bytes) {
    var sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sufixes[i];
};

var PropertiesLoader = function (_a) {
    var doc = _a.doc, render = _a.render;
    var _b = React.useState(), data = _b[0], setData = _b[1];
    React.useEffect(function () {
        doc.getMetadata().then(function (meta) {
            return Promise.resolve(meta);
        }).then(function (meta) {
            return doc.getDownloadInfo().then(function (d) {
                return Promise.resolve({
                    fileName: meta.contentDispositionFilename || '',
                    info: meta.info,
                    length: d.length,
                });
            });
        }).then(function (response) {
            setData(response);
        });
    }, []);
    return (data ? render(data) : React.createElement("div", { style: { textAlign: 'center' } },
        React.createElement(Spinner, null)));
};

var PropertyItem = function (_a) {
    var label = _a.label, value = _a.value;
    return (React.createElement("dl", { style: { margin: '8px 0' } },
        React.createElement("dt", { style: {
                display: 'inline-block',
                paddingRight: '8px',
                width: '30%',
            } },
            label,
            ":"),
        React.createElement("dd", { style: { display: 'inline-block' } }, value || '-')));
};

var PropertiesModal = function (_a) {
    var doc = _a.doc, fileName$1 = _a.fileName, onToggle = _a.onToggle;
    var l10n = React.useContext(LocalizationContext);
    var formatDate = function (input) {
        var date = convertDate(input);
        return date ? date.toLocaleDateString() + ", " + date.toLocaleTimeString() : '';
    };
    var renderData = function (data) { return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { padding: '0 8px ' } },
            React.createElement(PropertyItem, { label: "" + l10n.property.fileName, value: data.fileName || fileName(fileName$1) }),
            React.createElement(PropertyItem, { label: "" + l10n.property.fileSize, value: fileSize(data.length) })),
        React.createElement("div", { style: { borderBottom: '1px solid rgba(0, 0, 0, .3)' } }),
        React.createElement("div", { style: { padding: '0 8px ' } },
            React.createElement(PropertyItem, { label: "" + l10n.property.title, value: data.info.Title }),
            React.createElement(PropertyItem, { label: "" + l10n.property.author, value: data.info.Author }),
            React.createElement(PropertyItem, { label: "" + l10n.property.subject, value: data.info.Subject }),
            React.createElement(PropertyItem, { label: "" + l10n.property.keywords, value: data.info.Keywords }),
            React.createElement(PropertyItem, { label: "" + l10n.property.creator, value: data.info.Creator }),
            React.createElement(PropertyItem, { label: "" + l10n.property.creationDate, value: formatDate(data.info.CreationDate) }),
            React.createElement(PropertyItem, { label: "" + l10n.property.modificationDate, value: formatDate(data.info.ModDate) })),
        React.createElement("div", { style: { borderBottom: '1px solid rgba(0, 0, 0, .3)' } }),
        React.createElement("div", { style: { padding: '0 8px ' } },
            React.createElement(PropertyItem, { label: "" + l10n.property.pdfProducer, value: data.info.Producer }),
            React.createElement(PropertyItem, { label: "" + l10n.property.pdfVersion, value: data.info.PDFFormatVersion }),
            React.createElement(PropertyItem, { label: "" + l10n.property.pageCount, value: "" + doc.numPages })))); };
    return (React.createElement("div", { style: { padding: '8px 0' } },
        React.createElement(PropertiesLoader, { doc: doc, render: renderData }),
        React.createElement("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: '8px',
            } },
            React.createElement("button", { style: {
                    backgroundColor: '#357EDD',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#FFF',
                    cursor: 'pointer',
                    padding: '8px',
                }, onClick: onToggle }, l10n.property.close))));
};

var ScrollMode;
(function (ScrollMode) {
    ScrollMode["Horizontal"] = "Horizontal";
    ScrollMode["Vertical"] = "Vertical";
    ScrollMode["Wrapped"] = "Wrapped";
})(ScrollMode || (ScrollMode = {}));
var PORTAL_OFFSET = { left: 0, top: 8 };
var MoreActionsPopover = function (_a) {
    var doc = _a.doc, fileName = _a.fileName, onChangeScrollMode = _a.onChangeScrollMode, onJumpToFirstPage = _a.onJumpToFirstPage, onJumpToLastPage = _a.onJumpToLastPage, onRotate = _a.onRotate, onToggleDragScroll = _a.onToggleDragScroll;
    var l10n = React.useContext(LocalizationContext);
    var _b = React.useState(false), enableDragScroll = _b[0], setEnableDragScroll = _b[1];
    var _c = React.useState(ScrollMode.Vertical), scrollMode = _c[0], setScrollMode = _c[1];
    var renderMoreActions = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.moreActions)); };
    var renderTarget = function (toggle, opened) { return (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: toggle, isSelected: opened },
            React.createElement(MoreIcon, null)), content: renderMoreActions, offset: PORTAL_OFFSET })); };
    var renderPropertyMenu = function (toggle) { return (React.createElement(MenuItem, { icon: React.createElement(InfoIcon, null), onClick: toggle }, l10n.moreActions.documentProperties)); };
    var renderPropertiesModal = function (toggle) { return (React.createElement(PropertiesModal, { doc: doc, fileName: fileName, onToggle: toggle })); };
    var renderContent = function (toggle) {
        var jumpToFirstPage = function () {
            toggle();
            onJumpToFirstPage();
        };
        var jumpToLastPage = function () {
            toggle();
            onJumpToLastPage();
        };
        var rotateForward = function () {
            toggle();
            onRotate(90);
        };
        var rotateBackward = function () {
            toggle();
            onRotate(-90);
        };
        var activateTextSelectionMode = function () {
            toggle();
            setEnableDragScroll(false);
            onToggleDragScroll(false);
        };
        var activateHandMode = function () {
            toggle();
            setEnableDragScroll(true);
            onToggleDragScroll(true);
        };
        var activateScrollMode = function (mode) {
            toggle();
            setScrollMode(mode);
            onChangeScrollMode(mode);
        };
        var setVerticalScrollMode = function () { return activateScrollMode(ScrollMode.Vertical); };
        var setHorizontalScrollMode = function () { return activateScrollMode(ScrollMode.Horizontal); };
        var setWrappedScrollMode = function () { return activateScrollMode(ScrollMode.Wrapped); };
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
    return (React.createElement(Popover, { position: Position$1.BottomRight, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET, closeOnClickOutside: true, closeOnEscape: true }));
};

var DropArea = function () {
    var l10n = React.useContext(LocalizationContext);
    return (React.createElement("div", { style: {
            alignItems: 'center',
            backgroundColor: '#FFF',
            border: '2px dashed rgba(0, 0, 0, 0.3)',
            bottom: '0',
            display: 'flex',
            fontSize: '24px',
            height: '100%',
            justifyContent: 'center',
            left: '0',
            position: 'absolute',
            right: '0',
            top: '0',
            width: '100%',
            zIndex: 9999,
        } }, l10n.main.dragDropFile));
};

var AttachmentList = function (_a) {
    var files = _a.files;
    var l10n = React.useContext(LocalizationContext);
    var renderItem = function (file) {
        var onClick = function () { return downloadFile(file.fileName, file.data); };
        return (React.createElement("li", { className: "viewer-attachment-item", key: "attachment-" + file.fileName, style: { padding: '8px' }, title: "" + l10n.attachment.clickToDownload, onClick: onClick }, file.fileName));
    };
    return (files.length === 0
        ? React.createElement("div", null, l10n.attachment.noAttachment)
        : (React.createElement("ul", { style: {
                listStyleType: 'none',
                margin: '0',
                padding: '0',
                width: '100%',
            } }, files.map(renderItem))));
};

var AttachmentLoader = function (_a) {
    var doc = _a.doc;
    var _b = React.useState({
        files: [],
        isLoaded: false,
    }), attachments = _b[0], setAttachments = _b[1];
    React.useEffect(function () {
        doc.getAttachments().then(function (response) {
            var files = response
                ? Object.keys(response).map(function (file) {
                    return {
                        data: response[file].content,
                        fileName: response[file].filename,
                    };
                })
                : [];
            setAttachments({
                files: files,
                isLoaded: true,
            });
        });
    }, []);
    return (!attachments.isLoaded
        ? React.createElement(Spinner, null)
        : React.createElement(AttachmentList, { files: attachments.files }));
};

var BookmarkItem = function (_a) {
    var bookmark = _a.bookmark, depth = _a.depth, doc = _a.doc, onClick = _a.onClick, onJumpToDest = _a.onJumpToDest;
    var toggleRef = React.createRef();
    var subItemRef = React.createRef();
    var subItemsDisplayed = React.useRef(true);
    var hasSubItems = bookmark.items && bookmark.items.length > 0;
    var toggleSubItems = function () {
        subItemsDisplayed.current = !subItemsDisplayed.current;
        var subItemsEle = subItemRef.current;
        var toggleEle = toggleRef.current;
        if (!subItemsEle || !toggleEle) {
            return;
        }
        subItemsEle.style.display = subItemsDisplayed.current ? 'block' : 'none';
        toggleEle.style.transform = subItemsDisplayed.current ? 'rotate(90deg)' : '';
    };
    var clickBookmak = function () {
        if (hasSubItems) {
            onClick(bookmark.dest);
        }
    };
    var clickItem = function () {
        if (!hasSubItems) {
            onClick(bookmark.dest);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "viewer-bookmark-item", style: {
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                padding: "6px 4px 6px " + (depth * 20 + 4) + "px",
            }, onClick: clickItem },
            hasSubItems && (React.createElement("span", { ref: toggleRef, style: {
                    marginRight: '4px',
                    transform: 'rotate(90deg)',
                }, onClick: toggleSubItems }, "\u25BA")),
            React.createElement("div", { onClick: clickBookmak, style: {
                    flexGrow: 1,
                    flexShrink: 1,
                } }, bookmark.title)),
        hasSubItems && (React.createElement("div", { ref: subItemRef },
            React.createElement(BookmarkList, { bookmarks: bookmark.items, depth: depth + 1, doc: doc, onJumpToDest: onJumpToDest })))));
};

var BookmarkList = function (_a) {
    var bookmarks = _a.bookmarks, _b = _a.depth, depth = _b === void 0 ? 0 : _b, doc = _a.doc, onJumpToDest = _a.onJumpToDest;
    var jumpToDest = function (dest) {
        getDestination(doc, dest).then(function (target) {
            var pageIndex = target.pageIndex, bottomOffset = target.bottomOffset, scaleTo = target.scaleTo;
            onJumpToDest(pageIndex + 1, bottomOffset, scaleTo);
        });
    };
    return (React.createElement("ul", { style: {
            listStyleType: 'none',
            margin: '0',
            padding: '0',
        } }, bookmarks.map(function (bookmark, index) {
        return (React.createElement("li", { key: index },
            React.createElement(BookmarkItem, { bookmark: bookmark, depth: depth, doc: doc, onClick: jumpToDest, onJumpToDest: onJumpToDest })));
    })));
};

var BookmarkLoader = function (_a) {
    var doc = _a.doc, onJumpToDest = _a.onJumpToDest;
    var l10n = React.useContext(LocalizationContext);
    var _b = React.useState({
        isLoaded: false,
        items: [],
    }), bookmarks = _b[0], setBookmarks = _b[1];
    React.useEffect(function () {
        doc.getOutline().then(function (outline) {
            setBookmarks({
                isLoaded: true,
                items: outline || [],
            });
        });
    }, []);
    return (!bookmarks.isLoaded
        ? React.createElement(Spinner, null)
        : (React.createElement("div", { style: { width: '100%' } }, bookmarks.items.length === 0
            ? React.createElement("div", { style: { textAlign: 'center' } }, l10n.bookmark.noBookmark)
            : (React.createElement(BookmarkList, { bookmarks: bookmarks.items, depth: 0, doc: doc, onJumpToDest: onJumpToDest })))));
};

var BookmarkIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M11.5,1.5h11c0.552,0,1,0.448,1,1v20c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h3\n                M11.5,10.5c0,0.55-0.3,0.661-0.659,0.248L8,7.5l-2.844,3.246c-0.363,0.414-0.659,0.3-0.659-0.247v-9c0-0.552,0.448-1,1-1h5\n                c0.552,0,1,0.448,1,1L11.5,10.5z\n                M14.5,6.499h6\n                M14.5,10.499h6\n                M3.5,14.499h17\n                M3.5,18.499h16.497" })));
};

var FileIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M7.618,15.345l8.666-8.666c0.78-0.812,2.071-0.838,2.883-0.058s0.838,2.071,0.058,2.883\n                c-0.019,0.02-0.038,0.039-0.058,0.058L7.461,21.305c-1.593,1.593-4.175,1.592-5.767,0s-1.592-4.175,0-5.767c0,0,0,0,0,0\n                L13.928,3.305c2.189-2.19,5.739-2.19,7.929-0.001s2.19,5.739,0,7.929l0,0L13.192,19.9" })));
};

var ThumbnailItem = function (_a) {
    var page = _a.page, pageHeight = _a.pageHeight, pageWidth = _a.pageWidth, rotation = _a.rotation, thumbnailHeight = _a.thumbnailHeight, thumbnailWidth = _a.thumbnailWidth;
    var renderTask = React.useRef();
    var _b = React.useState(''), src = _b[0], setSrc = _b[1];
    React.useEffect(function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var canvas = document.createElement('canvas');
        var canvasContext = canvas.getContext('2d', { alpha: false });
        var w = thumbnailWidth;
        var h = w / (pageWidth / pageHeight);
        var scale = w / pageWidth;
        canvas.height = h;
        canvas.width = w;
        canvas.style.height = h + "px";
        canvas.style.width = w + "px";
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        renderTask.current = page.render({ canvasContext: canvasContext, viewport: viewport });
        renderTask.current.promise.then(function (_) { return setSrc(canvas.toDataURL()); }, function (_) { });
    }, [rotation]);
    return (!src
        ? React.createElement(Spinner, null)
        : React.createElement("img", { src: src, height: thumbnailHeight + "px", width: thumbnailWidth + "px" }));
};

var THUMBNAIL_WIDTH = 100;
var ThumbnailContainer = function (_a) {
    var doc = _a.doc, pageHeight = _a.pageHeight, pageIndex = _a.pageIndex, pageWidth = _a.pageWidth, rotation = _a.rotation;
    var _b = React.useState({
        height: pageHeight,
        isCalculated: false,
        page: null,
        width: pageWidth,
    }), pageSize = _b[0], setPageSize = _b[1];
    var isCalculated = pageSize.isCalculated, page = pageSize.page, height = pageSize.height, width = pageSize.width;
    var scale = width / height;
    var isVertical = Math.abs(rotation) % 180 === 0;
    var w = isVertical ? THUMBNAIL_WIDTH : (THUMBNAIL_WIDTH / scale);
    var h = isVertical ? (THUMBNAIL_WIDTH / scale) : THUMBNAIL_WIDTH;
    var onVisibilityChanged = function (params) {
        if (params.isVisible && !isCalculated) {
            doc.getPage(pageIndex + 1).then(function (pdfPage) {
                var viewport = pdfPage.getViewport({ scale: 1 });
                setPageSize({
                    height: viewport.height,
                    isCalculated: true,
                    page: pdfPage,
                    width: viewport.width,
                });
            });
        }
    };
    return (React.createElement(Observer, { onVisibilityChanged: onVisibilityChanged },
        React.createElement("div", { style: {
                alignItems: 'center',
                boxShadow: '2px 2px 8px 0 rgba(0, 0, 0, 0.2)',
                display: 'flex',
                height: h + "px",
                justifyContent: 'center',
                margin: '0 auto',
                position: 'relative',
                width: w + "px",
            } }, !page
            ? React.createElement(Spinner, null)
            : (React.createElement(ThumbnailItem, { page: page, pageHeight: isVertical ? height : width, pageWidth: isVertical ? width : height, rotation: rotation, thumbnailHeight: h, thumbnailWidth: w })))));
};

var ThumbnailList = function (_a) {
    var currentPage = _a.currentPage, doc = _a.doc, pageHeight = _a.pageHeight, pageWidth = _a.pageWidth, rotation = _a.rotation, onJumpToPage = _a.onJumpToPage;
    var numPages = doc.numPages;
    return (React.createElement(React.Fragment, null, Array(numPages).fill(0).map(function (_, index) {
        var onClick = function () { return onJumpToPage(index); };
        return (React.createElement("div", { key: "thumbnail-" + index },
            React.createElement("div", { className: currentPage === index ? 'viewer-thumbnail-selected' : 'viewer-thumbnail', style: {
                    padding: '8px',
                }, onClick: onClick },
                React.createElement(ThumbnailContainer, { doc: doc, pageHeight: pageHeight, pageIndex: index, pageWidth: pageWidth, rotation: rotation }))));
    })));
};

var Tab;
(function (Tab) {
    Tab["Attachment"] = "Attachment";
    Tab["Bookmark"] = "Bookmark";
    Tab["Thumbnail"] = "Thumbnail";
})(Tab || (Tab = {}));
var TOOLTIP_OFFSET = { left: 0, top: 8 };
var Sidebar = function (_a) {
    var currentPage = _a.currentPage, doc = _a.doc, height = _a.height, rotation = _a.rotation, width = _a.width, onJumpToDest = _a.onJumpToDest, onJumpToPage = _a.onJumpToPage;
    var l10n = React.useContext(LocalizationContext);
    var _b = React.useState(Tab.Thumbnail), tab = _b[0], setTab = _b[1];
    var clickThumbnailTab = function () { return setTab(Tab.Thumbnail); };
    var clickBookmarkTab = function () { return setTab(Tab.Bookmark); };
    var clickAttachmentTab = function () { return setTab(Tab.Attachment); };
    var renderAttachmentTip = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.sidebar.attachment)); };
    var renderBookmarkTip = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.sidebar.bookmark)); };
    var renderThumbnailTip = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.sidebar.thumbnail)); };
    return (React.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
        } },
        // React.createElement("div", { style: {
        //         alignItems: 'center',
        //         backgroundColor: '#EEE',
        //         borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        //         display: 'flex',
        //         justifyContent: 'center',
        //         padding: '4px',
        //     } },
        //     React.createElement("div", { style: { padding: '0 2px' } },
        //         React.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React.createElement(Button, { onClick: clickThumbnailTab, isSelected: tab === Tab.Thumbnail },
        //                 React.createElement(WrappedScrollingIcon, null))), content: renderThumbnailTip, offset: TOOLTIP_OFFSET })),
        //     React.createElement("div", { style: { padding: '0 2px' } },
        //         React.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React.createElement(Button, { onClick: clickBookmarkTab, isSelected: tab === Tab.Bookmark },
        //                 React.createElement(BookmarkIcon, null))), content: renderBookmarkTip, offset: TOOLTIP_OFFSET })),
        //     React.createElement("div", { style: { padding: '0 2px' } },
        //         React.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React.createElement(Button, { onClick: clickAttachmentTab, isSelected: tab === Tab.Attachment },
        //                 React.createElement(FileIcon, null))), content: renderAttachmentTip, offset: TOOLTIP_OFFSET }))
        //                 ),
        React.createElement("div", { style: {
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                flexShrink: 1,
                flexWrap: 'wrap',
                justifyContent: 'center',
                overflow: 'scroll',
                padding: '8px 0',
            } },
            tab === Tab.Thumbnail && (React.createElement(ThumbnailList, { currentPage: currentPage, doc: doc, pageHeight: height, pageWidth: width, rotation: rotation, onJumpToPage: onJumpToPage })),
            tab === Tab.Bookmark && React.createElement(BookmarkLoader, { doc: doc, onJumpToDest: onJumpToDest }),
            tab === Tab.Attachment && React.createElement(AttachmentLoader, { doc: doc }))));
};

var DownloadIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M17.5,11.5c3.314,0,6,2.686,6,6s-2.686,6-6,6s-6-2.686-6-6S14.186,11.5,17.5,11.5z\n                M17.5,14.5v6\n                M17.5,20.5\n                l-2.25-2.25\n                M17.5,20.5l2.25-2.25\n                M10.5,23.5h-9c-0.552,0-1-0.448-1-1v-21c0-0.552,0.448-1,1-1h13.293\n                c0.265,0,0.52,0.105,0.707,0.293L19.207,4.5C19.395,4.687,19.5,4.942,19.5,5.207V8.5" })));
};

var FullScreenIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M15.5,8.499l8-8\n                M0.5,23.499l8-8\n                M5.5,23.499h-5v-5\n                M23.5,5.499v-5h-5\n                M15.5,15.499l8,8\n                M0.5,0.499l8,8\n                M0.5,5.499v-5h5\n                M18.5,23.499h5v-5" })));
};

var LeftSidebarIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M1.5,0.497h20c0.552,0,1,0.448,1,1v20c0,0.552-0.448,1-1,1h-20c-0.552,0-1-0.448-1-1v-20\n                C0.5,0.945,0.948,0.497,1.5,0.497z\n                M7.5,0.497v22" })));
};

var NextIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M0.541,5.627L11.666,18.2c0.183,0.207,0.499,0.226,0.706,0.043c0.015-0.014,0.03-0.028,0.043-0.043\n                L23.541,5.627" })));
};

var PreviousIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M23.535,18.373L12.409,5.8c-0.183-0.207-0.499-0.226-0.706-0.043C11.688,5.77,11.674,5.785,11.66,5.8\n                L0.535,18.373" })));
};

var ZoomInIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z\n                M23.5,23.499\n                l-5.929-5.929\n                M5.5,10.499h10\n                M10.5,5.499v10" })));
};

var ZoomOutIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z\n                M23.5,23.499\n                l-5.929-5.929\n                M5.5,10.499h10" })));
};

var OpenFileIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M4.5,8.5H14\n                M4.5,11.5h6\n                M4.5,5.5h7\n                M4.5,14.5h4\n                M4.5,17.5h4\n                M10.5,23.5h-9c-0.552,0-1-0.448-1-1v-21\n                c0-0.552,0.448-1,1-1h13.293c0.265,0,0.52,0.105,0.707,0.293L19.207,4.5C19.395,4.687,19.5,4.942,19.5,5.207V8.5\n                M17.5,11.5\n                c3.314,0,6,2.686,6,6s-2.686,6-6,6s-6-2.686-6-6S14.186,11.5,17.5,11.5z\n                M17.5,20.5v-6\n                M17.5,14.5l-2.25,2.25\n                M17.5,14.5l2.25,2.25" })));
};

var TOOLTIP_OFFSET$1 = { left: 0, top: 8 };
var OpenFileButton = function (_a) {
    var onOpenFiles = _a.onOpenFiles;
    var l10n = React.useContext(LocalizationContext);
    var openFiles = function (e) {
        var files = e.target.files;
        if (files) {
            onOpenFiles(files);
        }
    };
    var renderContent = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.openFile)); };
    return (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React.createElement("div", { className: "viewer-open-file", style: {
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                position: 'relative',
            } },
            React.createElement("input", { multiple: false, style: {
                    bottom: '0',
                    height: '100%',
                    left: '0',
                    opacity: 0,
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    width: '100%',
                }, type: "file", onChange: openFiles }),
            React.createElement(OpenFileIcon, null))), content: renderContent, offset: TOOLTIP_OFFSET$1 }));
};

var SearchIcon = function () {
    return (React.createElement(Icon, { size: 16 },
        React.createElement("path", { d: "M10.5,0.5c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.5,10.5,0.5z\n                M23.5,23.5\n                l-5.929-5.929" })));
};

var EMPTY_KEYWORD_REGEXP = new RegExp(' ');
var PORTAL_OFFSET$1 = { left: 0, top: 8 };
var SearchPopover = function (_a) {
    var doc = _a.doc, onJumpToMatch = _a.onJumpToMatch, onSearchFor = _a.onSearchFor;
    var numPages = doc.numPages;
    var indexArr = Array(numPages).fill(0).map(function (_, i) { return i; });
    var l10n = React.useContext(LocalizationContext);
    var _b = React.useState(''), keyword = _b[0], setKeyword = _b[1];
    var _c = React.useState([]), found = _c[0], setFound = _c[1];
    var _d = React.useState(0), currentMatch = _d[0], setCurrentMatch = _d[1];
    var _e = React.useState(false), matchCase = _e[0], setMatchCase = _e[1];
    var _f = React.useState(false), wholeWords = _f[0], setWholeWords = _f[1];
    var textContents = React.useRef([]);
    var changeKeyword = function (e) {
        setKeyword(e.target.value);
    };
    var getTextContents = function () {
        var promises = indexArr.map(function (pageIndex) {
            return doc.getPage(pageIndex + 1).then(function (page) {
                return page.getTextContent();
            }).then(function (content) {
                var pageContent = content.items.map(function (item) { return item.str || ''; }).join('');
                return Promise.resolve({
                    pageContent: pageContent,
                    pageIndex: pageIndex,
                });
            });
        });
        return Promise.all(promises).then(function (data) {
            data.sort(function (a, b) { return a.pageIndex - b.pageIndex; });
            return Promise.resolve(data.map(function (item) { return item.pageContent; }));
        });
    };
    var buildKeywordRegex = function (keywordParam, matchCaseParam, wholeWordsParam) {
        var source = wholeWordsParam ? " " + keywordParam + " " : keywordParam;
        var flags = matchCaseParam ? 'g' : 'gi';
        return new RegExp(source, flags);
    };
    var search = function (keywordParam, matchCaseParam, wholeWordsParam) {
        var regexp = buildKeywordRegex(keywordParam, matchCaseParam, wholeWordsParam);
        onSearchFor(regexp);
        setCurrentMatch(0);
        setFound([]);
        var promise = (textContents.current.length === 0)
            ? getTextContents().then(function (response) {
                textContents.current = response;
                return Promise.resolve(response);
            })
            : Promise.resolve(textContents.current);
        promise.then(function (response) {
            var arr = [];
            response.forEach(function (item, pageIndex) {
                var numMatches = (item.match(regexp) || []).length;
                for (var matchIndex = 0; matchIndex < numMatches; matchIndex++) {
                    arr.push({
                        matchIndex: matchIndex,
                        pageIndex: pageIndex,
                    });
                }
            });
            setFound(arr);
            if (arr.length > 0) {
                setCurrentMatch(1);
                onJumpToMatch(arr[0]);
            }
        });
    };
    var keydownSearch = function (e) {
        if (e.keyCode !== 13 || !keyword) {
            return;
        }
        search(keyword, matchCase, wholeWords);
    };
    var jumpToPreviousMatch = function () {
        var prev = currentMatch - 1;
        var updated = prev > 0 ? prev : found.length;
        setCurrentMatch(updated);
        onJumpToMatch(found[updated - 1]);
    };
    var jumpToNextMatch = function () {
        var next = currentMatch + 1;
        var updated = next <= found.length ? next : 1;
        setCurrentMatch(updated);
        onJumpToMatch(found[updated - 1]);
    };
    var changeMatchCase = function (e) {
        var isChecked = e.target.checked;
        setMatchCase(isChecked);
        if (keyword) {
            search(keyword, isChecked, wholeWords);
        }
    };
    var changeWholeWords = function (e) {
        var isChecked = e.target.checked;
        setWholeWords(isChecked);
        if (keyword) {
            search(keyword, matchCase, isChecked);
        }
    };
    var clearKeyword = function () {
        onSearchFor(EMPTY_KEYWORD_REGEXP);
        setKeyword('');
        setCurrentMatch(0);
        setFound([]);
        setMatchCase(false);
        setWholeWords(false);
    };
    var renderSearch = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.search)); };
    var renderTarget = function (toggle, opened) { return (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: toggle, isSelected: opened },
            React.createElement(SearchIcon, null)), content: renderSearch, offset: PORTAL_OFFSET$1 })); };
    var renderPreviousMatch = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.search.previousMatch)); };
    var renderNextMatch = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.search.nextMatch)); };
    var renderContent = function (toggle) {
        var close = function () {
            toggle();
            clearKeyword();
        };
        return (React.createElement("div", { style: { padding: '8px' } },
            React.createElement("div", { style: {
                    alignItems: 'center',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    margin: '0 4px 8px 4px',
                    position: 'relative',
                    width: '180px',
                } },
                React.createElement("input", { placeholder: "" + l10n.search.enterToSearch, style: {
                        border: 'none',
                        padding: '4px',
                        width: '100%',
                    }, type: "text", value: keyword, onChange: changeKeyword, onKeyDown: keydownSearch }),
                React.createElement("div", { style: {
                        alignItems: 'center',
                        bottom: '0',
                        display: 'flex',
                        paddingRight: '4px',
                        position: 'absolute',
                        right: '0',
                        top: '0',
                    } },
                    currentMatch,
                    "/",
                    found.length)),
            // React.createElement("label", { style: {
            //         alignItems: 'center',
            //         display: 'flex',
            //         marginBottom: '8px',
            //     } },
            //     React.createElement("input", { checked: matchCase, style: { marginRight: '4px' }, type: "checkbox", onChange: changeMatchCase }),
            //     " ",
            //     l10n.search.matchCase),
            // React.createElement("label", { style: {
            //         alignItems: 'center',
            //         display: 'flex',
            //         marginBottom: '8px',
            //     } },
            //     React.createElement("input", { checked: wholeWords, style: { marginRight: '4px' }, type: "checkbox", onChange: changeWholeWords }),
            //     " ",
            //     l10n.search.wholeWords),
            React.createElement("div", { style: {
                    alignItems: 'center',
                    display: 'flex',
                } },
                React.createElement("div", { style: { padding: '0 4px' } },
                    React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: jumpToPreviousMatch },
                            React.createElement(PreviousIcon, null)), content: renderPreviousMatch, offset: PORTAL_OFFSET$1 })),
                React.createElement("div", { style: { padding: '0 4px' } },
                    React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: jumpToNextMatch },
                            React.createElement(NextIcon, null)), content: renderNextMatch, offset: PORTAL_OFFSET$1 })),
                React.createElement("button", { style: {
                        backgroundColor: '#357EDD',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#FFF',
                        cursor: 'pointer',
                        marginLeft: 'auto',
                        padding: '8px',
                    }, onClick: close }, l10n.search.close))));
    };
    return (React.createElement(Popover, { position: Position$1.BottomLeft, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET$1, closeOnClickOutside: false, closeOnEscape: true }));
};

var LEVELS$1 = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
var PORTAL_OFFSET$2 = { left: 0, top: 8 };
var ZoomPopover = function (_a) {
    var scale = _a.scale, onZoom = _a.onZoom;
    var l10n = React.useContext(LocalizationContext);
    var getSpcialLevelLabel = function (level) {
        switch (level) {
            case SpecialLevel.ActualSize: return l10n.zoom.actualSize;
            case SpecialLevel.PageFit: return l10n.zoom.pageFit;
            case SpecialLevel.PageWidth: return l10n.zoom.pageWidth;
        }
    };
    var arrow = function () {
        return (React.createElement("span", { style: {
                borderColor: 'rgba(0, 0, 0, .6) transparent transparent transparent',
                borderStyle: 'solid',
                borderWidth: '8px 4px 0 4px',
                height: '0',
                width: '0',
            } }));
    };
    var renderTarget = function (toggle) {
        var click = function () { toggle(); };
        return (React.createElement("span", { style: {
                alignItems: 'center',
                display: 'flex',
            }, onClick: click },
            React.createElement("span", { style: { padding: '4px' } },
                Math.round(scale * 100),
                "%"),
            arrow()));
    };
    var renderContent = function (toggle) { return (React.createElement("div", { style: { padding: '8px 0' } },
        React.createElement("ul", { style: {
                listStyleType: 'none',
                margin: '0',
                padding: '0',
            } },
            Object.keys(SpecialLevel).map(function (k) {
                var level = k;
                var clickMenuItem = function () { toggle(); onZoom(level); };
                return (React.createElement(MenuItem, { key: level, onClick: clickMenuItem }, getSpcialLevelLabel(level)));
            }),
            React.createElement(MenuDivider, null),
            LEVELS$1.map(function (level) {
                var clickMenuItem = function () { toggle(); onZoom(level); };
                return (React.createElement(MenuItem, { key: level, onClick: clickMenuItem }, Math.round(level * 100) + "%"));
            })))); };
    return (React.createElement(Popover, { position: Position$1.BottomCenter, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET$2, closeOnClickOutside: true, closeOnEscape: true }));
};

var TOOLTIP_OFFSET$2 = { left: 0, top: 8 };
var Toolbar = function (_a) {
    var currentPage = _a.currentPage, doc = _a.doc, fileName = _a.fileName, scale = _a.scale, onChangeScrollMode = _a.onChangeScrollMode, onDownload = _a.onDownload, onFullScreen = _a.onFullScreen, onJumpTo = _a.onJumpTo, onJumpToMatch = _a.onJumpToMatch, onOpenFiles = _a.onOpenFiles, onRotate = _a.onRotate, onSearchFor = _a.onSearchFor, onToggleDragScroll = _a.onToggleDragScroll, onToggleSidebar = _a.onToggleSidebar, onZoom = _a.onZoom, renderToolbar = _a.renderToolbar;
    var l10n = React.useContext(LocalizationContext);
    var _b = React.useState(false), pageTextboxFocused = _b[0], setPageTextboxFocused = _b[1];
    var _c = React.useState(currentPage), editingPage = _c[0], setEditingPage = _c[1];
    var _d = React.useState(false), isSidebarOpened = _d[0], setSidebarOpened = _d[1];
    var numPages = doc.numPages;
    var zoomOut = function () {
        var newLevel = decrease(scale);
        onZoom(newLevel);
    };
    var zoomIn = function () {
        var newLevel = increase(scale);
        onZoom(newLevel);
    };
    var gotoNextPage = function () {
        var nextPage = currentPage + 1;
        if (nextPage < numPages) {
            setEditingPage(nextPage);
            onJumpTo(nextPage);
        }
    };
    var gotoPreviousPage = function () {
        var previousPage = currentPage - 1;
        if (previousPage >= 0) {
            setEditingPage(previousPage);
            onJumpTo(previousPage);
        }
    };
    var changePage = function (e) {
        var newPage = parseInt(e.target.value, 10);
        if (newPage > 0 && newPage <= numPages) {
            setEditingPage(newPage - 1);
        }
    };
    var focusPageTextbox = function () {
        setPageTextboxFocused(true);
        setEditingPage(currentPage);
    };
    var blurPageTextbox = function () {
        setPageTextboxFocused(false);
    };
    var keydownPage = function (e) {
        switch (e.keyCode) {
            case 38:
                gotoPreviousPage();
                break;
            case 40:
                gotoNextPage();
                break;
            case 13:
                onJumpTo(editingPage);
                break;
        }
    };
    var jumpToFirstPage = function () { return onJumpTo(0); };
    var jumpToLastPage = function () { return onJumpTo(numPages - 1); };
    var toggleSidebar = function () {
        setSidebarOpened(!isSidebarOpened);
        onToggleSidebar();
    };
    var renderToggle = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.toggleSidebar)); };
    var renderPreviousPage = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.previousPage)); };
    var renderNextPage = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.nextPage)); };
    var renderZoomOut = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.zoomOut)); };
    var renderZoomIn = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.zoomIn)); };
    var renderFullScreen = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.fullScreen)); };
    var renderDownload = function () { return (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.download)); };
    return renderToolbar({
        currentPage: currentPage,
        currentPageInput: (React.createElement("input", { type: "text", value: pageTextboxFocused ? (editingPage + 1) : (currentPage + 1), onChange: changePage, onFocus: focusPageTextbox, onBlur: blurPageTextbox, onKeyDown: keydownPage, style: {
                border: '1px solid rgba(0, 0, 0, 0.3)',
                padding: '4px',
                width: '50px',
            } })),
        downloadButton: (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: onDownload },
                React.createElement(DownloadIcon, null)), content: renderDownload, offset: TOOLTIP_OFFSET$2 })),
        fullScreenButton: (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: onFullScreen },
                React.createElement(FullScreenIcon, null)), content: renderFullScreen, offset: TOOLTIP_OFFSET$2 })),
        // moreActionsPopover: (React.createElement(MoreActionsPopover, { doc: doc, fileName: fileName, onChangeScrollMode: onChangeScrollMode, onJumpToFirstPage: jumpToFirstPage, onJumpToLastPage: jumpToLastPage, onRotate: onRotate, onToggleDragScroll: onToggleDragScroll })),
        nextPageButton: (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: gotoNextPage },
                React.createElement(NextIcon, null)), content: renderNextPage, offset: TOOLTIP_OFFSET$2 })),
        numPages: numPages,
        // openFileButton: (React.createElement(OpenFileButton, { onOpenFiles: onOpenFiles })),
        previousPageButton: (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: gotoPreviousPage },
                React.createElement(PreviousIcon, null)), content: renderPreviousPage, offset: TOOLTIP_OFFSET$2 })),
        searchPopover: (React.createElement(SearchPopover, { doc: doc, onJumpToMatch: onJumpToMatch, onSearchFor: onSearchFor })),
        toggleSidebarButton: (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React.createElement(Button, { onClick: toggleSidebar, isSelected: isSidebarOpened },
                React.createElement(LeftSidebarIcon, null))), content: renderToggle, offset: TOOLTIP_OFFSET$2 })),
        zoomInButton: (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: zoomIn },
                React.createElement(ZoomInIcon, null)), content: renderZoomIn, offset: TOOLTIP_OFFSET$2 })),
        zoomOutButton: (React.createElement(Tooltip, { position: Position$1.BottomCenter, target: React.createElement(Button, { onClick: zoomOut },
                React.createElement(ZoomOutIcon, null)), content: renderZoomOut, offset: TOOLTIP_OFFSET$2 })),
        zoomPopover: (React.createElement(ZoomPopover, { scale: scale, onZoom: onZoom })),
    });
};

var getFileExt = function (url) {
    var str = url.split(/\./).pop();
    return !!str ? str.toLowerCase() : '';
};

var EMPTY_KEYWORD_REGEXP$1 = new RegExp(' ');
var SCROLL_BAR_WIDTH = 17;
var PAGE_PADDING = 8;
var ViewerInner = function (_a) {
    var doc = _a.doc, fileName = _a.fileName, layout = _a.layout, pageSize = _a.pageSize, onDownload = _a.onDownload, onOpenFile = _a.onOpenFile;
    var pagesRef = GimmeRef();
    var _b = React.useState(pageSize.scale), scale = _b[0], setScale = _b[1];
    var _c = React.useState(0), currentPage = _c[0], setCurrentPage = _c[1];
    var _d = React.useState(0), rotation = _d[0], setRotation = _d[1];
    var _e = React.useState(EMPTY_KEYWORD_REGEXP$1), keywordRegexp = _e[0], setKeywordRegexp = _e[1];
    var _f = React.useState({
        matchIndex: -1,
        pageIndex: -1,
    }), match = _f[0], setMatch = _f[1];
    var toggleDragScroll = useDragScroll(pagesRef).toggleDragScroll;
    var _g = useFullScreen(pagesRef), isFullScreen = _g.isFullScreen, openFullScreen = _g.openFullScreen, closeFullScreen = _g.closeFullScreen;
    var isDragging = useDrop(pagesRef, function (files) { return openFiles(files); }).isDragging;
    var toggleSidebar = useToggle();
    var numPages = doc.numPages;
    var pageWidth = pageSize.pageWidth, pageHeight = pageSize.pageHeight;
    var arr = Array(numPages).fill(null);
    var pageVisibility = arr.map(function (_, __) { return 0; });
    var pageRefs = arr.map(function (_, __) { return GimmeRef(); });
    
    var zoom = function (newScale) {
        var pagesEle = pagesRef.current;
        if (!pagesEle) {
            return;
        }
        switch (newScale) {
            case SpecialLevel.ActualSize:
                setScale(1);
                break;
            case SpecialLevel.PageFit:
                var scaleWidth = (pagesEle.offsetWidth - SCROLL_BAR_WIDTH) / pageWidth;
                var scaleHeight = (pagesEle.offsetHeight - 2 * PAGE_PADDING) / pageHeight;
                setScale(Math.min(scaleWidth, scaleHeight));
                break;
            case SpecialLevel.PageWidth:
                setScale((pagesEle.offsetWidth - SCROLL_BAR_WIDTH) / pageWidth);
                break;
            default:
                setScale(newScale);
                break;
        }
    };
    var pageVisibilityChanged = function (pageIndex, ratio) {
        pageVisibility[pageIndex] = ratio;
        var maxRatioPage = pageVisibility.reduce(function (maxIndex, item, index, array) {
            return item > array[maxIndex] ? index : maxIndex;
        }, 0);
        setCurrentPage(maxRatioPage);
    };

    

    var jumpToPage = function (pageIndex) {
        if (pageIndex < 0 || pageIndex >= numPages) {
            return;
        }
        setCurrentPage(pageIndex);
        var pagesContainer = pagesRef.current;
        var targetPage = pageRefs[pageIndex].current;
        if (pagesContainer && targetPage) {
            pagesContainer.scrollTop = targetPage.offsetTop;
        }
    };

    _a.parent.__proto__.jumpToPage = jumpToPage;
    var rotate = function (degree) {
        var updateRotation = (rotation === 360 || rotation === -360) ? degree : rotation + degree;
        setRotation(updateRotation);
    };
    var changeScrollMode = function (mode) {
        var pagesContainer = pagesRef.current;
        if (!pagesContainer) {
            return;
        }
        var styles = {};
        switch (mode) {
            case ScrollMode.Vertical:
                styles = {
                    'display': 'flex',
                    'flex-direction': 'column',
                    'flex-wrap': '',
                    'justify-content': '',
                };
                break;
            case ScrollMode.Horizontal:
                styles = {
                    'display': 'flex',
                    'flex-direction': 'row',
                    'flex-wrap': '',
                    'justify-content': '',
                };
                break;
            case ScrollMode.Wrapped:
                styles = {
                    'display': 'flex',
                    'flex-direction': 'row',
                    'flex-wrap': 'wrap',
                    'justify-content': 'center',
                };
                break;
        }
        Object.keys(styles).forEach(function (k) {
            pagesContainer.style.setProperty(k, styles[k]);
        });
    };
    var openFiles = function (files) {
        if (files.length === 0) {
            return;
        }
        var file = files[0];
        if (getFileExt(file.name).toLowerCase() !== 'pdf') {
            return;
        }
        new Promise(function (resolve, _) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function (e) {
                var bytes = new Uint8Array(reader.result);
                resolve(bytes);
            };
        }).then(function (data) {
            onOpenFile(file.name, data);
        });
    };
    var jumpToMatch = function (target) {
        jumpToPage(target.pageIndex);
        setMatch(target);
    };
    var jumpToDest = function (pageIndex, bottomOffset, scaleTo) {
        var pagesContainer = pagesRef.current;
        if (!pagesContainer) {
            return;
        }
        var newPageIndex = pageIndex + 1;
        doc.getPage(newPageIndex).then(function (page) {
            var viewport = page.getViewport({ scale: 1 });
            var top = 0;
            var bottom = bottomOffset || 0;
            switch (scaleTo) {
                case SpecialLevel.PageFit:
                    top = 0;
                    zoom(SpecialLevel.PageFit);
                    break;
                default:
                    top = (viewport.height - bottom) * scale;
                    break;
            }
            var targetPageEle = pageRefs[pageIndex].current;
            if (targetPageEle) {
                pagesContainer.scrollTop = targetPageEle.offsetTop + top;
            }
        });
    };
    return layout(toggleSidebar.opened, {
        attrs: {
            ref: pagesRef,
            style: {
                position: 'relative',
            },
        },
        children: (React.createElement(React.Fragment, null,
            isDragging && React.createElement(DropArea, null),
            isFullScreen && (React.createElement("div", { style: {
                    bottom: 0,
                    padding: '8px',
                    position: 'fixed',
                    right: 0,
                } },
                React.createElement("div", { style: { backgroundColor: '#FFF' }, title: "Exit full screen" },
                    React.createElement(Button, { onClick: closeFullScreen },
                        React.createElement(ExitFullScreenIcon, null))))),
            Array(numPages).fill(0).map(function (_, index) {
                return (React.createElement("div", { key: "pagelayer-" + index, ref: function (ref) {
                        pageRefs[index].current = ref;
                    }, style: { padding: '8px' } },
                    React.createElement(PageLayer, { doc: doc, keywordRegexp: keywordRegexp, height: pageHeight, match: match, pageIndex: index, rotation: rotation, scale: scale, width: pageWidth, onJumpToDest: jumpToDest, onPageVisibilityChanged: pageVisibilityChanged })));
            }))),
    }, function (renderToolbar) { return (React.createElement(Toolbar, { currentPage: currentPage, doc: doc, fileName: fileName, scale: scale, onChangeScrollMode: changeScrollMode, onDownload: onDownload, onFullScreen: openFullScreen, onJumpTo: jumpToPage, onJumpToMatch: jumpToMatch, onOpenFiles: openFiles, onRotate: rotate, onSearchFor: setKeywordRegexp, onToggleDragScroll: toggleDragScroll, onToggleSidebar: toggleSidebar.toggle, onZoom: zoom, renderToolbar: renderToolbar })); }, {
        attrs: {},
        children: (React.createElement(Sidebar, { currentPage: currentPage, doc: doc, height: pageHeight, rotation: rotation, width: pageWidth, onJumpToDest: jumpToDest, onJumpToPage: jumpToPage })),
    });
};

var Viewer = function (_a) {
    var defaultScale = _a.defaultScale, fileUrl = _a.fileUrl, layout = _a.layout, localization = _a.localization;
    var _b = React.useState({
        data: fileUrl,
        name: fileUrl,
    }), file = _b[0], setFile = _b[1];
    var layoutOption = function (isSidebarOpened, main, toolbar, sidebar) {
        return defaultLayout(isSidebarOpened, main, toolbar(defaultToolbar), sidebar);
    };
    var openFile = function (fileName, data) {
        setFile({
            data: data,
            name: fileName,
        });
    };
    var download = function () {
        downloadFile(file.name, file.data);
    };
    var renderDoc = function (doc) {
        var renderInner = function (ps) {
            var pageSize = ps;
            pageSize.scale = defaultScale || ps.scale;
            return (React.createElement(ViewerInner, { doc: doc, fileName: file.name, layout: layout || layoutOption, pageSize: pageSize, onDownload: download, onOpenFile: openFile, parent: _a.parent }));
        };
        return (React.createElement(PageSizeCalculator, { doc: doc, render: renderInner }));
    };
    return (React.createElement(LocalizationProvider, { localization: localization },
        React.createElement(DocumentLoader, { file: file.data, render: renderDoc })));
};

var Worker = function (_a) {
    var children = _a.children, workerUrl = _a.workerUrl;
    PdfJs.GlobalWorkerOptions.workerSrc = workerUrl;
    return React.createElement(React.Fragment, null, children);
};

exports.Button = Button;
exports.Icon = Icon;
exports.MenuDivider = MenuDivider;
exports.MenuItem = MenuItem;
exports.Modal = Modal;
exports.Popover = Popover;
exports.Position = Position$1;
exports.Tooltip = Tooltip;
exports.Worker = Worker;
exports.default = Viewer;
exports.defaultLayout = defaultLayout;
exports.defaultToolbar = defaultToolbar;
