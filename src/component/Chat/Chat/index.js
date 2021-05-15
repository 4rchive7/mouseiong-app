import React, { Component } from 'react';
import styled from 'styled-components';
import List from './List';
import Control from './Control';
import config from './config';
import Measure from 'react-measure';

const Chat = styled.div`
  background-color: ${config.background};
	position: relative;
	height: ${config.chatHeight}px;

  * {
    box-sizing: border-box;
  }
`;

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: this.props.messages,
      controlsSize: config.controlsSize
    };
  }

  addMessage = (text, position, color) => {
    let messages = this.state.messages;
    messages.push({text, position, color});

    this.setState({messages});
  }

  resizeControl = (size) => {
    this.setState({
      controlsSize: size.client.height
    });
  }

  render() {
    return (
      <Chat>
        <List messages={this.state.messages} controlsSize={this.state.controlsSize} />
        <Measure client onResize={this.resizeControl}>
          {({ measureRef }) => (
            <Control innerRef={measureRef} add={this.addMessage} />
          )}
        </Measure>
      </Chat>
    );
  }

}