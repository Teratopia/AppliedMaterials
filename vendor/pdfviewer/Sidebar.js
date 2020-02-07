import React from "react"
import AttachmentLoader from "./attachment/AttachmentLoader"
import BookmarkLoader from "./bookmark/BookmarkLoader"
import Button from "./Button"
import BookmarkIcon from "./icons/BookmarkIcon"
import FileIcon from "./icons/FileIcon"
import WrappedScrollingIcon from "./icons/WrappedScrollingIcon"
import LocalizationContext from "./localization/LocalizationContext"
import Position from "./portal/Position"
import Tooltip from "./portal/Tooltip"
import ThumbnailList from "./thumbnail/ThumbnailList"
import Icon from "../../src/images/applied-icon.png";
var Tab
;(function(Tab) {
  Tab["Attachment"] = "Attachment"
  Tab["Bookmark"] = "Bookmark"
  Tab["Thumbnail"] = "Thumbnail"
})(Tab || (Tab = {}))
const TOOLTIP_OFFSET = { left: 0, top: 8 }
const Sidebar = ({
  currentPage,
  doc,
  height,
  rotation,
  width,
  onJumpToDest,
  onJumpToPage,
}) => {
  const l10n = React.useContext(LocalizationContext)
  const [tab, setTab] = React.useState(Tab.Thumbnail)
  const clickThumbnailTab = () => setTab(Tab.Thumbnail)
  const clickBookmarkTab = () => setTab(Tab.Bookmark)
  const clickAttachmentTab = () => setTab(Tab.Attachment)
  const renderAttachmentTip = () =>
    React.createElement(
      "div",
      { style: { padding: "8px" } },
      l10n.sidebar.attachment
    )
  const renderBookmarkTip = () =>
    React.createElement(
      "div",
      { style: { padding: "8px" } },
      l10n.sidebar.bookmark
    )
  const renderThumbnailTip = () =>
    React.createElement(
      "div",
      { style: { padding: "8px" } },
      l10n.sidebar.thumbnail
    )
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          alignItems: "center",
          backgroundColor: "#EEE",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "center",
          padding: "4px",
        },
      },
      <img src={Icon } alt="Applied Icon" style={{maxWidth: 20, margin: 6}}/>
    //   React.createElement(
    //     "div",
    //     { style: { padding: "0 2px" } },
    //     React.createElement(Tooltip, {
    //       position: Position.BottomCenter,
    //       target: React.createElement(
    //         Button,
    //         { onClick: clickThumbnailTab, isSelected: tab === Tab.Thumbnail },
    //         React.createElement(WrappedScrollingIcon, null)
    //       ),
    //       content: renderThumbnailTip,
    //       offset: TOOLTIP_OFFSET,
    //     })
    //   ),
    //   React.createElement(
    //     "div",
    //     { style: { padding: "0 2px" } },
    //     React.createElement(Tooltip, {
    //       position: Position.BottomCenter,
    //       target: React.createElement(
    //         Button,
    //         { onClick: clickBookmarkTab, isSelected: tab === Tab.Bookmark },
    //         React.createElement(BookmarkIcon, null)
    //       ),
    //       content: renderBookmarkTip,
    //       offset: TOOLTIP_OFFSET,
    //     })
    //   ),
    //   React.createElement(
    //     "div",
    //     { style: { padding: "0 2px" } },
    //     React.createElement(Tooltip, {
    //       position: Position.BottomCenter,
    //       target: React.createElement(
    //         Button,
    //         { onClick: clickAttachmentTab, isSelected: tab === Tab.Attachment },
    //         React.createElement(FileIcon, null)
    //       ),
    //       content: renderAttachmentTip,
    //       offset: TOOLTIP_OFFSET,
    //     })
    //   )
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          flexShrink: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          overflow: "scroll",
          padding: "8px 0",
        },
      },
      tab === Tab.Thumbnail &&
        React.createElement(ThumbnailList, {
          currentPage: currentPage,
          doc: doc,
          pageHeight: height,
          pageWidth: width,
          rotation: rotation,
          onJumpToPage: onJumpToPage,
        }),
      tab === Tab.Bookmark &&
        React.createElement(BookmarkLoader, {
          doc: doc,
          onJumpToDest: onJumpToDest,
        }),
      tab === Tab.Attachment &&
        React.createElement(AttachmentLoader, { doc: doc })
    )
  )
}
export default Sidebar
