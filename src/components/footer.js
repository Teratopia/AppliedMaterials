import React from "react"
import {Link} from "gatsby"
import styled from "@emotion/styled";
import Container from "./container";
import AppliedIcon from "../images/applied-icon.png"
import theme from "../theme";

const Styles = styled.footer`
  background: #E5E5E5;
  color: #060606;
  
  font-size: 15px;
  border-top: 4px solid ${theme.teal}; 


`
export default class Footer extends React.Component {
  render () {
    return (
      <Styles>
          <Container >
            <Link to="/"> 
          <img src={AppliedIcon} alt="Applied Icon" style={{width: 33, marginRight: 4}}/></Link> <span style={{position: "relative", top: 2}}>| 2020 Proxy Statement</span>
          </Container>
      </Styles>
    )
  }
}

