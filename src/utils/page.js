import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Container from "../components/container"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"

const Styles = styled.div``

export default class extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Layout>
        <SEO title="" />
        <Styles>
          <Page>
          <Container>
            <div className="title">Page</div>
          </Container>
          </Page>
        </Styles>
      </Layout>
    )
  }
}


