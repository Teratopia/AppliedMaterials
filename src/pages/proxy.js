import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import Worker from "../../vendor/pdfviewer/Worker"
import Viewer from "../../vendor/pdfviewer/Viewer"
import theme from "../theme.js"

const Styles = styled.div`
  .my-documents {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(145px, 1fr));
    grid-gap: 6px;
    margin-bottom: 24px;

    @media screen and (min-width: 408px) {
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    }

    .my-menu-item {
      text-align: center;
      display: table;
      cursor: pointer;
      background: #e5e5e5;
      font-size: 12px;
      width: 100%;

      &:hover {
        background: #469ac2;
        color: white;
      }

      &.active {
        background: #469ac2;
        color: white;
      }

      .cell {
        display: table-cell;
        vertical-align: middle;
        padding: 6px 12px;
        height: 93px;
        font-size: 14px;
        width: 100%;

        @media screen and (max-width: 319px) {
          height: 74px;
        }

        @media screen and (min-width: 408px) {
          height: 74px;
        }
      }
    }
  }

  .my-breadcrumbs a {
    color: #777;

    &:hover {
      color: #77777777;
    }
  }

  canvas {
    width: 100%;
  }
`

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = {}
    this.state.current = ""
    this.state.active = { name: "" }
    this.state.materials = props.data.materials.frontmatter.documents
    this.state.currentPage = 3
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      window.onscroll = this.handleScroll.bind(this)
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll(event) {
    this.setState({
      top: -event.target.scrollingElement.scrollTop,
    })
  }

  toggleActive(e) {
    if (document.querySelectorAll(".my-menu-item.active")[0]) {
      document
        .querySelectorAll(".my-menu-item.active")[0]
        .classList.toggle("active")
    }

    e.currentTarget.classList.toggle("active")

    let current = (
      <span>
        /{" "}
        <span style={{ color: theme.blue }}>
          {e.currentTarget.dataset.current}
        </span>
      </span>
    )
    this.setState({
      current,
      currentPageNumber: e.currentTarget.dataset.page,
    })

    this.jumpToPage(parseInt(e.currentTarget.dataset.page))
  }

  menuItem(el, idx) {
    return (
      <div
        className={"my-menu-item "}
        key={el.title}
        data-page={el.page}
        data-current={el.title}
        onClick={this.toggleActive.bind(this)}
      >
        <div className="cell">{el.title}</div>
      </div>
    )
  }

  render() {
    const renderToolbar = toolbarSlot => {
      return (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <div style={{ padding: "0 2px" }}>
              {toolbarSlot.toggleSidebarButton}
            </div>
            <div style={{ padding: "0 2px" }}>{toolbarSlot.searchPopover}</div>
            <div style={{ padding: "0 2px" }}>
              {toolbarSlot.previousPageButton}
            </div>
            <div style={{ padding: "0 2px" }}>
              {toolbarSlot.currentPageInput} / {toolbarSlot.numPages}
            </div>
            <div style={{ padding: "0 2px" }}>{toolbarSlot.nextPageButton}</div>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: "center",
            }}
          >
            <div style={{ padding: "0 2px" }}>{toolbarSlot.zoomOutButton}</div>
            <div style={{ padding: "0 2px" }}>{toolbarSlot.zoomPopover}</div>
            <div style={{ padding: "0 2px" }}>{toolbarSlot.zoomInButton}</div>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              marginLeft: "auto",
            }}
          >
            <div style={{ padding: "0 2px" }}>
              {toolbarSlot.fullScreenButton}
            </div>
            <div style={{ padding: "0 2px" }}>{toolbarSlot.openFileButton}</div>
            <div style={{ padding: "0 2px" }}>{toolbarSlot.downloadButton}</div>
            <div style={{ padding: "0 2px" }}>
              {toolbarSlot.moreActionsPopover}
            </div>
          </div>
        </div>
      )
    }

    const layout = (isSidebarOpened, main, toolbar, sidebar) => {
      return (
        <div
          style={{
            border: "1px solid rgba(0, 0, 0, .3)",
            display: "grid",
            gridTemplateAreas: isSidebarOpened
              ? "'toolbar toolbar' 'sidebar main'"
              : "'toolbar' 'main'",
            gridTemplateColumns: isSidebarOpened ? "30% 1fr" : "1fr",
            gridTemplateRows: "40px calc(100% - 40px)",
            height: "100%",
            overflow: "hidden",
            width: "100%",
            position: "fixed",
            top: 360 + this.state.top
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: "#EEE",
              borderBottom: "1px solid rgba(0, 0, 0, .1)",
              display: "flex",
              gridArea: "toolbar",
              justifyContent: "center",
              padding: "4px",
            }}
          >
            {toolbar(renderToolbar)}
          </div>
          <div
            style={{
              borderRight: "1px solid rgba(0, 0, 0, 0.2)",
              display: "flex",
              gridArea: "sidebar",
              display: isSidebarOpened ? "flex" : "none",
              justifyContent: "center",
            }}
          >
            {sidebar.children}
          </div>
          <div
            {...main.attrs}
            style={Object.assign(
              {},
              {
                gridArea: "main",
                overflow: "scroll",
              },
              main.attrs.style
            )}
          >
            {main.children}
          </div>
        </div>
      )
    }

    return (
      <Layout>
        <SEO title="" />
        <Styles>
          <Page e>
            <Container>
              <div className="my-breadcrumbs" style={{ marginBottom: "30px" }}>
                <span>
                  <Link to="/">Home</Link> /{" "}
                  <Link to="proxy">2020 Proxy Statement</Link>{" "}
                  {this.state.current}
                </span>
              </div>

              <div className="my-documents">
                {this.state.materials.map(this.menuItem.bind(this))}
              </div>
            </Container>

            <div
              className="my-target"
              style={{ position: "relative", height: "110vh" }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.2.228/build/pdf.worker.min.js">
                <div
                  style={{
                    height: "100vh",
                    overflowY: "scroll",
                    position: "relative",
                    marginBottom: 100,
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <Viewer
                      layout={layout}
                      parent={this}
                      fileUrl={require("../images/applied-proxy.pdf")}
                    />
                  </div>
                </div>
              </Worker>
            </div>
          </Page>
        </Styles>
      </Layout>
    )
  }
}

export const query = graphql`
  {
    materials: markdownRemark(frontmatter: { title: { eq: "proxy" } }) {
      frontmatter {
        documents {
          title
          page
        }
      }
    }
  }
`
