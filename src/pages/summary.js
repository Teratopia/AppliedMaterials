import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import Viewer, { Worker } from '../../vendor/react-pdf-viewer';
import '../../vendor/react-pdf-viewer.css';

import theme from "../theme.js"

const Styles = styled.div`
  .my-breadcrumbs a {
    color: #777;

    &:hover {
      color: #77777777;
    }
  }

  iframe {
    width: 100%;
    height: 100vh;
    margin-bottom: 24px;
  }
`

export default class extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      // window.onscroll = this.handleScroll.bind(this)
    }
  }

  componentWillUnmount() {
    // window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll(event) {
    let height = 130;
    let myBreadcrumbs = document.querySelectorAll(".my-breadcrumbs")[0];

    if (myBreadcrumbs) {
      height += myBreadcrumbs.scrollHeight
    }
    
    this.setState({
      top:  height - event.currentTarget.scrollY ,
    })
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
            height: "90vh",
            overflow: "hidden",
            width: "100%",
            // position: "fixed",
            // top: 0,
            // top: this.state.top
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
              overflow: "scroll",
              // position: "fixed",              
              // width: "100%",
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
        <SEO title="Summary" />
        <Styles>
          <Page>
            <Container>
              <div className="my-breadcrumbs" style={{ marginBottom: "18px" }}>
                <span>
                  <Link to="/">Home</Link> /{" "}
                  <span style={{ color: theme.blue }}>2020 Proxy Summary</span>
                </span>
              </div>
            </Container>
            <div
              className="my-target"
              style={{ position: "relative", height: "90vh", marginBottom: 100  }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.2.228/build/pdf.worker.min.js">
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    overflowY: "scroll",
                    position: "relative",
                    display: "block",
                  }}
                >
                  <Viewer
                    parent={this}
                    layout={layout}
                    fileUrl={require("../images/proxy-summary.pdf")}
                  />
                </div>
              </Worker>
            </div>

            {/* <Proxy parent={ this } /> */}

            
          </Page>
        </Styles>
      </Layout>
    )
  }
}



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
              "pan-mode",
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
        pdf: require('../images/proxy-summary.pdf')
      }).then( (viewer) => {
        props.parent.setState({ viewer })
      });
    });

    return () => {
      PSPDFKit && PSPDFKit.unload(containerRef.current);
    };
  }, []);
  return (
      <div ref={containerRef} className="my-viewer-target" style={{ height: "520px", width: "100%", marginBottom: 100, borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc"}} />
  );
}