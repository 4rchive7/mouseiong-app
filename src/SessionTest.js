import { useEffect, useState } from "react";

const SessionTest = ()=>{
    const [localStorageName, setLocalStorageName] = useState();
    const [sessionStorageName, setSessionStorageName] = useState();
    const [submitted, setSubmit] = useState(0);
    const [c, setC] = useState("아무값");
    const [a, setA] = useState(localStorage.getItem("name"));
    const [b, setB] = useState(sessionStorage.getItem("name"));

    useEffect(()=>{
        setA(localStorage.getItem("name"));
        setB(sessionStorage.getItem("name"));
    },[submitted]);
    const onClickHandler = () =>{        
        localStorage.setItem("name", localStorageName);
        sessionStorage.setItem("name", sessionStorageName);
        setSubmit(submitted^1);
    }
    return(
        <div>
            <div>localStorage name : {localStorage.getItem("name")}</div>
            <div>sessionStorage name : {sessionStorage.getItem("name")}</div>
            <div>compare name : {c}</div>
            <input type="text" placeholder="localStore" onChange={e=>{setLocalStorageName(e.target.value)}}/>
            <input type="text" placeholder="sessionStore" onChange={e=>{setSessionStorageName(e.target.value)}}/>
            <input type="text" placeholder="comp" onChange={e=>{setC(e.target.value)}}/>
            <button onClick={onClickHandler}>submbit</button>
        </div>
    );
}

export default SessionTest;