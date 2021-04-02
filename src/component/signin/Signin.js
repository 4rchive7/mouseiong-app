import { useState, useEffect } from "react";
import { jwtAuthenticate, retryAuthenticate } from "../../store/api/userApi";
import { isEmpty } from "../../util/StringUtils";

const Signin = ({history, setSignedIn, isSessionValid}) => {
    
    const [accountInfo, setAccountInfo] = useState(null);
    const [isValidToAccess, setValidationToAccess] = useState(false);
    const [reason, setReason] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(()=>{
        if(isSessionValid()){
            history.push("/");
        }
    });

    useEffect(() => {
        
        if(isValidToAccess){
            console.log("hit");
            history.push("/");
        }else{
            setErrorMessage(null);
            if(reason === "NEED_AUTHENTICATION" || reason === "NEED_DETAIL"){
                if(reason === "NEED_AUTHENTICATION")
                    retryAuthenticate(sessionStorage.getItem('MOUSEION/email'));
                history.push("/signup/detail");
            }else if(reason === "NOT_VALID"){
                setErrorMessage(reason);
            }
        }
    }, [accountInfo, isValidToAccess, reason]);

    const requestAuth = async (identity, password)=>{
        const result = await jwtAuthenticate(identity, password);
        if(result) {
            setValidationToAccess(true);
            setSignedIn(true);
        }else
            setErrorMessage("NOT_VALID");
    }
    
    const onClickHandler = (e) => {
        e.preventDefault();
        if(identity != null && password != null){
            if (e.target.innerHTML === "Signin") {
                requestAuth(identity, password);
            }
        }else{
            setErrorMessage("NOT_ENOUGH");
        }

        if (e.target.innerHTML === "Signup") {            
            history.push("/signup");
        }
        if(e.target.innerHTML === "Forget ID/PW"){            
            history.push("/forget");
        }
    }

    const [identity, setIdentity] = useState(null);
    const [password, setPassword] = useState(null);
    return (
        <div>
            Signin<br/>
            <input type="text" name="identity" placeholder="id" onChange={e => setIdentity(e.target.value)} /><br/>
            <input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} /><br/>
            <button onClick={onClickHandler}>Signin</button>
            <button onClick={onClickHandler}>Signup</button>
            <button onClick={onClickHandler}>Forget ID/PW</button>
            <br/>
            {errorMessage === "NOT_VALID" ? "이메일 또는 비밀번호를 확인해주세요":null}
            {errorMessage === "NOT_ENOUGH" ? "이메일 또는 비밀번호를 모두 입력해주세요":null}
        </div>
    );
}

export default Signin;
