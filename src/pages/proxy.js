import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Wijmo from "../components/wijmo"
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
    margin-bottom: 18px;

    @media screen and (min-width: 408px) {
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    }

    .my-menu-item {
      text-align: center;
      display: table;
      cursor: pointer;
      background: #e5e5e5;
      width: 100%;
      height: 100%;
      min-height: 70px;
      padding: 8px 12px;

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
        
        line-height: 18px;

        font-size: 12px !important;
      }
    }
  }

  .my-breadcrumbs a {
    margin-bottom: 4px;
    color: #777;

    &:hover {
      color: #77777777;
    }
  }

  #adobe-dc-view {
    height: 100vh;
    margin-bottom: 48px;
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
      // var adobeDCView = new window.AdobeDC.View({clientId: "4cf176e7e8a04036a69a1a50982528b3", divId: "adobe-dc-view"});
      // adobeDCView.previewFile({
      //   content:{location: {url: require("../images/applied-proxy.pdf")}},
      //   metaData:{fileName: "Applied Materials 2020 Proxy"}
      // }, {showDownloadPDF: true, showZoom: true,
      //   showPrintPDF: true, embedMode: "SIZED_CONTAINER"});
    
    
        window.onscroll = this.handleScroll.bind(this)
        window.onresize = this.handleScroll.bind(this)
  
    }

  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleScroll)
  }

  handleScroll(event) {
    let height = 150;
    let myDocuments = document.querySelectorAll(".my-documents")[0];

    if (myDocuments) {
      height += myDocuments.scrollHeight
    }

    let myBreadcrumbs = document.querySelectorAll(".my-breadcrumbs")[0];

    if (myBreadcrumbs) {
      height += myBreadcrumbs.scrollHeight
    }
    

    this.setState({
      top:  height - event.currentTarget.scrollY ,
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
            <div style={{ padding: "0 2px", minWidth: 87  }}>
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
              paddingRight: "6vw"
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
            position: "relative",
            position: "fixed",
            width: "100%",
            
            top: this.state.top
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
              overflow: "hidden",
              
              // top: 0,
              zIndex: 400
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
          <Page>
            <Container >
              <div className="my-breadcrumbs" style={{ marginBottom: "18px" }}>
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

            {/* <iframe src={ require("../components/web/viewer.html")} style={{height: 100, width: 100}} /> */}

            {/* <Proxy /> */}

            {/* <Container> */}
              {/* <div id="adobe-dc-view"></div> */}
            {/* </Container> */}
            {/* <Wijmo /> */}

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
