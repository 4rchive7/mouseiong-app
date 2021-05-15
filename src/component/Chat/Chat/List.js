import React from 'react';
import styled from 'styled-components';
import Balloon from './Balloon'
import config from './config';

const Messages = styled.div`
  text-align: left;
  height: ${props => config.chatHeight - props.controlsSize}px;
	padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 20px;
	overflow: auto;
`;

export default class extends React.Component {

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView();
  }

  render() {
    return (
      <Messages ref={(el) => {this.container = el}} controlsSize={this.props.controlsSize}>
        {this.props.messages.map((msg, index) => (
          <Balloon key={index} position={msg.position} color={msg.color}>
            {msg.text}
          </Balloon>
        ))}
        <div ref={(el) => { this.messagesEnd = el }} />
      </Messages>
    );
  }
}