import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store/api/userApi";

const Signin = props => {
    const [user, setUser] = useState();
    const [accountInfo, setAccountInfo] = useState(null);
    const [isValidToAccess, setValidationToAccess] = useState(false);

    // if(sessionStorage.getItem("MOUSEION/ACCESSTOCKEN") != null && sessionStorage.getItem("MOUSEION/ACCESSTOCKEN") !== 'invalid')
    //     props.history.push("/");


    useEffect(() => {
        
        if (accountInfo != null && isValidToAccess == false) {
            axios.post('/api/user/authenticate', accountInfo).then((response) => {
                sessionStorage.setItem('MOUSEION/ACCESSTOCKEN', response.data);
                setValidationToAccess(true);
            }).catch((error) => {
                setValidationToAccess(false);
            });
        }
        if(isValidToAccess){
            console.log("hit");
            props.history.push("/");
        }
        console.log(accountInfo);
        console.log(isValidToAccess);
    }, [accountInfo, isValidToAccess]);


    const onClickHandler = (e) => {
        if (e.target.innerHTML === "Signin") {
            setAccountInfo({
                identity: identity,
                password: password
            });
        }
        if (e.target.innerHTML === "Signup") {
            props.history.push("/signup");
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
        </div>
    );
}

const getParams = (state) => {
    return {
        userInfo: state
    }
}
export default connect(getParams)(Signin);
