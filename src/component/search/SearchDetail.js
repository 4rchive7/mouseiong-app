import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserDetail } from "../../store/api/userApi";

const SearchDetail = (props) =>{
    const [email, setEmail] = useState(sessionStorage.getItem("MOUSEION/SearchDetail/email"));
    const [detail, setDetail] = useState(null);
    const [display, setDisplay] = useState(false);
    let completed = false;

    const onClickHandler = ()=>{
        props.history.push(`/Chat`);
    }

    useEffect(()=>{
        console.log("SearchDetail useEffect] working");
        const get = async (target)=>{
            await getUserDetail(target);
            if(!completed) 
                setDetail(JSON.parse(sessionStorage.getItem("MOUSEION/Searh/Detial")));   
        }
        
        if(detail == null){
            get(email);
        }
        if(detail != null){
            console.log(detail);
        }
    },[detail, email]);

    return (
        <div>
            SearchListDetail
            <hr/>
            {detail != null ? <div>
                {detail.type}<br/>
                {detail.name}<br/>
                {detail.email}<br/>
                {detail.company}<br/>
            </div>:null}
            <button onClick={onClickHandler}>Chat</button>
        </div>
    );
}

export default SearchDetail;