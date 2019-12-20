import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Container from "../components/container"
import AppliedLogo from "../images/applied-materials.png"
import Page from "../components/page"
import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import theme from "../theme.js"
import BackgroundImage from "gatsby-background-image"

const Styles = styled.div`
  .my-hero-grid {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 24px;

    @media screen and (min-width: 848px) {
      grid-template-columns: calc(50% - 12px) calc(50% - 12px);
    }

    .hero-section {
      border: 2px solid #4499c3;
      padding: 11px 12px;
      padding-bottom: 13px;
      max-width: 600px;
      display: block;
      margin: 0 auto;
      width: 100%;

      &.is-board {
        padding: 9px 11px;
      }

      .my-background {
        color: white;
        text-align: center;
        padding: 24px;

        @media screen and (min-width: 848px) {
          padding-top: 94px;
        }

        .my-title {
          font-size: 28px;

          @media screen and (min-width: 848px) {
            font-size: 32px;
            margin-bottom: 44px;
          }
        }

        .my-proxy-button {
          margin: 24px 0px;
          border: 2px solid white;
          display: inline-block;
          padding: 12px 18px;
          background: none;

          @media screen and (min-width: ${theme.breakpoints.mind}px) {
            padding: 12px 78px;
            font-size: 22px;
          }

          &:hover {
            background: #fff;
            color: black;
            cursor: pointer;
          }

          @media screen and (min-width: 1048px) {
            padding: 14px 42px;
            font-size: 20px;
          }
        }
      }

      .gatsby-background-image:before {
        opacity: 0.8;
        
      }
      }
    }
  }

  .meeting-highlights {
    background: #e5e5e5;
    text-align: center;
    font-size: 32px;

    @media screen and (min-width: 740px) {
      font-size: 36px;
    }

    padding: 30px 0px;
    margin: 24px 0px;
    margin-bottom: 0px;
  }

  .my-runner {
    background: ${theme.orange};
    width: 0%;
    height: 16px;
    margin-bottom: 12px;

    @media screen and (min-width: 800px) {
      width: 75%;
    }
  }

  .my-info-grid {
    margin: 24px auto;
    display: grid;
    max-width: 880px;
    grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));

    .mini-grid {
      display: grid;
      max-width: 350px;
      margin: 0 auto;
      font-size: 17px;
      grid-template-columns: 80px calc(100% - 80px);

      @media screen and (max-width: 1048px) {
        grid-template-columns: 100%;
        font-size: 22px;

        .gatsby-image-wrapper {
          display: block;
          max-width: 50px;
          margin: 12px auto;
          margin-bottom: 8px;
        }
      }

      .my-icon {
        padding: 14px;
      }

      .my-text {
        padding-left: 8px;

        &.special {
          padding-top: 8px;
          font-size: 22px;
        }

        @media screen and (max-width: 1048px) {
          text-align: center;
          padding-left: 0px;

          &.special {
            padding-top: 0px;
            font-size: inherit;
          }
        }
      }
    }

    @media screen and (max-width: 1048px) {
      max-width: 400px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));

      .info-grid-section {
        margin: 12px 0px;
      }
    }

    .my-vote-button {
      text-align: right;
      padding-left: 120px;

      @media screen and (max-width: 1048px) {
        padding-left: 0px;
        display: block;
        margin: 0 auto;
        margin-top: 44px;
      }

      .button {
        font-size: 12px;
        padding: 5px 14px;
        font-size: 11px;
        height: auto;
        width: 90px;
        border-radius: 0px;
  
        background: ${theme.orange};
  
        &:hover {
          background: #e48047cc;
        }
  
        @media screen and (min-width: ${theme.breakpoints.min}px) {
          padding: 14px;
          width: 140px;
          font-size: 16px;
        }
      }
    }
  }

  .my-voting-matters-grid {
    display: grid;
    grid-template-columns: calc(100%);
    text-align: center;
    grid-gap: 6px;

    .my-description {
      margin: 8px 0px;

      @media screen and (min-width: 448px) {
        margin: 0px;
      }
    }

    @media screen and (min-width: 448px) {
      grid-template-columns: 140px calc(100% - 280px) 140px;
      text-align: left;

      .special-header {
        display: flex;
        align-items: center;

        &.really-special {
          justify-content: center;
        }
      }
    }

    @media screen and (min-width: 768px) {
      grid-template-columns: 140px calc(100% - 340px) 200px;
    }
  }

  .my-header-row {
    padding: 6px;
    background: #f2f2f2;
    font-size: 12px;
    font-weight: bold;
  }

  .my-normal-row {
    padding: 6px;
    padding-top: 14px;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
  }

  .my-recommendations {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 64px;
    max-width: 840px;
    margin: 0 auto;
    padding: 60px 100px;
    margin-bottom: 24px;

    @media screen and (max-width: 740px) {
      padding: 40px 60px;
    }
  }

  .proxy-statement {
    background: ${theme.orange};
    color: white;
    text-align: center;
    padding: 18px;

    @media screen and (min-width: 948px) {
      .title {
        position: relative;
        top: 12px;
      }
    }
  }

  .proxy-statement-button {
    border: 2px solid white;
    padding: 16px 34px;
    display: inline-block;

    &:hover {
      background: white;
      color: ${theme.orange};
      cursor: pointer;
    }

    @media screen and (min-width: 948px) {
      float: right;
      position: relative;
      top: -62px;
    }
  }

  .have-you-heard {
    padding: 40px;

    .have-you-heard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
      text-align: center;

      & > div {
        margin-bottom: 24px;
      }

      @media screen and (min-width: 740px) {
        grid-template-columns: repeat(auto-fill, minmax(calc(33% - 24px), 1fr));
        grid-gap: 24px;
        text-align: left;

        & > div {
          margin-bottom: 8px;
        }
      }

      .my-have-you-heard-title {
        font-weight: bold;
        font-size: 18px;
      }

      .my-have-you-heard-row {
        font-size: 16px;
        margin: 12px 0px;
      }
    }
  }
`

export default class extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.state.runnerWidth = 0
  }

  member(el) {
    return (
      <div className="my-member">
        <Img fluid={el.image.childImageSharp.fluid} alt={el.name} />
      </div>
    )
  }

  render() {
    const world = this.props.data.heroBackground.childImageSharp.fluid
    const heroBoard = this.props.data.heroBoard.childImageSharp.fluid
    const members = this.props.data.members.frontmatter.members
    const locationIcon = this.props.data.locationIcon.childImageSharp.fluid
    const calendarIcon = this.props.data.calendarIcon.childImageSharp.fluid
    const blueCheck = this.props.data.blueCheck.childImageSharp.fluid
    const redCross = this.props.data.redCross.childImageSharp.fluid
    const esg = this.props.data.esg.childImageSharp.fluid
    const barrons = this.props.data.barrons.childImageSharp.fluid
    const computerWorld = this.props.data.computerWorld.childImageSharp.fluid
    const fortune = this.props.data.fortune.childImageSharp.fluid

    return (
      <Layout>
        <SEO title="Home" />

        <Styles>
          <Page>
            <Container style={{maxWidth: 980}}>
              <div className="my-hero-grid">
                <div className="hero-section special">
                  <BackgroundImage
                    fluid={world}
                    style={{ height: "100%" }}
                    className="my-background"
                  >
                    <div className="my-title">
                      <div>Notice of</div>
                      <div>2020 Annual Meeting</div>
                      <div>of Shareholders</div>
                      <div>and Proxy Statement</div>
                    </div>

                    <Link to="proxy" style={{ color: "white" }}>
                      <div className="my-proxy-button">
                        VIEW INTERACTIVE PROXY
                      </div>
                    </Link>
                  </BackgroundImage>
                </div>

                <Link to="/board">
                  <div className="hero-section is-board">
                    <Img fluid={heroBoard} alt="Board" />
                  </div>
                </Link>
              </div>
            </Container>

            <div className="meeting-highlights">
              <div style={{ padding: "0px 20px" }}>2020 Meeting Highlights</div>
            </div>
            <div className="my-runner"></div>

            <Container>
              <div className="my-info-grid">
                <div className="info-grid-section">
                  <div className="mini-grid">
                    <div className="my-icon">
                      <Img fluid={calendarIcon} alt="Calendar Icon" />
                    </div>

                    <div className="my-text special">
                      <div>March 7, 2020</div>

                      <div>11:00 am PST</div>
                    </div>
                  </div>
                </div>

                <div className="info-grid-section">
                  <div className="mini-grid">
                    <div className="my-icon">
                      <Img fluid={locationIcon} alt="Location Icon" />
                    </div>

                    <div className="my-text">
                      <div>Applied Materials, Inc</div>
                      <div>3050 Bowers Avenue, Building 1</div>
                      <div>Santa Clara, CA 95054</div>
                    </div>
                  </div>
                </div>

                <div className="info-grid-section my-vote-button">
                  <a
                    href="http://www.appliedmaterials.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="button is-danger">VOTE</div>
                  </a>
                </div>
              </div>
            </Container>

            <div style={{ padding: "40px 0px" }}>
              <Container>
              <div
                className="title has-text-centered"
                style={{ marginBottom: 48 }}
              >
                Voting Matters & Board Recommendations
              </div>

              <div className="my-header-row">
                <Container>
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered special-header really-special">
                      PROPOSAL
                    </div>

                    <div className="special-header my-description">
                      DESCRIPTION
                    </div>

                    <div className="has-text-centered">
                      BOARD VOTE RECOMMENDATION
                    </div>
                  </div>
                </Container>
              </div>

              <div className="my-normal-row">
                <Container>
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered">1</div>

                    <div className="my-description">Electing Directors</div>

                    <div className="has-text-centered">
                      <Img
                        fluid={blueCheck}
                        alt="Blue Check"
                        style={{
                          width: 32,
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                  </div>
                </Container>
              </div>

              <div className="my-normal-row">
                <Container>
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered">2</div>

                    <div className="my-description">Executive Compensation</div>

                    <div className="has-text-centered">
                      <Img
                        fluid={blueCheck}
                        alt="Blue Check"
                        style={{
                          width: 32,
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                  </div>
                </Container>
              </div>

              <div className="my-normal-row">
                <Container>
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered">3</div>

                    <div className="my-description">
                      Ratification of Registered Accounting Firm
                    </div>

                    <div className="has-text-centered">
                      <Img
                        fluid={blueCheck}
                        alt="Blue Check"
                        style={{
                          width: 32,
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                  </div>
                </Container>
              </div>

              <div className="my-normal-row">
                <Container>
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered">4</div>

                    <div>
                      Shareholder Proposal to Provide for Right to Act by
                      Written Consent
                    </div>

                    <div className="has-text-centered">
                      <Img
                        fluid={redCross}
                        alt="Red Cross"
                        style={{
                          width: 32,
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                  </div>
                </Container>
              </div>
              </Container>
            </div>

            <Container>
              <hr style={{ background: "#469AC2" }}></hr>
            </Container>

            <div style={{ padding: "40px 0px" }}>
              <Container>
                {/* <div className="title has-text-centered">
                    2020 ESG Highlights
                  </div> */}

                {/* <p className="has-text-centered" style={{padding: "0 20px"}}>
                    We were able to make measurable progress toward our ongoing goal of minimizing the environmental impact of our operations, even with a jump in revenue of more than 15%.  Here's how:

                    
                  </p> */}

                <Img fluid={esg} alt="2020 ESG Highlights" />
              </Container>
            </div>
            
            <Container>
            <hr style={{ background: "#469AC2" }}></hr>
            </Container>

            <div className="my-recommendations">
                <Img
                  fluid={fortune}
                  alt="Fotune World's Most Admired Companies"
                />
                <Img fluid={barrons} alt="Barron's 100 Most Sustainable" />
                <Img
                  fluid={computerWorld}
                  alt="Computer World Best Place To Live"
                />
            </div>

            <div className="proxy-statement">
              <Container>
                <div
                  className="title"
                  style={{ color: "white", background: theme.orange }}
                >
                  2020 Proxy Statement
                </div>

                <div className="proxy-statement-button">DOWNLOAD PDF</div>
              </Container>
            </div>

            <div className="have-you-heard">
              <Container>
                <div className="have-you-heard-grid">
                  <div>
                    <div className="my-have-you-heard-title">
                      HAVE YOU HEARD?
                    </div>

                    <div className="my-have-you-heard-row">
                      09.05.19 <a>Applied Materials Announces Cash Dividend</a>
                    </div>

                    <div className="my-have-you-heard-row">
                      08.22.19{" "}
                      <a>Applied Materials to Participate in Citi Global...</a>
                    </div>
                  </div>

                  <div>
                    <div className="my-have-you-heard-title">JOIN US AT</div>

                    <div className="my-have-you-heard-row">
                      10.16.19 <a>K2019</a>
                    </div>

                    <div className="my-have-you-heard-row">
                      08.22.19 <a>Specialty Films Mumbai - 2019</a>
                    </div>

                    <div className="my-have-you-heard-row">
                      07.09.19 <a>SEMICON West 2019</a>
                    </div>
                  </div>

                  <div>
                    <div className="my-have-you-heard-title">DID YOU KNOW?</div>

                    <div className="my-have-you-heard-row">
                      10.04.19{" "}
                      <a>Designing "Eyes" into Process Equipment to...</a>
                    </div>

                    <div className="my-have-you-heard-row">
                      09.12.19 <a>Themes of an AI Summer: VC Perspectives</a>
                    </div>

                    <div className="my-have-you-heard-row">
                      08.21.19 <a>The AI Paradox</a>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </Page>
        </Styles>
      </Layout>
    )
  }
}

export const query = graphql`
  {
    heroBackground: file(relativePath: { eq: "hero-background.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    heroBoard: file(relativePath: { eq: "hero-board.jpg" }) {
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

    calendarIcon: file(relativePath: { eq: "calendar-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    locationIcon: file(relativePath: { eq: "location-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    blueCheck: file(relativePath: { eq: "blue-check.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    redCross: file(relativePath: { eq: "red-cross.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    esg: file(relativePath: { eq: "esg.png" }) {
      childImageSharp {
        fluid(maxWidth: 1400) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    barrons: file(relativePath: { eq: "barrons.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    computerWorld: file(relativePath: { eq: "computer-world.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    fortune: file(relativePath: { eq: "fortune.png" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
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
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
