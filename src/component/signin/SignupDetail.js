import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { checkEmailAuth, getUserDetail, updateUserDetail } from "../../store/api/userApi";

const SingupDetail = props => {
    const [newUserDetail, setNewUserDetail] = useState(
        {
        type : null,
        name : null,
        email : null,
        password : null,
        company : null,
        location : null,
        emailAuth : false
    });
    const [userDefaulInfo, setUserDefaulInfo] = useState(null);
    const [page, setPage] = useState("EmailAuth");
    let completed = false;

    useEffect(()=>{
        console.log("SignupDetail");
        const getUserInfo = async(target)=>{
            const result = await getUserDetail(target);
            setUserDefaulInfo(JSON.parse(sessionStorage.getItem("MOUSEION/Searh/Detial")));
        }
        if(userDefaulInfo == null){
            getUserInfo("testAdmin");
        }
        if(userDefaulInfo != null){
            completed = true;
            console.log("getUserInfo");
            console.log(userDefaulInfo);
        }
    },[userDefaulInfo]);

    return (
        <div>
            {page === "EmailAuth" ? <EmailAuth email={sessionStorage.getItem("MOUSEION/email")}newUser={newUserDetail} setPage={setPage}/> : null }
            {page === "DetailInformation" ? <DetailInformation history={props.history}/> : null }
        </div>
    );
}


const EmailAuth = (props)=>{
    const [isDone, setDone] = useState(false);
    const [looper, setLooper] = useState(1);

    useEffect(() => {
        if (looper >= 2 * 30) return;

        const timeout = setTimeout(() => { setLooper(looper + 1) }, 1500);
        console.log("working outSide");
        const getEmailAuthInfo = async () => {
            const result = await checkEmailAuth(props.email);
            console.log(result);
            setDone(result);
        }
        getEmailAuthInfo();
        if(isDone){
            clearTimeout(timeout);
            props.setPage("DetailInformation");
        }
        return () => clearTimeout(timeout);
    }, [looper]);

    return (
        <div>
            입력하신 주소로 인증 메일을 보냈습니다.
            이메일 내부의 링크를 눌러주세요
        </div>
    );
}


const DetailInformation = (props) => {

    const [company, setCompany] = useState();
    const [location, setLocation] = useState();
    
    const onChangeHandler = e => {
        if(e.target.placeholder === "company"){
            setCompany(e.target.value);
        }else{
            setLocation(e.target.value);
        }
    }
    
    const onClickHandler = e => {
        updateUserDetail({
            email : sessionStorage.getItem("MOUSEION/email"),
            company : company,
            location : location
        })
        sessionStorage.removeItem("MOUSEION/email");
        props.history.push("/signin");
    }
    
    return (
        <div>
            DetailInfo
            <p><input type="text" name="email" placeholder="company" onChange={onChangeHandler} /></p>
            <p><input type="text" name="location" placeholder="location" onChange={onChangeHandler} /></p>
            <button onClick={onClickHandler}>submit</button>
        </div>
    );
}

export default SingupDetail;