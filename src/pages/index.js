import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Container from "../components/container"
import AppliedLogo from "../images/applied-materials.png"
import Page from "../components/page"
import styled from "@emotion/styled"
import ReactMarkdown from "react-markdown"
import { graphql } from "gatsby"
import theme from "../theme.js";
import BackgroundImage from "gatsby-background-image";

const Styles = styled.div`

  .my-hero-grid {
    display: grid;
    grid-template-columns: calc(50% - 10px) calc(50% - 10px);
    @media screen and (max-width: 1048px) {
      grid-template-columns: 100%;
    }
    
    grid-gap: 20px;

    .hero-section {
      border: 1px solid ${theme.blue};
      padding: 10px;

      .gatsby-background-image:before {
        opacity: 0.7;
      }

      &.my-board-grid {
        display: grid;
        grid-template-columns: calc(33% - 5px) calc(33% - 5px) calc(33% - 5px);

        @media screen and (max-width: 1048px) {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }

        grid-template-rows: 150px;
        grid-gap: 10px;
        
        .my-meta {
          text-align: center;
          color: grey;
          margin-top: 12px;
          font-size: 15px;
        }

        .my-member {
          position: relative;
          height: 150px;
          color: white;
        }
        .background-name {
          background: #222;
          position: absolute;
          height: 100%;
          width: 100%;
          text-align: center;
          padding: 0px 36px;
          padding-top: 48px;
        }

        .gatsby-image-wrapper {
          height: 150px;
          transition: all 0.2s ease;
          cursor: pointer;

          &:hover {
            opacity: 0.2;
          }
        }
      }
    }
  }

`

export default class extends React.Component {
  

  member ( el ) {
    return (
      <div className="my-member">
        <div className="background-name">
          { el.name }
        </div>
        <Img fluid={ el.image.childImageSharp.fluid } alt={ el.name } />
      </div>
    )
  }

  render() {
    const world = this.props.data.heroBackground.childImageSharp.fluid;
    const appliedMaterials = this.props.data.appliedMaterials.childImageSharp.fixed;
    const members = this.props.data.members.frontmatter.members;
    
    return (
      <Layout>
        <SEO title="Home" />

        <Styles>
          <Page>
            <Container>
              <div className="my-hero-grid">
                <div className="hero-section">
                  <BackgroundImage
                  fluid={ world }
                  style={{height: "100%", }}
                  >

                  </BackgroundImage>
                </div>

                <div className="hero-section my-board-grid">
                  {members.map( this.member.bind(this) )}
                  <div>
                  <img src={ AppliedLogo } style={{width: "100%", marginTop: 34}} alt="Applied Materials" />
                  <div className="my-meta">
                    BOARD OF DIRECTORS
                  </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="my-grid">
                
              </div>


       
           
            </Container>
          </Page>
        </Styles>
      </Layout>
    )
  }
}

export const query = graphql`
  {
    heroBackground: file(relativePath: { eq: "world.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    appliedMaterials: file(relativePath: { eq: "applied-logo.jpg" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }

    members: markdownRemark(frontmatter: { title: { eq: "board" } }) {
      frontmatter {
        members {
          name
          title
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
