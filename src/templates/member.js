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
import { navigate } from "@reach/router"

const Styles = styled.div`
  .my-header-grid {
    display: grid;
    grid-template-columns: calc(100% - 100px) 100px; 
  }
  .my-grid {
    display: grid;
    grid-template-columns: 320px calc(100% - 320px);

    @media screen and (max-width: 700px) {
      grid-template-columns: 220px calc(100% - 220px); 
      grid-gap: 14px;
    }

    @media screen and (max-width: 520px) {
      grid-template-columns: 100% ; 
    }
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
      background: #77777777; 
    }
  }
`

export default class extends React.Component {
  constructor( props ) {
    super()
    this.state = {}
    this.state.member = props.pageContext.node;
    this.state.idx = props.pageContext.idx;
    this.state.members = props.pageContext.members;
  }

  navigateRight ( ) {
    let myNew = (this.state.idx + 1) % this.state.members.length;
     navigate( this.state.members[myNew].slug );
  }

  navigateLeft ( ) {
    let myNew = (this.state.idx - 1) % this.state.members.length;

    if (myNew < 0 ) {
      myNew = this.state.members.length - 1
    }


     navigate( this.state.members[myNew].slug );
  }

  render() {
    return (
      <Layout>
        <SEO title="" />
        <Styles>
          <Page>
          <Container>
            <div style={{marginBottom: "30px"}}>
              <div className="my-header-grid">
              <span>
              <Link to="/">Home</Link> / <Link to="board">Board of Directors</Link> / <span style={{color: theme.blue}}>{this.state.member.name}</span>
              </span>

              <span style={{textAlign: "right", paddingTop: 6}}>
                <span className="my-icon"  onClick={ this.navigateLeft.bind(this) }>
                  <Icon type="left" />
                </span>

                <span className="my-icon" onClick={ this.navigateRight.bind(this) }>
                  <Icon type="right" />
                </span>
              </span>

              </div>
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


