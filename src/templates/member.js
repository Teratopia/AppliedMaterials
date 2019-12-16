import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Container from "../components/container"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import { Icon } from "antd"
import theme from "../theme.js"

const Styles = styled.div`
  .my-grid {
    display: grid;
    grid-template-columns: 320px calc(100% - 320px);
    grid-gap: 24px;
  }

  .my-icon {
    padding: 6px;
    background: #777;
    margin-left: 5px;
    font-size: 24px;
    color: white;

    cursor: pointer;

    &:hover {
      background: #777777cc; 
    }
  }
`

export default class extends React.Component {
  constructor( props ) {
    super()
    this.state = {}
    this.state.member = props.pageContext.node;
  }

  render() {
    return (
      <Layout>
        <SEO title="" />
        <Styles>
          <Page>
          <Container>
            <div style={{marginBottom: "24px"}}>
              <span>
              <Link to="/">Home</Link> / <Link to="board">Board of Directors</Link> / <span style={{color: theme.blue}}>{this.state.member.name}</span>
              </span>

              <span style={{float: "right"}}>
                <span className="my-icon">
                  <Icon type="left" />
                </span>

                <span className="my-icon">
                  <Icon type="right" />
                </span>

              </span>
            </div>
            <div className="my-grid">
              <div>
                <Img fluid={ this.state.member.image.childImageSharp.fluid } alt={ this.state.member.name } />
              </div>

            <div>
              <div className="title" style={{color: theme.blue}}>
                { this.state.member.name }
                </div>
              <div className="subtitle" style={{marginBottom: 8}}>
                { this.state.member.title }
              </div>

              <div className="content">
                {
                  this.state.member.bio
                }
              </div>
              </div>
            </div>
            
            
          </Container>

          <hr style={{background: theme.teal}}></hr>
          </Page>
        </Styles>
      </Layout>
    )
  }
}


