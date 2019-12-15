import React from "react"
import styled from "@emotion/styled";
import Container from "./container";
import AppliedIcon from "../images/applied-icon.png"
import theme from "../theme";

const Styles = styled.footer`
  background: #E5E5E5;
  color: #060606;
  padding: 4px;
  font-size: 18px;
  border-top: 4px solid ${theme.teal}; 


`
export default class Footer extends React.Component {
  render () {
    return (
      <Styles>
          <Container>
          <img src={AppliedIcon} alt="Applied Icon" style={{width: 33, marginRight: 4}}/> <span style={{position: "relative", top: 2}}>| 2020 Proxy Statement</span>
          </Container>
      </Styles>
    )
  }
}

