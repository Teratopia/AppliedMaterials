import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
// import MyViewer from "../components/viewer/myViewer"
// import Wijmo from "../components/wijmo"

import Dropdown from '../components/dropdown';

import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import Logo from "../images/applied-icon.png"
import Viewer, { Worker } from '../../vendor/react-pdf-viewer';
import '../../vendor/react-pdf-viewer.css';
import theme from "../theme.js"

// const PSPDFKit = typeof window !== undefined ? require("pspdfkit") : "div";

const Styles = styled.div`
  .my-documents {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(125px, 1fr));
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
      min-height: 34px;
      padding: 8px 12px;

      @media screen and (min-width: 606px) {
        min-height: 50px;
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
        line-height: 16px;

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

  iframe {
    width: 100%;
    height: 520px;
    margin-bottom: 24px;
  }


  .my-toolbar {
    @media screen and (min-width: 475px) {
      overflow-x: scroll;
    }    
  }

 
`
export default class extends React.Component {
  constructor(props, context) {
    super( props, context)
    this.state = {
      windowWidth : 0,
      windowHeight : 0,
      pdfViewerIsRendered : false,
    }
    this.state.current = ""
    this.state.active = { name: "" }
    this.state.materials = props.data.materials.frontmatter.documents
    this.state.currentPage = 3
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.watchForPdfViewHeightChange = this.watchForPdfViewHeightChange.bind(this);
    this.pdfTarget = React.createRef();
  }

  componentDidMount() {
  //     // var adobeDCView = new window.AdobeDC.View({clientId: "4cf176e7e8a04036a69a1a50982528b3", divId: "adobe-dc-view"});
  //     // adobeDCView.previewFile({
  //     //   content:{location: {url: require("../images/applied-proxy.pdf")}},
  //     //   metaData:{fileName: "Applied Materials 2020 Proxy", }
  //     // }, {showDownloadPDF: true, showZoom: true,
  //     //   showPrintPDF: true, embedMode: "SIZED_CONTAINER", });
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);
    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps, prevState){
    console.log('componentDidUpdate 1 prevState = ', prevState);
    console.log('componentDidUpdate 1 this.state = ', this.state);
    console.log('componentDidUpdate Viewer = ', Viewer);
    console.log('componentDidUpdate Worker = ', Worker);
    console.log('pdfTarget = ', this.pdfTarget);
    //console.log('pdfTarget.current = ', this.pdfTarget.current);

    if(prevState.pdfViewerIsRendered !== this.state.pdfViewerIsRendered 
      && this.state.pdfViewerIsRendered === true){
      var that = this;
      //setTimeout(()=>{that.jumpToPage(that.state.currentPage)}, 1000);
      console.log('componentDidUpdate 2');
      this.watchForPdfViewHeightChange(this.pdfTarget.current.clientHeight, 0, that);
      //this.jumpToPage(this.state.currentPage);
    }
  }

  watchForPdfViewHeightChange(baseHeight, count, that){
    console.log('watchForPdfViewHeightChange baseHeight = ',baseHeight);
    console.log('watchForPdfViewHeightChange count = ',count);
    if(this.pdfTarget && this.pdfTarget.current && this.pdfTarget.current.clientHeight !== baseHeight){
      console.log('watchForPdfViewHeightChange success this.pdfTarget.current.clientHeight = ',this.pdfTarget.current.clientHeight);
      that.jumpToPage(that.state.currentPage);
    } else if(count < 300) {
      setTimeout(()=>that.watchForPdfViewHeightChange(baseHeight, ++count, that), 10);
    } else {
      return false;
    }
  }

  updateWindowDimensions() {
    console.log('updateWindowDimensions');
    const width = window.innerWidth;
    let pdfPercent = 1.5;
    if(width < 1015){
      pdfPercent = width/650;
    }
    let newState = { 
      windowWidth: window.innerWidth, 
      windowHeight: window.innerHeight, 
      defaultPdfPercent : pdfPercent, 
      pdfViewerIsRendered : false
    }
    this.setState(newState);
    this.setState({
      pdfViewerIsRendered : true 
    });
    console.log('update window dimensions this.state.currentPage = ', this.state.currentPage);
    this.jumpToPage(parseInt(this.state.currentPage));
  }

  toggleActive(e) {
    console.log('toggleActive e = ', e);
    console.log('toggleActive e.currentTarget = ', e.currentTarget);
    console.log('toggleActive e.currentTarget.dataset = ', e.currentTarget.dataset);

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
    });

    console.log('e.currentTarget.dataset.page = ', e.currentTarget.dataset.page);
    console.log('toggleActive this = ', this);

    this.jumpToPage(parseInt(e.currentTarget.dataset.page));
  }

  jumpToPage ( num ) {
    console.log('BAR');
    console.log('BAR num = ', num);
    console.log('BAR this.state = ', this.state);
    console.log('BAR this.state.viewer = ', this.state.viewer);
    if(!this.state.viewer){
      return;
    }
    this.state.viewer.setViewState(viewState =>
      {
        viewState
        .set("currentPageIndex", num)
      }
      
    );
    this._jumpToPage( num )
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
    console.log('render this.state = ', this.state);
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
      console.log('layout main = ', main);
      console.log('layout sidebar = ', sidebar);
      //sidebar.children.props.currentPage = 5;
      if(this.state.pdfViewerIsRendered 
        && this.state.currentPage !== sidebar.children.props.currentPage 
        && sidebar.children.props.currentPage !== 0){
        console.log('layout sidebar if true sidebar.children.props.currentPage = ', sidebar.children.props.currentPage);
        this.setState({currentPage : sidebar.children.props.currentPage});
      }
      
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
            // overflowX: "scroll",
            // overflowY: "none",
            position: "relative",
            width: "100%",
            // position: "fixed",
            // top: 0,
            // top: this.state.top
          }}
        >
          <div
            className="my-toolbar"
            style={{
              alignItems: "center",
              backgroundColor: "#EEE",
              borderBottom: "1px solid rgba(0, 0, 0, .1)",
              display: "flex",
              gridArea: "toolbar",
              justifyContent: "center",
              padding: "4px",
              overflowX: "none",
              // overflowY: "none",
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
            {
              this.state.windowWidth < 1015 ? 
              <Dropdown 
                onSelect={e=>this.jumpToPage(parseInt(e.page))}
                default="JUMP TO A PAGE" 
                options={this.state.materials}
              />
              :
              <div className="my-documents">
                {this.state.materials.map(this.menuItem.bind(this))}
              </div>
            }
            
            </Container>

            <div style={{width : '100%'}}>
              <div style={{maxWidth : '1050px', margin: 'auto'}} ref={this.pdfTarget}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.2.228/build/pdf.worker.min.js">
                      { this.state.pdfViewerIsRendered ? 
                        <Viewer
                          layout={layout}
                          defaultScale={this.state.defaultPdfPercent}
                          parent={this}
                          fileUrl={require("../images/applied-proxy.pdf")}
                        />
                      : null }                  
                </Worker>
              </div>
            </div>
              

              <br></br>
              <br></br>
              <br></br>
            

      {/* <Proxy parent={ this } /> */}
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
              "pan-mode",
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
      <div ref={containerRef} className="my-viewer-target" style={{ height: "90vh", width: "100%", marginBottom: 48, borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc"}} />
  );
}