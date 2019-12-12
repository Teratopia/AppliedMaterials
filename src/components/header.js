import { Link } from "gatsby"
import React from "react"
import styled from "@emotion/styled"
import Container from "./container"
import HamburgerMenu from "react-hamburger-menu"

const Styles = styled.div`
  position: fixed;
  background: #060606;
  height: 64px;
  width: 100%;
  z-index: 1000;

  a {
    color: #fff;
    transition: all 0.1s ease;

    &:hover {
      color: #ffffff77;
    }
  }

  .links {
    display: inline-block;
    float: right;
    text-align: right;

    a {
      margin-left: 24px;
    }

    @media screen and (max-width: 768px) {
      display: none;
      text-align: center;

      &.active {
        position: absolute;
        padding-bottom: 20px;
        top: 64px;
        width: 100%;
        background: #060606;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
        left: 0px;
        z-index: 1000;

        a {
          display: inline-block;
          margin-bottom: 12px;
        }
      }
    }
  }

  .hamburger {
    display: none;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      display: block;
      float: right;
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
          <Link to="/">Gatsby Starter</Link>

          <div className="hamburger" onClick={this.toggleMenu.bind(this)}>
            <HamburgerMenu
              isOpen={this.state.open}
              menuClicked={() => {}}
              width={25}
              height={18}
              strokeWidth={2}
              rotate={0}
              color="#fafafa"
              borderRadius={0}
              animationDuration={0.001}
              style={{ position: "absolute" }}
            />
          </div>

          <div className="links">
            <Link to="/about">About</Link>
          </div>
        </Container>
      </Styles>
    )
  }
}
