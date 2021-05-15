import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { requestGetWrapper } from "../wrapper/JwtWrapper";


const API = '/info'

export const connectChatRoom = (roomId) => {
	const socket = new SockJS('/chat');
	const stompClient = Stomp.over(socket);
    const jwt = localStorage.getItem('MOUSEION/REFRESH_TOKEN');

    stompClient.connect({}, (roomId) => {
        console.log('Connected with server');
        stompClient.subscribe(
            '/groupChat', greeting=>{
                console.log(JSON.parse(greeting.body));
            });
      }, error => {
          console.log(error);
      });
    return stompClient;
}

export const sendMessage = (stompClient, msg) => {
	stompClient.send("/app/sendMessage", {}, JSON.stringify(msg));
}


export const getRoomId = async (aid, opponentEmail) =>{    
    const query = "?aid="+aid+"&opponent="+opponentEmail;
    return await requestGetWrapper(API+'/getChatRoomId' + query, null, "MOUSEION/SearchList/listData");
}

