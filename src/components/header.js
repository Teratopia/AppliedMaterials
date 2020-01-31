import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import styled from "@emotion/styled"
import Container from "./container"
import HamburgerMenu from "react-hamburger-menu"
import theme from "../theme"

const Styles = styled.div`
  position: fixed;
  background: #fff;
  box-shadow: 0px 0px 8px -2px grey;
  height: 64px;

  @media screen and (min-width: ${theme.breakpoints.mid}px) {
    height: 92px;
  }

  width: 100%;
  z-index: 1000;
  min-width: 240px;

  .my-box {
    display: grid;
    grid-template-columns: 90px calc(100% - 180px) 90px;

    @media screen and (min-width: ${theme.breakpoints.min}px) {
      grid-template-columns: 180px calc(100% - 360px) 180px;
    }
  }

  a {
    color: #0a0a0a;
  }

  .my-logo {
    width: 156px;

    margin: 0px auto;

    display: none;

    @media screen and (min-width: ${theme.breakpoints.mid}px) {
      display: block;
      margin-top: 4px;
      float: left;
    }
  }

  .my-icon {
    width: 43px;
    margin: 0 auto;
    display: block;

    @media screen and (min-width: ${theme.breakpoints.mid}px) {
      display: none;
      margin-top: 4px;
    }
  }

  .home-link {
    text-align: center;

    @media screen and (max-width: 700px) {
      text-align: left;
    }
  }

  .my-vote {
    text-align: right;

    .button {
      font-size: 12px;
      padding: 5px 14px;
      width: 90px;
      font-size: 11px;
      height: auto;
      


      border-radius: 0px;

      background: ${theme.orange};

      &:hover {
        background: #e48047cc;
      }

      @media screen and (min-width: ${theme.breakpoints.mid}px) {
        padding: 12px;
        width: 180px;
        font-size: 16px;
      }
    }
  }

  .links {
    display: none;

    @media screen and (min-width: ${theme.breakpoints.mid}px) {
      display: block;
      margin: auto auto;

      a {
        display: inline-block;
        margin: 5px 30px;
        font-size: 15px;

        &:hover {
          color: grey;
        }
      }

    }

    &.active {
      position: absolute;
      border-top: 1px solid grey;
      width: 100%;
      left: 0px;
      top: ${theme.header.low}px;

      @media screen and (min-width: ${theme.breakpoints.mid}px) {
        top: 92px;
      }

      text-align: center;
      background: #fff;
      box-shadow: 0px 8px 8px -8px grey;
      z-index: 999;
      display: block;
      font-size: 16px;

      a {
        display: block;
        padding: 16px;

        &:hover {
          background: #fafafa;
        }
      }
    }

    
  }

  .hamburger {
    cursor: pointer;

    @media screen and (min-width: ${theme.breakpoints.mid}px) {
      display: none;
    }
  }
`
export default class Header extends React.Component {
  constructor(props) {
    super()
    this.state = {}
    this.state.path = props.path
    this.state.open = false
  }

  componentDidMount() {

    window.addEventListener('resize', this.handleResize.bind(this))

  }

  handleResize (e) {
    
    if ( window.innerWidth > theme.breakpoints.mid && this.state.open ) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    document.querySelectorAll(".links")[0].classList.toggle("active")

    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    return (
      <Styles>
        <Container>
          <div className="my-box">
          <div className="hamburger" onClick={this.toggleMenu.bind(this)}>
            <div style={{ display: "table", height: "100%", width: "100%" }}>
              <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                
                  <HamburgerMenu
                    isOpen={this.state.open}
                    menuClicked={() => {}}
                    width={33}
                    height={20}
                    strokeWidth={4}
                    rotate={0}
                    color={theme.blue}
                    borderRadius={0}
                    animationDuration={0.4}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "table", height: "100%", width: "100%" }}>
              <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                <div className="home-link">
                  <a href="http://www.appliedmaterials.com/" target="_blank" rel="noopener norefferer">
                    <Logo />
                  </a>
                </div>
              </div>
            </div>

            <div className="links">
            <Link to="/">HOME</Link>
            <Link to="/summary">PROXY SUMMARY</Link>
            <a href="https://ir.appliedmaterials.com/static-files/59aa9549-a055-44b6-b776-a6f8b0d7bbb1" target="_blank" ref="noopener noreferrer">ANNUAL REPORT & 10-K</a>
          </div>

            <div className="my-vote">
              <div style={{ display: "table", height: "100%", width: "100%" }}>
                <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                  <a
                    href="https://east.proxyvote.com/pv/web"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="button is-danger">VOTE</div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          
        </Container>
      </Styles>
    )
  }
}

const Logo = () => {
  let data = useStaticQuery(graphql`
    {
      logo: file(relativePath: { eq: "applied-logo.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      icon: file(relativePath: { eq: "applied-icon.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <div>
      <Img
        fluid={data.logo.childImageSharp.fluid}
        className="my-logo"
        alt="Applied Materials Logo"
      />
      <Img
        fluid={data.icon.childImageSharp.fluid}
        className="my-icon"
        alt="Applied Materials Logo"
      />
    </div>
  )
}
