import React from 'react';
import Button from '../Button';
import NextIcon from '../icons/NextIcon';
import PreviousIcon from '../icons/PreviousIcon';
import SearchIcon from '../icons/SearchIcon';
import LocalizationContext from '../localization/LocalizationContext';
import Popover from '../portal/Popover';
import Position from '../portal/Position';
import Tooltip from '../portal/Tooltip';
const EMPTY_KEYWORD_REGEXP = new RegExp(' ');
const PORTAL_OFFSET = { left: 0, top: 8 };
const SearchPopover = ({ doc, onJumpToMatch, onSearchFor }) => {
    const { numPages } = doc;
    const indexArr = Array(numPages).fill(0).map((_, i) => i);
    const l10n = React.useContext(LocalizationContext);
    const [keyword, setKeyword] = React.useState('');
    const [found, setFound] = React.useState([]);
    const [currentMatch, setCurrentMatch] = React.useState(0);
    const [matchCase, setMatchCase] = React.useState(false);
    const [wholeWords, setWholeWords] = React.useState(false);
    const textContents = React.useRef([]);
    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    };
    const getTextContents = () => {
        const promises = indexArr.map((pageIndex) => {
            return doc.getPage(pageIndex + 1).then((page) => {
                return page.getTextContent();
            }).then((content) => {
                const pageContent = content.items.map((item) => item.str || '').join('');
                return Promise.resolve({
                    pageContent,
                    pageIndex,
                });
            });
        });
        return Promise.all(promises).then((data) => {
            data.sort((a, b) => a.pageIndex - b.pageIndex);
            return Promise.resolve(data.map((item) => item.pageContent));
        });
    };
    const buildKeywordRegex = (keywordParam, matchCaseParam, wholeWordsParam) => {
        const source = wholeWordsParam ? ` ${keywordParam} ` : keywordParam;
        const flags = matchCaseParam ? 'g' : 'gi';
        return new RegExp(source, flags);
    };
    const search = (keywordParam, matchCaseParam, wholeWordsParam) => {
        const regexp = buildKeywordRegex(keywordParam, matchCaseParam, wholeWordsParam);
        onSearchFor(regexp);
        setCurrentMatch(0);
        setFound([]);
        const promise = (textContents.current.length === 0)
            ? getTextContents().then((response) => {
                textContents.current = response;
                return Promise.resolve(response);
            })
            : Promise.resolve(textContents.current);
        promise.then((response) => {
            const arr = [];
            response.forEach((item, pageIndex) => {
                const numMatches = (item.match(regexp) || []).length;
                for (let matchIndex = 0; matchIndex < numMatches; matchIndex++) {
                    arr.push({
                        matchIndex,
                        pageIndex,
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
    const keydownSearch = (e) => {
        if (e.keyCode !== 13 || !keyword) {
            return;
        }
        search(keyword, matchCase, wholeWords);
    };
    const jumpToPreviousMatch = () => {
        const prev = currentMatch - 1;
        const updated = prev > 0 ? prev : found.length;
        setCurrentMatch(updated);
        onJumpToMatch(found[updated - 1]);
    };
    const jumpToNextMatch = () => {
        const next = currentMatch + 1;
        const updated = next <= found.length ? next : 1;
        setCurrentMatch(updated);
        onJumpToMatch(found[updated - 1]);
    };
    const changeMatchCase = (e) => {
        const isChecked = e.target.checked;
        setMatchCase(isChecked);
        if (keyword) {
            search(keyword, isChecked, wholeWords);
        }
    };
    const changeWholeWords = (e) => {
        const isChecked = e.target.checked;
        setWholeWords(isChecked);
        if (keyword) {
            search(keyword, matchCase, isChecked);
        }
    };
    const clearKeyword = () => {
        if (!keyword) {
        }
        onSearchFor(EMPTY_KEYWORD_REGEXP);
        setKeyword('');
        setCurrentMatch(0);
        setFound([]);
        setMatchCase(false);
        setWholeWords(false);
    };
    const renderSearch = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.toolbar.search));
    const renderTarget = (toggle, opened) => (React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: toggle, isSelected: opened },
            React.createElement(SearchIcon, null)), content: renderSearch, offset: PORTAL_OFFSET }));
    const renderPreviousMatch = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.search.previousMatch));
    const renderNextMatch = () => (React.createElement("div", { style: { padding: '8px' } }, l10n.search.nextMatch));
    const renderContent = (toggle) => {
        const close = () => {
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
                React.createElement("input", { placeholder: `${l10n.search.enterToSearch}`, style: {
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
            React.createElement("label", { style: {
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: '8px',
                } },
                React.createElement("input", { checked: matchCase, style: { marginRight: '4px' }, type: "checkbox", onChange: changeMatchCase }),
                " ",
                l10n.search.matchCase),
            React.createElement("label", { style: {
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: '8px',
                } },
                React.createElement("input", { checked: wholeWords, style: { marginRight: '4px' }, type: "checkbox", onChange: changeWholeWords }),
                " ",
                l10n.search.wholeWords),
            React.createElement("div", { style: {
                    alignItems: 'center',
                    display: 'flex',
                } },
                React.createElement("div", { style: { padding: '0 4px' } },
                    React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: jumpToPreviousMatch },
                            React.createElement(PreviousIcon, null)), content: renderPreviousMatch, offset: PORTAL_OFFSET })),
                React.createElement("div", { style: { padding: '0 4px' } },
                    React.createElement(Tooltip, { position: Position.BottomCenter, target: React.createElement(Button, { onClick: jumpToNextMatch },
                            React.createElement(NextIcon, null)), content: renderNextMatch, offset: PORTAL_OFFSET })),
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
    return (React.createElement(Popover, { position: Position.BottomLeft, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET, closeOnClickOutside: false, closeOnEscape: true }));
};
export default SearchPopover;
