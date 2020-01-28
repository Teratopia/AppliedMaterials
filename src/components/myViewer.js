import React from "react"
import styled from "@emotion/styled"

import Worker from "../../vendor/pdfviewer/Worker"
import Viewer from "../../vendor/pdfviewer/Viewer"

const Styles = styled.div``

export default class Component extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.state.top = 0
  }

  componentDidMount () {
      window.onscroll = this.handleScroll.bind(this)
  }

  handleScroll ( e ) {
    // this.setState({
    //     top: e.currentTarget.scrollY
    // })

    document.querySelectorAll(".my-target")[0].style.top = -e.currentTarget.scrollY + "px" 

  }

  render() {
    return (
        <Styles >
            <div className="my-target" style={{position: "relative", }}>
              <Worker>
          <div style={{ height: '100vh', overflowY: "scroll", position: "relative", marginBottom: 100 }}>
          <div style={{position: "relative"}}>
            <Viewer fileUrl={ require("../images/applied-proxy.pdf")}  />
            </div>
          </div>
        </Worker>
        </div>
        </Styles>
    )
  }
}


