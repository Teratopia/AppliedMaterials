import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Container from "../components/container"
import VerticalAlign from "../components/verticalAlign"
import Page from "../components/page"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import theme from "../theme.js"

const Styles = styled.div`
  .my-board-stat-grid {
    display: grid;
    grid-template-columns: calc(50% - 24px) calc(50% - 24px);
    grid-gap: 64px;
    max-width: 880px;
    margin: 0 auto;
    margin-bottom: 82px;

    @media screen and (max-width: 900px) {
      grid-template-columns: calc(100%);

      .gatsby-image-wrapper {
        margin: 10px auto;
        max-width: 420px;
      }

      .title {
        text-align: center;
      }
    }

    .my-grid-item {
      max-width: 440px;
      min-width: 380px;
      display: block;
      margin: 0 auto;
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
      grid-gap: 48px;
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
        color: #777;

        .content ul {
          margin-top: 8px;
        }

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

  .my-board-stat-mini-grid {
    display: grid;
    grid-template-columns: 34% 66%;
    grid-gap: 24px;
  }

  .content {
    margin-bottom: 8px;
  }
`

export default class extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  
  boardComittees ( boards ) {
    if ( boards ) {
      return (
        boards.map( (el) => {
          return (
            <li>
              { el.title }
            </li>
          )
        })
      )
    } else {
      return ( <li>None </li>)
    }
  }

  type ( type ) {
    if ( type ) {
      return ( <li>{ type }</li> )
    }
  }

  memberItem(el, idx) {
    return (
      <Link to={"/board/" + el.slug}>
        <div className="my-board-member" key={el.name}>
          <Img fluid={el.image.childImageSharp.fluid} alt={el.name} />
          <div className="my-title">{el.name}</div>

          <div className="my-content">
            <div className="my-board-title">{el.title}</div>

            <div className="content">
              <small>
                <ul>
                  <li>{ el.since }</li>
                  <li>Age { el.age }</li>
                  {
                    this.type( el.type )
                    
                  }
                </ul>
              </small>
            </div>

            <b>Board Committees:</b>
            <div className="content">
              <small>
                <ul>
                  {
                    this.boardComittees( el.boardComittees )
                  }
                </ul>
              </small>

            </div>
          </div>

          
        </div>
      </Link>
    )
  }

  render() {
    const members = this.props.data.members.frontmatter.members
    const nomineeExpertise = this.props.data.nomineeExpertise.childImageSharp
      .fluid
    const independence = this.props.data.independence.childImageSharp.fluid
    const tenure = this.props.data.tenure.childImageSharp.fluid
    const diversity = this.props.data.diversity.childImageSharp.fluid
    const expertise = this.props.data.expertise.childImageSharp.fluid
    return (
      <Layout>
        <SEO title="" />
        <Styles>
          <Page>
            <Container>
              <div className="my-header-grid">
                <span>
                  <Link to="/">Home</Link> /{" "}
                  <span style={{ color: theme.blue }}>Board of Directors</span>
                </span>
              </div>
              <div
                className="title has-text-centered"
                style={{ margin: "48px 0px" }}
              >
                Our Board Represents a Diverse Range of Qualifications & Skills
              </div>

              <div className="my-board-stat-grid">
                <div className="my-grid-item">
                  <div className="title is-5 has-text-centered">
                    <b>Expertise</b>
                  </div>
                  <Img
                    fluid={expertise}
                    alt="Nominee Expertise"
                    style={{ marginBottom: 24, marginTop: -6 }}
                  />
                </div>

                <div className="my-grid-item">
                  <VerticalAlign>
                  <div className="my-board-stat-mini-grid">
                    <Img
                      fluid={diversity}
                      alt="Diversity"
                      style={{
                        width: 144,
                        marginBottom: 24,
                        height: 144,
                      }}
                    />

                    <div>
                      <div
                        className="title is-5"
                        style={{ marginBottom: 10, marginTop: 10 }}
                      >
                        <b>Diversity</b>
                      </div>
                      <div>
                        <b style={{ color: "#459ac2" }}> 40% </b> of director
                        nominees are ethnically and/or gender diverse
                      </div>

                      <div className="content">
                        <small>
                          <ul style={{ marginTop: 8 }}>
                            <li>
                              <b>30%</b> are female
                            </li>

                            <li>
                              <b>20%</b> are ethically diverse
                            </li>
                          </ul>
                        </small>
                      </div>
                    </div>
                  </div>
                  </VerticalAlign>
                </div>

                <div className="my-grid-item">
                  <div className="title is-5 has-text-centered">
                    <b>Independence</b>
                  </div>
                  <Img
                    fluid={independence}
                    alt="Independence"
                    style={{ marginBottom: 24 }}
                  />
                  <div className="subtitle is-6 has-text-centered">
                    9 of 10 director nominees are independent
                  </div>
                </div>

                <div className="my-grid-item">
                  <div className="my-board-stat-mini-grid">

                  
                  <Img
                    fluid={tenure}
                    alt="Tenure"
                    style={{
                      width: 144,
                      marginBottom: 24,
                      height: 144,
                    }}
                  />

                  <div>
                    <div
                      className="title is-5"
                      style={{ marginBottom: 10, marginTop: 10 }}
                    >
                      <b>Tenure</b>
                    </div>
                    <div>
                      <b style={{ color: "#459ac2" }}> >10 Years Tenure :</b> 4
                      Directors
                    </div>

                    <div>
                      <b style={{ color: "#e48047" }}> 4-10 Years Tenure :</b> 3
                      Directors
                    </div>

                    <div>
                      <b> 0-4 Years Tenure :</b> 3 Directors
                    </div>

                    <small>
                      Two directors added to the board over the last 2 years
                    </small>
                  </div>
                </div>
                </div>
              </div>

              <div className="members-grid">
                {members.map(this.memberItem.bind(this))}
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

    independence: file(relativePath: { eq: "independence.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    expertise: file(relativePath: { eq: "sectors-updates.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    tenure: file(relativePath: { eq: "tenure.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    diversity: file(relativePath: { eq: "diversity.png" }) {
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
          type
          since
          age
          other {
            title 
          }
          boardComittees {
            title
          } 
          keyQualifications {
            title
          }
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
