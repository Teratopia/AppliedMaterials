import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import Worker from "../../vendor/pdfviewer/Worker"
import Viewer from "../../vendor/pdfviewer/Viewer"
import theme from "../theme.js";
// import { defaultLayout } from '../../vendor/pdfviewer';




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
      background: #E5E5E5;
      font-size: 12px;
      width: 100%;

      &:hover {
        background: #469AC2;
        color: white;
      }
          

      &.active {
        background: #469AC2;
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
  constructor( props ) {
    super()
    this.state = {}
    this.state.current = "TABLE OF CONTENTS"
    this.state.active = {name: "TABLE OF CONTENTS"}
    this.state.materials =  props.data.materials.frontmatter.documents;
  }


  toggleActive ( e) {
    document.querySelectorAll(".my-menu-item.active")[0].classList.toggle("active");
    e.currentTarget.classList.toggle("active")

    this.setState({
      current: e.currentTarget.dataset.current
    })
  }

  menuItem ( el, idx ) {
    let active;
    if ( idx == 0 ) {
      active= "active"
      
    }

    return (
      <div className={"my-menu-item " + active} key={ el.title }  data-current={el.title} onClick={ this.toggleActive.bind(this) }>
        <div className="cell">
        {
          el.title
        }
        </div>


      </div>
    )

  }


  render() {

    // const layout = ( isSidebarOpened, main, RenderToolbar,sidebar) => {
    //   return React.createElement(  defaultLayout(
    //     isSidebarOpened,
    //     main,
    //     sidebar,
    // ))
     
  // };
 
    return (
      <Layout>
        <SEO title="" />
        <Styles>
          <Page>
          <Container>
            <div className="my-breadcrumbs" style={{marginBottom: "30px"}}>
              <span>
              <Link to="/">Home</Link> / <Link to="proxy">2020 Proxy Statement</Link> / <span style={{color: theme.blue}}>{this.state.current}</span>
              </span>
            </div>

            <div className="my-documents">
              {
                this.state.materials.map( this.menuItem.bind(this ) )
              }
            </div>

          

            
          </Container>


          <div className="my-target" style={{position: "relative", }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.2.228/build/pdf.worker.min.js">
          <div style={{ height: '100vh', overflowY: "scroll", position: "relative", marginBottom: 100 }}>
          <div style={{position: "relative"}}>
            <Viewer fileUrl={ require("../images/applied-proxy.pdf")}  />
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
