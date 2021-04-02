import { useEffect,useState } from "react";
import { connect } from "react-redux";
import { changeUserInfo, getMyInfomation } from "../../store/api/userApi";
import { isPasswordValid } from "../../util/LoginUtils";
import { isEmpty } from "../../util/StringUtils";

const MyInfo = props => {

    const [myData, setMyData] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);
    const [isPasswordOkay, setPasswordOkay] = useState(false);
    const [isPasswordConfirmOkay, setPasswordConfirmOkay] = useState(false);
    const [IGTG, setIGTG]= useState(true);

    const sendData = async ()=> {
        const aid = sessionStorage.getItem("MOUSEION/ACCESSTOKEN");
        await changeUserInfo({
            aid : aid, 
            password : password});
    }
    const onClickHandler = (e) =>{  
        if(e.target.innerHTML === '비번바꾸기'){
            if(isEmpty(password) || isEmpty(passwordConfirm)){
                setIGTG(false);
                console.log(`hi1`);
                return ;
            }
            if(!isPasswordOkay || !isPasswordConfirmOkay){
                setIGTG(false);
                console.log(`hi2`);
                return ;
            }
            sendData();
            console.log("done");
        }
    }

 
    const onChangeHandler = (e)=>{
        if(e.target.placeholder === "password"){
            setPassword(e.target.value);
        }else if(e.target.placeholder === "passwordConfirm"){
            setPasswordConfirm(e.target.value);
        }    
    }


    let completed = false;
    useEffect(()=>{
        const getData = async aid => {
            const serverData = null;// await getMyInfomation(aid);
            if(!completed){
                console.log(aid);
                setMyData(serverData);
                completed = true;
            }
        }
        if(myData == null) getData(sessionStorage.getItem("MOUSEION/ACCESSTOKEN"));
        if(myData != null){
            console.log(myData);
        }
        console.log("working");

        
        if(!isEmpty(password))
            setPasswordOkay(isPasswordValid(password));
            

        if(password === passwordConfirm)
            setPasswordConfirmOkay(true);
        else
            setPasswordConfirmOkay(false);
    },[myData, completed, password, passwordConfirm]);

  
    return (
        <div>
            MyInfo<br/>
            
            {isEmpty(myData) ? null : myData.name}
            <hr></hr>
            <p><input type="password" placeholder="password" onChange={onChangeHandler}/></p>
            {(isPasswordOkay === "VALID" || isEmpty(password)) ? null : <div><h6>{isPasswordOkay}</h6></div>}
            <p><input type="password" placeholder="passwordConfirm" onChange={onChangeHandler}/></p>
            {(isPasswordConfirmOkay || isEmpty(passwordConfirm)) ? null : <div><h6>입력하신 비밀번호가 일치하지 않습니다</h6></div>}
            <button onClick={onClickHandler}>비번바꾸기</button>
        </div>
    );
}

export default MyInfo;