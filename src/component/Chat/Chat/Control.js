import React, { Component } from 'react';
import styled from 'styled-components';
import config from './config';

const Container = styled.div`
  padding: 5px;
  position: absolute;
  bottom: 0;
  width: 100%;
  transition: all 0.5s ease;

  i.fa {
    font-size: 1.8em;
  }

  a {
    color: ${config.iconColor};
    margin-left: 2px;
    margin-top: 5px;
    width: 28px;
    display: inline-block;
  }

  a:hover {
		color: ${config.iconHoverColor};
	}
`;

const RightPanel = styled.div`
  .text {
		position: relative;
		float: left;
		width: 93%;
    text-align: left;
	}

  .text:after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: -11px;
    top: 0;
    bottom: auto;
    border-width: 7px;
    border-style: solid;
    border-color: ${config.input} transparent transparent ${config.input};
  }
  
  .action {
    float: left;
    width: 7%;
    text-align: center;
  }
  
  .input {
    font-size: 14px;
    padding: 7px;
    background-color: ${config.input};
    max-height: ${config.inputMaxHeight}px;
    overflow: auto;
    box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.09);
    border-radius: 4px;

    div {
      min-height: 20px;
      word-wrap: break-word;
      white-space: pre-wrap;
      overflow-x: hidden;
      outline: none;
    }

    .placeholder {
      color: ${config.placeholder};
      z-index: 0;
      position: absolute;
      pointer-events: none;
      user-select: none;    
    }
  }
`;

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      placeholder: true
    }
  }

  submit = () => {
    console.log("clicked");
    this.props.add(this.input.innerText, 'right', '#FFD54F');
    this.input.innerText = '';
  }

  teste = (e) => {
    const value = e.target.innerText;
    if (value === '') {
      this.setState({
        placeholder: true
      });
    } else {
      this.setState({
        placeholder: false
      });
    }
  }

  render() {
    return (
      <Container>
        <RightPanel>
          <div className="text">
            <div className="input" ref={this.props.innerRef}>
              {this.state.placeholder && 
                <span className="placeholder">
                  Type your message
                </span>
              }
              <div id="textarea" contentEditable="true"
                onInput={this.teste} ref={(el) => { this.input = el }}>
              </div>
            </div>
          </div>
          <div className="action">
            <a href="#" onClick={this.submit}>
              SEND
              <i className="fa fa-arrow-circle-o-up"></i>
            </a>
          </div>
        </RightPanel>
      </Container>
      
    )
  }

}