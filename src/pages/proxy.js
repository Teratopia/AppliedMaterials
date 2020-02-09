import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
// import MyViewer from "../components/viewer/myViewer"
// import Wijmo from "../components/wijmo"



import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
// import Worker from "../../vendor/pdfviewer/Worker"
// import Viewer from "../../vendor/pdfviewer/Viewer"
import theme from "../theme.js"

const PSPDFKit = typeof window !== undefined ? require("pspdfkit") : "div";

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
      min-height: 54px;
      padding: 8px 12px;

      @media screen and (min-width: 606px) {
        min-height: 70px;
      }

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
  constructor(props, context) {
    super( props, context)
    this.state = {}
    this.state.current = ""
    this.state.active = { name: "" }
    this.state.materials = props.data.materials.frontmatter.documents
    this.state.currentPage = 3

    this._instance = null;
    this._container = null;
    this.onRef = this.onRef.bind(this);
    this.load = this.load.bind(this);
    this.unload = this.unload.bind(this);
  }

  onRef(container) {
    this._container = container;
  }

  async load() {

    if (typeof window === undefined) {
      return;
    }
    this._instance = PSPDFKit.load({
      pdf: require("../images/applied-proxy.pdf"),
      container: this._container,
      toolbarItems: PSPDFKit.defaultToolbarItems.filter(
        toolbarItem => {
          let list = [
            "line",
            "ink",
            "annotate",
            "highlighter",
            "text-highlighter",
            "ink-eraser",
            "ink-signature",
            "image",
            "stamp",
            "note",
            "text",
            "arrow",
            "rectangle",
            "ellipse",
            "document-editor",
            "polygon",
            "polyline",

          ]

          let idx = list.indexOf(toolbarItem.type)
          if (idx > -1 ) {
            return false;
          } else {
            return true;
          }
        }
      ),
      licenseKey: "HilxIul2OfvkFQJmXHNkAqz4i7UdmtbxQ4CqYirO7z3Y65iudWWhTKB4zIUFW8ahDOBLWN2CdRshosKuChDujZrwh90OTknxRy4f0_kl5kbtfGZR8EA5sDoy5eyIxrxN0qYesQt_HEkch11DxfsrSiBFVJVq3NwrzigZwrfNANlSR6XrNL47-pYsmVOU9_AF9AjcgXbyXqopemmnh-6fNOuCmG0U6DT9hevI7PQk1kJbwhtRjVNC9AxUO85wD429gcEPiDP5Bw_O-_DHaDPzhF-lDZimD2cJyToQYjeS0uR38S6O6VK_9-i8EoEAoqNDohovnYU3mfA2qwFr7TKudBAkXGZuNUg1cau_I474ILSe3dyZer_wCmLjR_-xHrOXYmf3M5FNEc0G7d7IU2lia1qAFZo-l6jgT4P5ZonqdcfSpdQ7LJekBZJ-3kJaav9H",
      // baseUrl: `static`,
    }).then((viewer) => {
      this.setState({ viewer })
    }).catch((error) => {
      console.log(error)
    });
  }

  unload() {
    PSPDFKit.unload(this._instance || this._container);
    this._instance = null;
  }

  componentWillUnmount() {
    this.unload();
  }


  componentDidMount() {
    if (typeof window !== undefined) {
      // var adobeDCView = new window.AdobeDC.View({clientId: "4cf176e7e8a04036a69a1a50982528b3", divId: "adobe-dc-view"});
      // adobeDCView.previewFile({
      //   content:{location: {url: require("../images/applied-proxy.pdf")}},
      //   metaData:{fileName: "Applied Materials 2020 Proxy", }
      // }, {showDownloadPDF: true, showZoom: true,
      //   showPrintPDF: true, embedMode: "SIZED_CONTAINER", });
    
    
        // window.onscroll = this.handleScroll.bind(this)
        // window.onresize = this.handleScroll.bind(this)
        // this.load();
        
        // PSPDFKit.load({
        //   container: ".proxy-target",
        //   pdf: "../images/applied-proxy.pdf",
        //   licenseKey: "TRIAL-O-O9w8BsdBgfEckZ-LjR4yrYHBnUzqJbdyKOmTxXSN3RuehRI-yxro_hASjCSmJnrmkBmE5sUR7CgNEuS3ehdMMxzxGxjc9ceyPx_ljydQc",
        //   // baseUrl: "/"

        // }).then(function(instance) {
        //   console.log("PSPDFKit loaded", instance);
        // })
        // .catch(function(error) {
        //   console.error(error.message);
        // });;
    }

  }

  // componentWillUnmount() {
    // window.removeEventListener("scroll", this.handleScroll)
    // window.removeEventListener("resize", this.handleScroll)
  // }

  // handleScroll(event) {
  //   let height = 150;
  //   let myDocuments = document.querySelectorAll(".my-documents")[0];

  //   if (myDocuments) {
  //     height += myDocuments.scrollHeight
  //   }

  //   let myBreadcrumbs = document.querySelectorAll(".my-breadcrumbs")[0];

  //   if (myBreadcrumbs) {
  //     height += myBreadcrumbs.scrollHeight
  //   }
    

  //   this.setState({
  //     top:  height - event.currentTarget.scrollY ,
  //   })
  // }

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

  jumpToPage ( num ) {
    this.state.viewer.setViewState(viewState =>
      viewState
        .set("currentPageIndex", num)
    );
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


            {/* <div
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
            </div> */}
            
            {/* <div
        ref={this.onRef}
        style={{ width: "100%", height: "100vh", marginBottom: 80, borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc"}}
      ></div> */}

      <Proxy parent={ this } />



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


const Proxy = function ( props ) {
  const containerRef = useRef(null);

  useEffect(() => {
    let PSPDFKit;

    import("pspdfkit/dist/pspdfkit").then(({ default: _PSPDFKit }) => {
      PSPDFKit = _PSPDFKit;
      return PSPDFKit.load({
        licenseKey: "HilxIul2OfvkFQJmXHNkAqz4i7UdmtbxQ4CqYirO7z3Y65iudWWhTKB4zIUFW8ahDOBLWN2CdRshosKuChDujZrwh90OTknxRy4f0_kl5kbtfGZR8EA5sDoy5eyIxrxN0qYesQt_HEkch11DxfsrSiBFVJVq3NwrzigZwrfNANlSR6XrNL47-pYsmVOU9_AF9AjcgXbyXqopemmnh-6fNOuCmG0U6DT9hevI7PQk1kJbwhtRjVNC9AxUO85wD429gcEPiDP5Bw_O-_DHaDPzhF-lDZimD2cJyToQYjeS0uR38S6O6VK_9-i8EoEAoqNDohovnYU3mfA2qwFr7TKudBAkXGZuNUg1cau_I474ILSe3dyZer_wCmLjR_-xHrOXYmf3M5FNEc0G7d7IU2lia1qAFZo-l6jgT4P5ZonqdcfSpdQ7LJekBZJ-3kJaav9H",
        toolbarItems: PSPDFKit.defaultToolbarItems.filter(
          toolbarItem => {
            let list = [
              "line",
              "ink",
              "annotate",
              "highlighter",
              "text-highlighter",
              "ink-eraser",
              "ink-signature",
              "image",
              "stamp",
              "note",
              "text",
              "arrow",
              "rectangle",
              "ellipse",
              "document-editor",
              "polygon",
              "polyline",
  
            ]
  
            let idx = list.indexOf(toolbarItem.type)
            if (idx > -1 ) {
              return false;
            } else {
              return true;
            }
          }
        ),
        container: ".my-viewer-target",
        pdf: require('../images/applied-proxy.pdf')
      }).then( (viewer) => {
        props.parent.setState({ viewer })
      });
    });

    return () => {
      PSPDFKit && PSPDFKit.unload(containerRef.current);
    };
  }, []);
  return (
      <div ref={containerRef} className="my-viewer-target" style={{ height: "100vh", width: "100%", marginBottom: 48, borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc"}} />
    
  );
}