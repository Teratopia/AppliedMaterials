import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image";
import React from "react"
import styled from "@emotion/styled"
import Container from "./container"
import HamburgerMenu from "react-hamburger-menu"
import theme from "../theme"

const Styles = styled.div`
  position: fixed;
  background: #fff;
  box-shadow: 0px 8px 8px -8px grey;
  height: 84px;
  width: 100%;
  z-index: 1000;

  .my-box {
    display: grid;
    grid-template-columns: 160px calc(100% - 320px) 160px;
  }

  a {
    color: #3fa9f5;
  }

  .my-logo {
    width: 156px;
    display: block;
    margin: 0 auto;
  }

  .home-link {
    text-align: center;
    font-size: 32px;
  }

  .my-vote {
    text-align: right;
    .button {
      width: 100%;
      height: calc(100% - 8px);
      border-radius: 0px;
      margin: 4px 0px;
      background: #E48047;
      transition: all ${theme.transition}s ease;

      &:hover {
        background: #E48047cc;
      }
    }
  }

  .links {
    display: none;

    &.active {
      position: absolute;
      border-top: 1px solid grey;
      width: 100%;
      left: 0px;
      top: 84px;
      text-align: center;
      background: #fff;
      box-shadow: 0px 8px 8px -8px grey;
      z-index: 999;
      display: block;
      font-size: 18px;

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
    position: relative;
    top: 18px;
    cursor: pointer;
  }
`
export default class Header extends React.Component {
  constructor(props) {
    super()
    this.state = {}
    this.state.path = props.path
    this.state.open = false
  }

  componentDidMount() {}

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
              <HamburgerMenu
                isOpen={this.state.open}
                menuClicked={() => {}}
                width={33}
                height={20}
                strokeWidth={4}
                rotate={0}
                color={theme.blue}
                borderRadius={0}
                animationDuration={theme.transition}
              />
            </div>

            <div className="home-link">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            <div className="my-vote">
              <a href="http://www.appliedmaterials.com/" target="_blank" ref="noreopener noreferrer">
                <div className="button is-danger">VOTE</div>
              </a>
            </div>
          </div>

          <div className="links">
            <Link to="/about">HOME</Link>
            <Link to="/about">SHAREHOLDER LETTER</Link>
            <Link to="/about">PROXY SUMMARY</Link>
            <Link to="/about">ANNUAL REPORT & 10K</Link>
          </div>
        </Container>
      </Styles>
    )
  }
}


const Logo  =  () => {
  let fluid = useStaticQuery(graphql`
    {
      logo: file(relativePath: {eq: "applied-logo.jpg"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `).logo.childImageSharp.fluid;
  return (
    <Img fluid={ fluid } className="my-logo" alt="Applied Materials Logo" />  
  )
  
}