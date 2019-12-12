import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Container from "../components/container"
import Page from "../components/page"
import styled from "@emotion/styled"
import ReactMarkdown from "react-markdown"
import { graphql } from "gatsby"

const Styles = styled.div`
  .gatsby-image-wrapper {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    height: 200px;
    border-radius: 2px;
  }

  .my-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 24px;
  }
`

export default class extends React.Component {
  elementImage(el) {
    return (
      <div>
        <div>{el.title}</div>

        <Img fluid={el.image.childImageSharp.fluid} alt={el.title} />
      </div>
    )
  }

  render() {
    const image = this.props.data.astronaut.childImageSharp.fluid

    return (
      <Layout>
        <SEO title="About" />

        <Styles>
          <Page>
            <Container>
              <div className="my-grid">
                <Img fluid={image} alt="Astronaut 1" />
                <Img fluid={image} alt="Astronaut 2" />
                <Img fluid={image} alt="Astronaut 3" />
                <Img fluid={image} alt="Astronaut 4" />
              </div>

              <hr />

              <div className="my-grid">
                {/* {this.props.data.pageData.frontmatter.items.map(
                  this.elementImage
                )} */}
              </div>

              <hr />

              <div className="title">
                {this.props.data.pageData.frontmatter.title}
              </div>

              <ReactMarkdown
                source={this.props.data.pageData.rawMarkdownBody}
              />
            </Container>
          </Page>
        </Styles>
      </Layout>
    )
  }
}

export const query = graphql`
  {
    astronaut: file(relativePath: { eq: "gatsby-astronaut.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    pageData: markdownRemark(frontmatter: { title: { eq: "about" } }) {
      rawMarkdownBody
      frontmatter {
        title
        items {
          title
          
        }
      }
    }
  }
`
