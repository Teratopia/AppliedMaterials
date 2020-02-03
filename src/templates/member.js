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

    a {
      color: #777;

      &:hover {
        color: #77777777;
      }
    }
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

  .my-package {
    display: grid;
    grid-gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(212px, 1fr));
    margin-bottom: 48px;
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

  other () {
    if ( this.state.member.otherBoards ) {
      return (
        <div>
           <div className="title is-6">
                  <b>OTHER CURRENT PUBLIC BOARDS:</b>
                </div>

                <div className="content">
                  <ul>
                    {
                      this.state.member.otherBoards.map( (el) => {
                        return (
                          <li>
                            { el.title }
                          </li>
                        )
                      })
                    }
                  </ul>

                </div>
        </div>
      )
    }
  }

  board () {
    if ( this.state.member.boardComittees ) {
      return (
        <div>
           <div className="title is-6">
                  <b>BOARD COMMITTEES:</b>
                </div>

                <div className="content">
                  <ul>
                    {
                      this.state.member.boardComittees.map( (el) => {
                        return (
                          <li>
                            { el.title }
                          </li>
                        )
                      })
                    }
                  </ul>

                </div>
        </div>
      )
    }
  }

  render() {
    let memberType = this.state.member.type;
    
    if (this.state.member.name == "Thomas J. Iannotti"){
      memberType = memberType.split(", ").map( (el ) => {
        return (
          <div key={el}>
            {el}
          </div>
        )
      })
    }


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
              <div>
                Age: { this.state.member.age }
              </div>
              <div>
                { memberType }
              </div>
              <div style={{ marginBottom: 12}}>
                { this.state.member.since }
              </div>

              <div className="content">
                <small>
                {
                  this.state.member.bio
                }
                </small>
              </div>
              </div>
            </div>
            
            <hr style={{background: theme.teal, margin: "64px 0px"}}></hr>

            <div className="my-package">
              <div>
                <div className="title is-6">
                  <b>KEY QUALIFICATIONS AND EXPERTISE:</b>
                </div>

                <div className="content">
                  <ul>
                    {
                      this.state.member.keyQualifications.map( (el) => {
                        return (
                          <li >
                            { el.title }
                          </li>
                        )
                      })
                    }
                  </ul>

                </div>
                
              </div>
              <div>
                    {
                      this.board()
                    }
              </div>
              <div>
                {
                   this.other()
                }
             
              </div>

            </div>

            
          </Container>

          </Page>
        </Styles>
      </Layout>
    )
  }
}


