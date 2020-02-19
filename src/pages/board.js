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
    grid-gap: 56px;
    padding: 0px 20px;

    @media screen and (min-width: 900px){
      padding-left: 0px;
    }
    max-width: 965px;
    margin: 0 auto;

  

    .my-title {
      font-size: 1.5rem;
      margin-bottom: 24px;
      color: ${theme.blue};
    }

    .title.is-5 {
      font-size: 1.25rem;
      margin-bottom: 12px;
      font-weight: 500;
    }

    @media screen and (max-width: 900px) {
      grid-template-columns: calc(100%);

      .gatsby-image-wrapper {
        margin: 10px auto;
        max-width: 400px;
      }

      .my-title, .title, .subtitle {
        text-align: center;
      }
    }

    .my-grid-item {
      width: 100%;
      display: block;
      margin: 0 auto;
    }
  }

  .members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    grid-gap: 16px;
    max-width: 880px;
    margin: 0 auto;
    margin: 24px auto;

    @media screen and (min-width: 720px) {
      grid-template-columns: repeat(auto-fit, minmax(192px, 1fr));
      grid-gap: 46px;
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
          font-size: 13px;
        }

        .my-board-title {
          font-size: 16px;
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

  .my-bracket {
    margin-bottom: 36px;

    @media screen and (min-width: 900px){
      .gatsby-image-wrapper {

        position: relative;
        right: 8px  
      }
    }
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

  boardComittees(boards) {
    if (boards) {
      return boards.map(el => {
        return <li>{el.title}</li>
      })
    } else {
      return <li>None </li>
    }
  }

  type(type) {
    if (type) {
      return <li>{type}</li>
    }
  }

  memberItem( el, idx ) {
    if (el.name == "Thomas J. Iannotti"){
      el.type = "Independent Director";
    }
    return (
      <Link to={"/board/" + el.slug}>
        <div className="my-board-member" key={el.name}>
          <Img fluid={el.image.childImageSharp.fluid} alt={el.name} />
          <div className="my-title">{el.name}</div>

          <div className="my-content">
            <div className="my-board-title">{el.title}</div>

            <div className="content">
                <ul>
                  <li>{el.since}</li>
                  <li>Age {el.age}</li>
                  {this.type(el.type)}
                </ul>
            </div>

            <b>Committees:</b>
            <div className="content">
                <ul>{this.boardComittees(el.summaryComittees)}</ul>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  render() {
    const members = this.props.data.members.frontmatter.members
    const expertise = this.props.data.expertise.childImageSharp
      .fluid
    const independence = this.props.data.independence.childImageSharp.fluid
    const tenure = this.props.data.tenure.childImageSharp.fluid
    const diversity = this.props.data.diversity.childImageSharp.fluid
    return (
      <Layout>
        <SEO title="Board" />
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
                style={{ margin: "48px 0px", padding: "0px 55px" }}
              >
                Our Board Represents a Diverse Range of Qualifications & Skills
              </div>

              <div className="my-board-stat-grid">
                <div className="my-grid-item">
                  <div className="my-title">Director Nominee Expertise</div>
                  <Img
                    fluid={expertise}
                    alt="Nominee Expertise"
                    
                  />
                </div>

                <div className="my-grid-item">
                  <div className="my-title">Key Attributes</div>

                  <div className="my-bracket">
                  <Img
                    fluid={independence}
                    alt="Independence"
                  />
                  </div>

                  <div className="my-bracket">
                    
                    <Img
                      fluid={diversity}
                      className="my-small-bump"
                      alt="Diversity"
                      style={{
                        width: "100%",
                        marginBottom: 24,
                      }}
                    />


                  </div>

                  <div className="my-bracket">

                  <Img
                      fluid={tenure}
                      className="my-small-bump"
                      alt="Tenure"
                      style={{
                        width: "100%",
                        marginBottom: 24,
                      }}
                    />

                  </div>
                </div>
              </div>

              <div style={{background: theme.blue, height: 1, maxWidth: 940, margin: "40px auto", marginBottom: 80}}>

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
    expertise: file(relativePath: { eq: "expertise.png" }) {
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
          summaryComittees {
            title
          }
          otherBoards {
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
