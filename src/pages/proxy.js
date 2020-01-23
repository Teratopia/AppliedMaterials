import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import theme from "../theme.js";

const pdfjsLib = require('pdfjs-dist');
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

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

  #canvas {
    height: 100%;
    width: 100%;
  }

  .my-breadcrumbs a {
    color: #777;

    &:hover {
      color: #77777777;
    }
  }

  
`

export default class extends React.Component {
  constructor( props ) {
    super()
    this.state = {}
    this.state.current = "SUMMARY"
    this.state.active = {name: "SUMMARY"}
    this.state.materials =  props.data.materials.frontmatter.documents;
  }

  componentDidMount () {
    // var loadingTask = pdfjsLib.getDocument(require("../images/pdf/sample.pdf"));
    // loadingTask.promise.then( this.loadingTaskHandler.bind(this) );
  }

  loadingTaskHandler ( pdf ) {
    pdf.getPage(2).then(function(page) {
      
      var scale = 10;
      var viewport = page.getViewport({scale: scale});
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
  
      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');
      });
    });
  
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
      <div className={"my-menu-item " + active} key={ el.title } data-current={el.title} onClick={ this.toggleActive.bind(this) }>
        <div className="cell">
        {
          el.title
        }
        </div>


      </div>
    )

  }

  render() {
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

            {/* <div>
              <canvas id="canvas"></canvas>
            </div> */}

            
          </Container>
          <iframe src="https://mozilla.github.io/pdf.js/web/viewer.html" style={{width: "100%", height: "100vh", marginBottom: 24}}>

            </iframe>
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
        }
      }
    }
  }
`
