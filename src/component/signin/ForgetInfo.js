import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { isEmailExistInServer, getNewTempPasswordFromServer } from "../../store/api/userApi";
import { isEmailValid } from "../../util/LoginUtils";
import { isEmpty } from "../../util/StringUtils";

const ForgetInfo = props =>{
    const [email, setEmail] = useState(null)
    const [page, setPage] = useState("password");
    return (
        <div>
            {page ==="password"? <ForgetPw setPage={setPage} email={email} setEmail={setEmail}/>:null}
            {page ==="success"? <SubmitSuccess setPage={setPage} email={email} setEmail={setEmail} history={props.history}/>:null}
        </div>
    );
}

const ForgetPw = props =>{

    const [isEmailExist, setEmailExist] = useState(null);
    const [isEmailOkay, setEmailOkay] = useState(null);
    const [checkDup, setCheckDup] = useState(false);

    const onChangeHandler = e=> {
        props.setEmail(e.target.value);
    }

    const onClickHandler = e=>{
        setCheckDup(true);
    }

    let completed = false;
    useEffect(()=>{
        
        const checkDupEmail = async (target)=>{
            const result = await isEmailExistInServer(target);
            if(!completed){
                completed = true;
                setEmailExist(result);
            }
        }

        if(checkDup && isEmailOkay){
            const result = checkDupEmail(props.email);
            if(completed){
                setEmailExist(result);
            }
        }


        if(!isEmpty(props.email)){
            setEmailOkay(isEmailValid(props.email));
        }else   
            setEmailOkay(null);
        
        if(!isEmpty(isEmailExist) && isEmailExist === "EXIST"){
            props.setPage("success");
        }
    },[props.email, checkDup, isEmailOkay, isEmailExist]);
    return (
        <div>
            ForgetPw<br/>
            <input type="text" placeholder="email" onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>submit</button>  
            <div>
            {(isEmpty(isEmailOkay) || isEmailOkay) ? null : <h6>잘못된 이메일 형식입니다</h6>}
            {isEmpty(isEmailExist) ? null : (isEmailExist==="EXIST" ? null  : <h6>존재하지 않는 계정입니다</h6> ) }</div>          
        </div>
    );
}

const SubmitSuccess=props=>{
    
    useEffect(()=>{
        const sendEmail = async email =>{
           await getNewTempPasswordFromServer({email : email});
        }

        sendEmail(props.email);
    });

    const onClickHandler = e => {
        if(e.target.innerHTML === "GoHome"){
            console.log("hit");
            props.history.push("/");
        }
    }
    return (
        <div>
            입력하신 email로 임시 비밀번호를 보냈습니다.
            <button onClick={onClickHandler}>GoHome</button>
        </div>
    );
}

export default ForgetInfo;