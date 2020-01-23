import React from "react"
import styled from "@emotion/styled"

const Styles = styled.div`
  height: 100%;
`

export default class Component extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
        <Styles>
            <div style={{ display: "table", height: "100%", width: "100%" }}>
              <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                {
                    this.props.children
                }
              </div>
              </div>
                
        </Styles>
    )
  }
}


