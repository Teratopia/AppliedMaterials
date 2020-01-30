import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import theme from "../theme.js";

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

  render() {
    return (
      <Layout>
        <SEO title="Summary" />
        <Styles>
          <Page>
          <Container>
            <div className="my-breadcrumbs" style={{marginBottom: "30px"}}>
              <span>
              <Link to="/">Home</Link> / <span style={{color: theme.blue}}>2020 Proxy Summary</span>
              </span>
            </div>

            <iframe src={require("../images/proxy-summary.pdf")} />
          </Container>
          </Page>
        </Styles>
      </Layout>
    )
  }
}

