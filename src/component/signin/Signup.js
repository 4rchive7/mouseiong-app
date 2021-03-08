import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { registUser } from "../../store/api/userApi"

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
    const [isGoodToSubmit, setGoodToSubmit] = useState(false);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);

    const onClickHandler = (e) =>{
        props.setNewUser({
            ...props.newUser,
            email : email,
            name : name,
            password : password
        });
        sessionStorage.setItem("MOUSEION/email", email);
        props.setPage("submit");
    }

    const onChangeHandler = (e)=>{
        if(e.target.placeholder === "password"){
            setPassword(e.target.value);
        }else{
            setPasswordConfirm(e.target.value);
        }
        
    }

    const isEmailOk = str =>{
        return true;
    }
    useEffect(()=>{
        if(password === passwordConfirm)
            setGoodToSubmit(true);
        else
            setGoodToSubmit(false);
        
    }, [password, passwordConfirm, email, name]);
    return (
        <div>
            <p><input type="text" name="email" placeholder="email" onChange={e => { setEmail(e.target.value) }} /></p>
            <p><input type="text" name="name" placeholder="name" onChange={e => { setName(e.target.value) }} /></p>
            <p><input type="password" placeholder="password" onChange={onChangeHandler} /></p>
            <p><input type="password" placeholder="passwordConfirm" onChange={onChangeHandler} /></p>
            {(isGoodToSubmit || passwordConfirm == null) ? null : <div>something goes wrong...</div>}
            {isGoodToSubmit && passwordConfirm != null ? <button onClick={onClickHandler}>submit</button> : null}

        </div>
    );
}

export default connect()(Signup);