import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEmailExistInServer, registUser } from "../../store/api/userApi";

import { isEmailValid, isPasswordValid, isUserNameValid } from "../../util/LoginUtils";
import { isEmpty } from "../../util/StringUtils";

const Signup = (props)=>{
    const [newUser, setNewUser] = useState(
        {
        type : null,
        name : null,
        email : null,
        password : null,
        company : null,
        location : null,
        emailAuth : false
    });
    const [currentPage, setPage] = useState("SelectUserType");
    

    const [isSent, setSend] = useState(false);
    useEffect(()=>{    
        const registUserInfoServer = async (target) =>{
            await registUser(target);
        }     
        if(currentPage === "submit") { //나중에 모두 제출했지만 문제되는 경우를 대비한 코드를 여기에서 처리하는게 좋을 듯!
            // const result = registUser(newUser);
            registUserInfoServer(newUser);
            props.history.push("/signup/detail");
        }
    },[currentPage]);


    return (
        <div>
            Signup     
            {currentPage === "SelectUserType" ? <SelectUserType newUser={newUser} setNewUser={setNewUser} setPage={setPage}/> : null}
            {currentPage === "EssentialInfomation" ? <EssentialInfomation newUser={newUser} setNewUser={setNewUser} setPage={setPage}/> : null}
            {/* {currentPage === "EmailAuthenticate" ? <EmailAuthenticate newUser={newUser} setNewUser={setNewUser} setPage={setPage}/> : null}
            {currentPage === "DetailInformation" ? <DetailInformation newUser={newUser} setNewUser={setNewUser} setPage={setPage}/> : null}
            {currentPage === "Loading" ? <Loading newUser={newUser} setNewUser={setNewUser} setPage={setPage}/> : null} */}
        </div>
    );
}

const SelectUserType = (props)=>{
    const onClickHandler = (e) =>{
        if(e.target.id === "journalist"){
            props.setNewUser({
                ...props.newUser,
                type : "Journalist"
            });
        }else{
            props.setNewUser({
                ...props.newUser,
                type : "Expert"
            });
        }
        props.setPage("EssentialInfomation");
    }
    return(
        <div>
            <p> I am ....</p>
            <button id="journalist" onClick={onClickHandler}>An Journalist</button>
            <button id="expert" onClick={onClickHandler}>An Expert</button>
        </div>
    );
}

const EssentialInfomation = (props)=>{
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);

    const [isExist, setEmailExist] = useState(null);
    const [isEmailOkay, setEmailOkay] = useState(null);
    const [isNameOkay, setNameOkay] = useState(false);
    const [isPasswordOkay, setPasswordOkay] = useState(false);
    const [isPasswordConfirmOkay, setPasswordConfirmOkay] = useState(false);

    const [IGTG, setIGTG]= useState(true);
    const [checkDup, setCheckDup] = useState(false);

    const onClickHandler = (e) =>{  
        if(e.target.innerHTML === 'submit'){
            if(isEmpty(email) || isEmpty(name) || isEmpty(password) || isEmpty(passwordConfirm)){
                setIGTG(false);
                return ;
            }
            if(!isPasswordOkay || !isPasswordConfirmOkay || !isNameOkay || isEmailOkay == false || isExist  === "EXIST"){
                setIGTG(false);
                return ;
            }

            props.setNewUser({
                ...props.newUser,
                email : email,
                name : name,
                password : password
            });
            sessionStorage.setItem("MOUSEION/email", email);
            props.setPage("submit");
        }else if(e.target.innerHTML === '중복확인'){
            setCheckDup(true);
        }      
        
    }

    const onChangeHandler = (e)=>{
        if(e.target.placeholder === "password"){
            setPassword(e.target.value);
        }else if(e.target.placeholder === "passwordConfirm"){
            setPasswordConfirm(e.target.value);
        }else if(e.target.placeholder === "email"){
        }else if(e.target.placeholder === "name"){
            setName(e.target.value);
            console.log(isNameOkay);
        }
        
    }

    
    const onBlurHandler = (e)=>{
        if(e.target.placeholder === "password"){
            setPassword(e.target.value);
        }else if(e.target.placeholder === "passwordConfirm"){
            setPasswordConfirm(e.target.value);
        }else if(e.target.placeholder === "email"){
            setEmail(e.target.value);
            setEmailExist(null);
        }else if(e.target.placeholder === "name"){
            setEmail(e.target.name);
        }        
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
            const result = checkDupEmail(email);
            if(completed){
                setEmailExist(result);
            }
        }

        if(password === passwordConfirm)
            setPasswordConfirmOkay(true);
        else
            setPasswordConfirmOkay(false);
            
        if(!isEmpty(email)){
            setEmailOkay(isEmailValid(email));
        }else
            setEmailOkay(null);

        if(isExist){        
            console.log(isExist);
        }

        if(!isEmpty(name))
            setNameOkay(isUserNameValid(name));

        
        if(!isEmpty(password))
            setPasswordOkay(isPasswordValid(password));
        console.log(email);
    }, [password, passwordConfirm, email, name, checkDup, isExist, isEmailOkay]);
    return (
        <div>
            <div><input type="text" name="email" placeholder="email" onBlur={onBlurHandler} /> <button onClick={onClickHandler}>중복확인</button>
             {(isEmpty(isEmailOkay) || isEmailOkay) ? null : <h6>잘못된 이메일 형식입니다</h6>}
             {isEmpty(isExist) ? null : (isExist==="NOT_EXIST" ? <h6>LGTM</h6>  : <h6>이미 존재하는 계정입니다</h6> ) }</div>
            <p><input type="text" name="name" placeholder="name" onChange={onChangeHandler} /></p>
            {(isNameOkay === "VALID" || isEmpty(name)) ? null : <h6>{isNameOkay}</h6>}
            <p><input type="password" placeholder="password" onChange={onChangeHandler} /></p>
            {(isPasswordOkay === "VALID" || isEmpty(password)) ? null : <div><h6>{isPasswordOkay}</h6></div>}
            <p><input type="password" placeholder="passwordConfirm" onChange={onChangeHandler} /></p>
            {(isPasswordConfirmOkay || isEmpty(passwordConfirm)) ? null : <div><h6>입력하신 비밀번호가 일치하지 않습니다</h6></div>}
            <button onClick={onClickHandler}>submit</button>
            { IGTG ? null : <p6>필수 입력칸을 모두 채워주세요</p6>}

        </div>
    );
}

export default Signup;