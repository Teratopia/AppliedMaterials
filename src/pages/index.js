import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Container from "../components/container"
import AppliedLogo from "../images/applied-materials.png"
import Page from "../components/page"
import styled from "@emotion/styled"
import ReactMarkdown from "react-markdown"
import { graphql, Link } from "gatsby"
import theme from "../theme.js"
import BackgroundImage from "gatsby-background-image"

const Styles = styled.div`
  .my-hero-grid {
    display: grid;
    grid-template-columns: calc(50% - 10px) calc(50% - 10px);
    @media screen and (max-width: 1048px) {
      grid-template-columns: 100%;
    }

    grid-gap: 20px;

    .hero-section {
      
      @media screen and (min-width: ${theme.breakpoints.mid}px) {
        border: 1px solid ${theme.blue};
        padding: 10px;
      }

      .my-background {
        color: white;
        text-align: center;
        padding-top: 34px;

        @media screen and (min-width: 1048px) {
          padding-top: 88px; 
        }

        .my-title {
          font-size: 30px;

          @media screen and (min-width: 1048px) {
            padding: 14px;
            font-size: 35px; 
            margin-bottom: 44px;
          }
        }

        .my-proxy-button {
          margin-top: 24px;
          border: 2px solid white;
          display: inline-block;
          padding: 12px 18px;

          
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

        .gatsby-image-wrapper {
          height: 150px;
        }
      }
    }
  }

  .meeting-highlights {
    background: #e5e5e5;
    text-align: center;
    font-size: 42px;
    padding: 40px 0px;
    padding-bottom: 0px;
    margin: 24px 0px;

    .my-runner {
      background: ${theme.orange};
      height: 20px;
      margin-top: 24px;
    }
  }

  .my-info-grid {
    margin: 24px 0px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));

    .mini-grid {
      display: grid;
      max-width: 350px;
      margin: 0 auto;
      font-size: 18px;
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
        width: 250px;
        display: block;
        margin: 0 auto;
        margin-top: 44px;
      }

      .button {
        width: 100%;
        height: calc(100% - 40px);
        border-radius: 0px;
        margin: 20px 0px;
        margin-top: 8px;
        background: ${theme.orange};
        transition: all ${theme.transition}s ease;
        min-height: 58px;

        &:hover {
          background: #e48047cc;
        }
      }
    }
  }

  .my-voting-matters-grid {
    display: grid;
    grid-template-columns: 106px 107px 106px;

    @media screen and (min-width: 368px) {
      grid-template-columns: 140px calc(100% - 280px) 140px;
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
    padding: 40px 20px;

    @media screen and (min-width: 540px) {
      padding: 40px;
    }

    @media screen and (min-width: 780px) {
      padding: 40px 100px;
    }
  }

  .proxy-statement {
    background: ${theme.orange};
    color: white;
    text-align: center;
    padding: 40px;
  }

  .proxy-statement-button {
    border: 2px solid white;
    padding: 16px 34px;
    display: inline-block;

    &:hover {
      background: white;
      color: ${ theme.orange };
      cursor: pointer;
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

  componentDidMount() {
    if (typeof window !== undefined) {
      window.onscroll = this.updateRunner.bind(this)
    }
  }

  updateRunner(e) {
    this.setState({
      runnerWidth: (window.scrollY / window.innerHeight) * 100,
    })
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
    const appliedMaterials = this.props.data.appliedMaterials.childImageSharp
      .fixed
    const members = this.props.data.members.frontmatter.members
    const locationIcon = this.props.data.locationIcon.childImageSharp.fluid
    const calendarIcon = this.props.data.calendarIcon.childImageSharp.fluid
    const blueCheck = this.props.data.blueCheck.childImageSharp.fluid
    const redCross = this.props.data.redCross.childImageSharp.fluid
    const esg = this.props.data.esg.childImageSharp.fluid
    const recommendations = this.props.data.recommendations.childImageSharp.fluid

    return (
      <Layout>
        <SEO title="Home" />

        <Styles>
          <Page>
            <Container>
              <div className="my-hero-grid">
                <div className="hero-section">
                  <BackgroundImage
                    fluid={world}
                    style={{ height: "100%", minHeight: 340 }}
                    className="my-background"
                  >

                      <div className="my-title">
                        <div>
                        Notice of 
                        </div>
                        <div>
                        2020 Annual Meeting
                        </div>
                        <div>
                        of Shareholders 
                        </div>
                        <div>
                        and Proxy Statement
                        </div>
                      </div>

                      <div className="my-proxy-button">
                        VIEW INTERACTIVE PROXY
                      </div>
                  </BackgroundImage>
                </div>

                <Link to="/board">
                <div className="hero-section my-board-grid">
                  {members.map(this.member.bind(this))}
                  <div>
                    <img
                      src={AppliedLogo}
                      style={{ width: "100%", marginTop: 34 }}
                      alt="Applied Materials"
                    />
                    <div className="my-meta">BOARD OF DIRECTORS</div>
                  </div>
                </div>
                </Link>
              </div>
            </Container>

            <div className="meeting-highlights">
              2020 Meeting Highlights
              <div
                className="my-runner"
                style={{
                  width: this.state.runnerWidth + "%",
                  maxWidth: "100%",
                }}
              ></div>
            </div>

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
                  <div className="button is-danger">VOTE</div>
                </div>
              </div>
            </Container>

            <div style={{padding: "40px 0px"}}>
                <div className="title has-text-centered">
                  Voting Matters & Board Recommendations
                </div>

                <div className="my-header-row">
                  <Container >
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered" style={{paddingTop: 14}}>
                      PROPOSAL
                    </div>

                    <div style={{paddingTop: 14}}>
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
                    <div className="has-text-centered">
                      1
                    </div>

                    <div>
                      Electing Directors
                    </div>

                    <div className="has-text-centered">
                      <Img fluid={ blueCheck } alt="Blue Check" style={{width: 32, display: "block", margin: "0 auto"}} />
                    </div>
                  </div>
                  </Container>
                </div>

                <div className="my-normal-row">
                  <Container>
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered">
                      2
                    </div>

                    <div>
                      Executive Compensation
                    </div>

                    <div className="has-text-centered">
                      <Img fluid={ blueCheck } alt="Blue Check" style={{width: 32, display: "block", margin: "0 auto"}} />
                    </div>
                  </div>
                  </Container>
                </div>

                <div className="my-normal-row">
                  <Container>
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered">
                      3
                    </div>

                    <div>
                      Ratification of Registered Accounting Firm
                    </div>

                    <div className="has-text-centered">
                      <Img fluid={ blueCheck } alt="Blue Check" style={{width: 32, display: "block", margin: "0 auto"}} />
                    </div>
                  </div>
                  </Container>

                </div>

                <div className="my-normal-row">
                  <Container>
                  <div className="my-voting-matters-grid">
                    <div className="has-text-centered">
                      4
                    </div>

                    <div>
                      Shareholder Proposal to Provide for Right to Act by Written Consent
                    </div>

                    <div className="has-text-centered">
                      <Img fluid={ redCross } alt="Red Cross" style={{width: 32, display: "block", margin: "0 auto"}} />
                    </div>
                  </div>
                  </Container>
                </div>
                
                </div>

                <hr style={{background: "#469AC2"}}>
                </hr>

                <div style={{padding: "40px 0px"}}>
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

                <hr style={{background: "#469AC2"}}>
                </hr>

                <div className="my-recommendations">
                  <Img fluid={recommendations} alt="Our Recommendations"/>
                </div>

                <div className="proxy-statement">
                  <div className="title" style={{color: "white", background: theme.orange}}>
                    2020 Proxy Statement
                  </div>

                  <div className="proxy-statement-button">
                    DOWNLOAD PDF
                  </div>
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
                          08.22.19 <a>Applied Materials to Participate in Citi Global...</a>
                        </div>
                      </div>

                      <div>
                        <div className="my-have-you-heard-title">
                          JOIN US AT
                        </div>

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
                        <div className="my-have-you-heard-title">
                          DID YOU KNOW?
                        </div>

                        <div className="my-have-you-heard-row">
                          10.04.19 <a>Designing "Eyes" into Process Equipment to...</a>
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

    calendarIcon: file(relativePath: { eq: "calendar-icon.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    locationIcon: file(relativePath: { eq: "location-icon.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    blueCheck: file(relativePath: { eq: "blue-check.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    redCross: file(relativePath: { eq: "red-cross.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    esg: file(relativePath: { eq: "esg.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    recommendations: file(relativePath: { eq: "recommendations.png" }) {
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
