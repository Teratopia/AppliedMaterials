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

  render() {
    return (
      <Layout>
        <SEO title="Summary" />
        <Styles>
          <Page>
            <Container>
              <div className="my-breadcrumbs" style={{ marginBottom: "30px" }}>
                <span>
                  <Link to="/">Home</Link> /{" "}
                  <span style={{ color: theme.blue }}>2020 Proxy Summary</span>
                </span>
              </div>
            </Container>
            <div
              className="my-target"
              style={{ position: "relative", height: "110vh", top: this.state.top, display: "block" }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.2.228/build/pdf.worker.min.js">
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                    overflowY: "scroll",
                    position: "relative",
                    display: "block",
                  }}
                >
                  <Viewer
                    parent={this}
                    fileUrl={require("../images/proxy-summary.pdf")}
                  />
                </div>
              </Worker>
            </div>
          </Page>
        </Styles>
      </Layout>
    )
  }
}
