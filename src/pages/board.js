import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image";
import Layout from "../components/layout"
import Container from "../components/container"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import theme from "../theme.js"

const Styles = styled.div`

  .my-board-stat-grid {
    display: grid;
    grid-template-columns: calc(50% - 24px) calc(50% - 24px);
    grid-gap: 24px;
    max-width: 880px;
    margin: 0 auto;
    margin-bottom: 42px;

    @media screen and (max-width: 700px) {
        grid-template-columns: calc(100%);

        .gatsby-image-wrapper {
          margin: 10px auto;
          max-width: 420px;
        }

        .title {
            text-align: center;
        }
    }
  }

  .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); 
      grid-gap: 12px;
      max-width: 880px;
      margin: 0 auto;
      margin: 24px auto;

      @media screen and (min-width: 720px) {
        grid-template-columns: repeat(auto-fit, minmax(212px, 1fr));        
        grid-gap: 32px;
      }
      

      .gatsby-image-wrapper {
          margin-bottom: 10px;
      }

      .my-board-member {
          .my-title {
              background: #f2f2f2;
              padding: 9px 13px;
              color: ${theme.teal};
          }

          .my-content {
            padding: 9px 13px;
            color: black; 

            .my-board-title {
                font-size: 14px;
                color: #777;
            }
          }
      }
  }

  .my-header-grid {
    a {
      color: #777;

      &:hover {
        color: #77777777;
      }
    }
  }
`

export default class extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  memberItem ( el, idx ) {
      return (
          <Link to={"/board/" + el.slug}>
          <div className="my-board-member" key={el.name}>
              <Img fluid={ el.image.childImageSharp.fluid } alt={ el.name } />
            <div className="my-title">
                {
                    el.name
                }
            </div>

            <div className="my-content">
                <div className="my-board-title">
                    {
                        el.title
                    }
                </div>
            </div>
          </div>
          </Link>
      )
  }

  render() {
    const members = this.props.data.members.frontmatter.members
    const nomineeExpertise = this.props.data.nomineeExpertise.childImageSharp.fluid
    const tenureAttributes = this.props.data.tenureAttributes.childImageSharp.fluid
    return (
      <Layout>
        <SEO title="" />
        <Styles>
          <Page>
            <Container>

            <div className="my-header-grid">
              <span>
              <Link to="/">Home</Link> / <Link to="board">Board of Directors</Link>
              </span>
              </div>
              <div
                className="title has-text-centered"
                style={{ margin: "48px 0px" }}
              >
                Our Board Represents a Diverse Range of Qualifications & Skills
              </div>

              <div className="my-board-stat-grid">
                <div style={{marginBottom: 12, padding: 12}}>
                  <div className="title is-5">DIRECTOR NOMINEE EXPERTISE</div>

                  <Img fluid={ nomineeExpertise } alt="Nominee Expertise" />
                </div>

                <div style={{padding: 12}}>
                  <div className="title is-5">TENURE & KEY ATTRIBUTES</div>
                  <Img fluid={ tenureAttributes } alt="Nominee Expertise" />
                </div>
              </div>

                <div className="members-grid">
              {
                  members.map( this.memberItem.bind(this) )
              }
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
  nomineeExpertise: file(relativePath: { eq: "nominee-expertise.png" }) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }

  tenureAttributes: file(relativePath: { eq: "tenure-attributes.png" }) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }

  members: markdownRemark(frontmatter: { title: { eq: "board" } }) {
    frontmatter {
      members {
        name
        title
        slug
        bio
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