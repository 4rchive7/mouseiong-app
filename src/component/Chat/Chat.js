import { AppBar, Box, Button, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import styled from 'styled-components';
import config from './config';
import { connectChatRoom, getRoomId, sendMessage } from "../../store/api/chatApi";
import { searchKeyword } from "../../store/api/searchApi";
import List from './Chat/List';
import Control from './Chat/Control';
import Measure from 'react-measure';

import ChatImpl from './Chat/index.js';

const ChatContainer = styled.div`
  font-family: 'Open sans', 'sans-serif';
  border: 1px solid #ccc;
  width: 80%;
  margin: 0 auto;
`;

const tempMessages = [
  { text: 'Testing...', position: 'right', color: '#FFD54F'},
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ante nulla, rhoncus eget cursus at, porttitor a lacus. Donec a euismod nisi, nec venenatis sapien. In interdum sagittis lectus laoreet fermentum. Aliquam ut scelerisque felis, dictum fringilla urna. Etiam vel vestibulum nibh. In vel lacus eget arcu molestie malesuada in sit amet dui. Nunc posuere molestie sapien, eu bibendum ipsum. Curabitur ullamcorper elit mauris. Cras vitae lectus sem.', position: 'left' },
  { text: 'Testing...', position: 'left' },
  { text: 'Testing...', position: 'left' },
  { text: 'Testing...', position: 'right', color: '#FFD54F'},
  { text: 'Testing...', position: 'left' },
  { text: 'Testing...', position: 'left' },
  { text: 'Testing...', position: 'right', color: '#FFD54F'},
  { text: 'Testing...', position: 'right', color: '#FFD54F' },
  { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ante nulla, rhoncus eget cursus at, porttitor a lacus. Donec a euismod nisi, nec venenatis sapien. In interdum sagittis lectus laoreet fermentum. Aliquam ut scelerisque felis, dictum fringilla urna. Etiam vel vestibulum nibh. In vel lacus eget arcu molestie malesuada in sit amet dui. Nunc posuere molestie sapien, eu bibendum ipsum. Curabitur ullamcorper elit mauris. Cras vitae lectus sem.', position: 'right', color: '#FFD54F' }
];

const useStyles = makeStyles(theme => ({
    chat: {
        width: '100%',
        height: '100%',
        display: 'flex'

    },
    chatList: {
        width: '23%'
    },
    chatMessage: {
        width: '77%',
        backgroundColor:'grey'
    }
}));


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



const Chat = props => {
    const classes = useStyles();
    const [$websocket, setWebsocket] = useState(null);
    const roomId = 'temp'
    const [chatMessage, setChatMessage] = useState({
        roomId: "temp",
        title: null,
        type: null,
        lastUpdatedDate: null,
        participants: [],
        messages: []
    });


    let stompClient;
    let connected = false;

    const temptemptemp = msg => {
        console.log(msg);
    }

    useEffect(() => {

        const socket = new SockJS('/chat');
        const opponentEmail = JSON.parse(sessionStorage.getItem("MOUSEION/Searh/Detial")).email;
        const aid = JSON.parse(localStorage.getItem("MOUSEION/authenticatedUser"));
        console.log(aid);
        console.log(opponentEmail);
        const result = getRoomId(aid, opponentEmail);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, roomId => {
            console.log('Connected with server');
            stompClient.subscribe('/topic/' + "temp", msg => { console.log(msg) });

        }, error => {
            console.log(error);
        });

        console.log("CHAT.JS useEffect Working");
    }, []);

    const onClickHandler = (e) => {
        // console.log($websocket);
        // if($websocket != null) sendMessage($websocket, 'MESSage')
        if (e.target.innerHTML === 'send') {
            console.log(stompClient);
            if (stompClient != null)
                sendMessage(stompClient, chatMessage)
        } else if (e.target.innerHTML === 'disconnect') {
            stompClient.disconnect();
        }
    }

   

    return (
        <Box commponent="div" className={classes.chat}>
            <div className={classes.chatList}>
                div1
            </div>
            <div className={classes.chatMessage}>

                <ChatContainer>
                    <ChatImpl messages={tempMessages} />
                </ChatContainer>
            </div>
            {/* {sessionStorage.getItem('MOUSEION/chatMember')} 님과의 채팅
        <br></br>
        <div>
            채팅창
            <div>

            </div>
        </div>
        <button onClick={onClickHandler}>disconnect</button>
        <button onClick={onClickHandler}>send</button> */}
        </Box>
    );
}

export default Chat;