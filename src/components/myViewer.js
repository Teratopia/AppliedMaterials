import React from "react"
import styled from "@emotion/styled"

import Worker from "../../vendor/pdfviewer/Worker"
import Viewer from "../../vendor/pdfviewer/Viewer"

const Styles = styled.div``

export default class Component extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
        <Styles>
              <Worker>
          <div style={{ height: '100vh', overflowY: "scroll", position: "relative", marginBottom: 100 }}>
          <div style={{position: "relative"}}>
            <Viewer fileUrl={ require("../images/applied-proxy.pdf")}  />
            </div>
          </div>
        </Worker>
        </Styles>
    )
  }
}


