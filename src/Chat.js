import React, { useState, useRef} from 'react';
import SockJsClient from 'react-stomp';


const Chat = () => {

    const $websocket = useRef(null);
    const [totalContext, setTotalContext] = useState([]);
    const [conn, setConn] = useState(0);
    const [chatMemberVo, setChatMemberVo] = useState({
        sender : null,
        roomId : "tempRoomId",
        status : null,
        message : null,
        date : null
    });

    const [newMessage, setNewMessage] = useState();
    const [page, setPage] = useState(0);
  

    
    const updateChatMemberIntoServer = (vo)=>{
        $websocket.current.sendMessage('/app/addUser', JSON.stringify(vo));   
    }

    const onMessage = msg => {
        console.log("onMessage");        
        const latestTotalContext = [...totalContext, msg];         
        setTotalContext(latestTotalContext);
        setNewMessage(msg);
    }

    const onConnect = msg => {
        console.log(chatMemberVo.roomId);
        console.log("onConnect");
        const updateState = chatMemberVo;
        updateState.status="JOIN";
        setChatMemberVo(updateState);
        updateChatMemberIntoServer(chatMemberVo); 
    }

    const onClose = msg => {
        console.log("onClose");
        console.log(msg);
    }

    return (
        <div>
            <div>
                {conn === 1 ? <SockJsClient url={"http://localhost:7221/chat"} topics={[`/topic/${chatMemberVo.roomId}`]} //, '/topic/Template']}
                    onMessage={ onMessage }
                    onConnect={onConnect}
                    onClose={onClose}
                    ref={$websocket}
                /> : null}
                {page === 0 ? <EntryToChat setConn={setConn} chatMemberVo={chatMemberVo} setChatMemberVo={setChatMemberVo}setPage={setPage} $websocket={$websocket} /> : null}
                {page === 1 ? <StartToChat chatMemberVo={chatMemberVo} $websocket={$websocket} setChatMemberVo={setChatMemberVo} totalContext={totalContext} setTotalContext={setTotalContext} newMessage={newMessage}/> : null}
            </div>
        </div>
    );
}



const EntryToChat = ({setConn, chatMemberVo, setChatMemberVo, setPage}) => {

    const [newSender, setNewSender] = useState();
    const [newRoomId, setSetRoomId] = useState();   


    const onClickHandlerUserForm = () => {
        const newStatus = chatMemberVo;
        newStatus.sender=newSender;
        newStatus.status="JOIN";
        newStatus.roomId=newRoomId;
        setChatMemberVo(newStatus);
        setConn(1);
        setPage(1);
    }

    return (
        <div id="username-page">
            <div className="username-page-container">
                <h1 className="title">username을 입력하세요</h1>
                <div className="form-group">
                    <input type="text" id="name" placeholder="Username" autoComplete="off" className="form-control" onChange={(e) => { setNewSender(e.target.value) }} />
                    <input type="text" id="name" placeholder="rommId" autoComplete="off" className="form-control" onChange={(e) => { setSetRoomId(e.target.value) }} />
                </div>
                <div className="form-group">
                    <button className="accent username-submit" onClick={onClickHandlerUserForm}>채팅 시작하기</button>
                </div>
            </div>
        </div>
    );
}


const StartToChat = ({ chatMemberVo, $websocket,  setChatMemberVo, totalContext, newMessage }) => {

    const [currMsg, setCurrMsg] = useState("init");
    const [buttonClicked, setButtonClicked] = useState(1);


    const sendMsgToServer = (msg) => {
        $websocket.current.sendMessage('/app/sendMessage', JSON.stringify(msg));        
    };

    const onClickHandler = (e) => {
        e.preventDefault();       
        let prevChatMessage = chatMemberVo;
        prevChatMessage.date = new Date();
        prevChatMessage.message = currMsg;
        setChatMemberVo(prevChatMessage);
        sendMsgToServer(chatMemberVo);
        setButtonClicked(buttonClicked^1);
    }

    const onChangeHandler = e =>{
        e.preventDefault();       
        setCurrMsg(e.target.value);
    }
    
    // useEffect(()=>{
    //     console.log(`New Message is arrived from server`);
    //     console.log(totalContext);
    // }, [newMessage]);

    
    return (
        <div id="chat-page" >
            <div className="chat-container">
                <ul id="messageArea">
                    { totalContext != null ? <MessageList totalContext={totalContext}/> :null} 
                </ul>
                <form id="messageForm" name="messageForm">
                    <div className="form-group">
                        <div className="input-group clearfix">
                            <input type="text" id="message" placeholder="Type a message..." autoComplete="off" className="form-control" onChange={onChangeHandler} />
                            <button className="primary" onClick={onClickHandler}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );  
}

const MessageList = ({totalContext}) => {
    const liStyle={
        width : "300px",
        height : "50px",
        color : "black"
    };
    return(
        <div>
            {totalContext.map((context, index)=>{
                if(context.type === "context"){
                    return(                            
                        <li key={index} style={liStyle}>{context.sender} : {context.message}</li>
                    );
                }
            })}
        </div>
    );
}


export default Chat;