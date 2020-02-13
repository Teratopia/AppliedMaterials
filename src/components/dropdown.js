import React from "react"
import {Link} from "gatsby"
import styled from "@emotion/styled";
import Container from "./container";
import AppliedIcon from "../images/applied-icon.png"
import theme from "../theme";

const Styles = styled.div`
.dd-container {
    maxWidth : 1050px;
    flexDirection : row;
    padding-right: 2px;
    padding-left: 2px;
    background-color: white;

    .dd-select {
        width : 100%;
        border-radius: 0px;
        font-size : 16px;
        padding-top : 4px;
        padding-bottom : 4px;
        padding-left : 8px;
        padding-right : 8px;
        margin-right : 2px;
        margin-left: 2px;
        font-weight : 200;
        background-color: #e5e5e5;
        cursor: pointer;
        display: flex;
        flex-direction : row;
        justify-content: space-between;

        &:hover {
            background: #469ac2;
            color: white;
          }
     }

     
}

.dd-options-list-container {
    width : 100%;
    max-width : 1050px;
    position: absolute;
    z-index: 401;
}

.dd-options-list-container-padding {
    padding-right: 2px;
    padding-left: 2px;
    padding-bottom: 2px;
    margin-right: 50px;
    background-color: white;
}

.dd-options-list {
    width : 100%;
    max-width : 1050px;
    &:hover {
        display: block;
    }
}

.dd-option {
        border-top: 1px solid white;
        width : 100%;
        border-radius: 0px;
        font-size : 16px;
        padding-top : 4px;
        padding-bottom : 4px;
        padding-left : 8px;
        padding-right : 8px;
        font-weight : 200;
        background-color: #e5e5e5;
        cursor: pointer;

        &:hover {
            background: #469ac2;
            color: white;
          }

}
`
export default class Dropdown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selection : this.props.default || this.props.options && this.props.options.length > 0 ? this.props.options[0].title : 'no default set',
            isViewingOptions : false,
            selectedOption : {title : 'NAVIGATE TO SECTION'}
        }
        this.onSelect = this.onSelect.bind(this);

        this.mouseTarget = React.createRef();
    }

    componentDidMount(){
        this.mouseTarget.current.addEventListener('mouseleave', ()=>{
            //this.setState({isViewingOptions : false});
        });
    }

    onSelect(option){
        console.log('onSelect option = ', option);
        this.setState({selectedOption : option, isViewingOptions : false});
        this.props.onSelect(option);
    }

  render () {
    return (
        <Styles>
          <Container >
            <div className="dd-container" ref={this.mouseTarget}>
                <div className="dd-select" onClick={()=>this.setState({isViewingOptions : !this.state.isViewingOptions})}>
                    <span style={{fontSize : 18, fontWeight : '200'}}>
                        {this.state.selectedOption.title}
                    </span>
                    <span style={{fontSize : 18, marginRight : '8px'}}>
                        &#8595;
                    </span>
                </div>
                { this.state.isViewingOptions && this.props.options ? 
                <div className="dd-options-list-container" ref={this.mouseTarget}>
                    <div className="dd-options-list-container-padding">
                    <div className="dd-options-list" >
                        {this.props.options.map(option => {
                            if(option === this.state.selectedOption){
                                return null;
                            } else {
                                return <div key={option.title} className="dd-option" onClick={()=>{this.onSelect(option)}}>
                                    {option.title}
                                </div>
                            }
                        })}
                    </div>
                    </div>
                </div>
                : null}
            </div>
          </Container>
        </Styles>
    )
  }
}

/*
[
    {
        title : 'TABLE OF CONTENTS'
    },
    {
        title : 'SUMMARY'
    },
    {
        title : 'SUSTAINABILITY / CSR'
    },
    {
        title : 'BOARD AND GOVERNANCE PRACTICES'
    }
]

*/