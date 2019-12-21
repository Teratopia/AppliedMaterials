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
// import CMS from 'netlify-cms-app'

const Styles = styled.div`
  .my-background {
    position: fixed;
    z-index: 4000;
    top: 0;
    height: 100%;
    width: 100%;
    background: grey;
    right: 0;
    left: 0;
    bottom: 0;
    overflow-y: scroll; 

    &.active {
      display: none;
    }
  }
`
class Layout extends React.Component {
  constructor ( props ) {
    super();
    this.state = {}
  }

  componentDidMount () {
    // if (typeof window !== undefined) {
    //   if (!window.netlifyIdentity.currentUser()) {
    //     window.netlifyIdentity.open()
    //   } else {
    //     document.querySelectorAll(".my-background")[0].classList += "active"
    //   }
    // }
    
  }
  render () {
    return (
      <Styles>
        <Header />
        
        {/* <div className="my-background">
        </div> */}
        
        
        <main>{ this.props.children }</main>
        
        <Footer />
      </Styles>
    )
  }
  
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
