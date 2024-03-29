/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import "./layout.scss"
import styled from "@emotion/styled"
import Theme from "../theme.js";

const Styles = styled.div`

`
class Layout extends React.Component {
  constructor ( props ) {
    super();
    this.state = {}
  }

  componentDidMount () {

    
  }
  render () {
    return (
      <Styles>
        <Header />
        
        
        <main>{ this.props.children }
        
        </main>
        
        
      </Styles>
    )
  }
  
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
