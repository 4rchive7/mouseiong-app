import { useState, useRef } from 'react';
import { SockJsClient, Stomp } from 'react-stomp';
import './ChatImpl.css';


const ChatImpl = () => {
    const [chatMsg, setChatMsg] = useState({
        type: "JOIN",
        content: "Content",
        sender: "sender"
    });

    const $websocket = useRef(null);
    const [username, setUsername] = useState();
    const [page, setPage] = useState(0);
    return (
        <div>
            <SockJsClient url="http://localhost:7221/chat" topics={['/topic/public']}
                    onMessage={msg => { console.log(msg); }}
                    onConnect={console.log("Connected~!!")}
                    ref={$websocket}              
                />           
            { page === 0 ? <EntryToChat username={username} setUsername={setUsername} setPage={setPage} /> : null}
            {/* { page === 1 ? <StartToChat username={username} /> : null} */}

        </div>
    );
}

const EntryToChat = ({ username, setUsername, setPage }) => {

    const onClickHandlerUserForm = (event) => {
        setPage(2);
    }
    return (
        <div id="username-page">
            <div className="username-page-container">
                <h1 className="title">username을 입력하세요</h1>
                <div className="form-group">
                    <input type="text" id="name" placeholder="Username" autoComplete="off" className="form-control" onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="form-group">
                    <button className="accent username-submit" onClick={onClickHandlerUserForm}>채팅 시작하기</button>
                </div>
            </div>
        </div>
    );
}

const StartToChat = ({ username }) => {
    const connect = (event) => {
        if (username) {
            let socket = new SockJsClient('"http://localhost:7221/chat');
            stompClient = Stomp.over(socket);
            console.log("Done" + stompClient);
            stompClient.connect({}, onConnected, onError);
        }
        event.preventDefault();
    }

    const onConnected = () => {
        console.log("Connected");
        stompClient.subscribe('/topic/public', onMessageReceived);
        stompClient.send("/app/addUser",
            {},
            JSON.stringify({ sender: username, type: 'JOIN' })
        )
        connectingElement.classList.add('hidden');
    }

    const onError = (error) => {
        connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
        connectingElement.style.color = 'red';
    }


    const sendMessage = event => {
        var messageContent = messageInput.value.trim();
        if (messageContent && stompClient) {
            var chatMessage = {
                sender: username,
                content: messageInput.value,
                type: 'CHAT'
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            messageInput.value = '';
        }
        event.preventDefault();
    }

    return (
        <div id="chat-page" >
            <div className="chat-container">
                <div className="chat-header">
                    <h2>Spring WebSocket Chat Demo</h2>
                </div>
                <div className="connecting">
                    연결중...
                    </div>
                {/* <ul id="messageArea">

                </ul> */}
                <form id="messageForm" name="messageForm">
                    <div className="form-group">
                        <div className="input-group clearfix">
                            <input type="text" id="message" placeholder="Type a message..." autoComplete="off" className="form-control" />
                            <button type="submit" className="primary">보내기</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

const onMessageReceived = payload => {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}


export default ChatImpl;
/*
usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)*/