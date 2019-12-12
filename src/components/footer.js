import React from "react"
import styled from "@emotion/styled";
import Container from "./container";

const Styles = styled.footer`
  background: #464646;
  color: white;

  a {
    transition: all 0.1s ease;

    &:hover {
      color: inherit;
      opacity: 0.5;
    }
  }

`
export default class Footer extends React.Component {
  render () {
    return (
      <Styles>
          <Container>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Container>
      </Styles>
    )
  }
}

