import React, { useState } from 'react';
import axios from 'axios';
import {Home} from './Home';

export function Signup() {
    const [currentPage, setPage] = useState("DefaultPage");

    const [userInfo, setUserInfo] = useState({
        type: "none",
        name: "none",
        email: "none",
        password: "none",
        company: "none",
        location: "none"
    });

    return (
        <div className="container">
            {currentPage === "DefaultPage" ? <DefaultPage setPage={setPage} /> : null}
            {currentPage === "JournalistSingupPage1" ? <JournalistSingupPage1 setPage={setPage} setUserInfo={setUserInfo} userInfo={userInfo} /> : null}
            {currentPage === "JournalistSingupPage2" ? <JournalistSingupPage2 setPage={setPage} setUserInfo={setUserInfo} userInfo={userInfo}/> : null}
            {currentPage === "JournalistSingupPage3" ? <JournalistSingupPage3 setPage={setPage} userInfo={userInfo}/> : null}
            {currentPage === "Home" ? <Home/> : null}
            {currentPage === "ExpertSignupPage1" ? <ExpertSignupPage1 /> : null}
            {currentPage === "ExpertSignupPage2" ? <ExpertSignupPage2 /> : null}
        </div>
    );
}

function DefaultPage({ setPage }) {
    return (
        <div className="Signup">
            <h3>I'm....</h3>
            <button onClick={() => { setPage("JournalistSingupPage1") }}>An Journalist</button>
            <button onClick={() => { setPage("ExpertSignupPage1") }}>An Expert</button>
        </div>
    );
}


const JournalistSingupPage1 = ({ setPage, setUserInfo, userInfo }) => {
    const [name, setName] = useState("None");
    const [email, setEmail] = useState("None");
    const [type, setType] = useState("journalis");
    const [password, setPassword] = useState("None");
    const [passwordConfirm, setPasswordConfirm] = useState("None");

    const onClickHandler = (e) => {
        e.preventDefault();
        let obj = userInfo;

        if (password !== passwordConfirm) {
            console.log("Not Matched Password");
        } else {
            obj.name = name;
            obj.email = email;
            obj.password = password;
            obj.type = type;
            setUserInfo(obj);
            setPage("JournalistSingupPage2");
        }
    }

    return (
        <div className="Signup">
            <input name="name" placeholder="name" type="text" onChange={(e) => { setName(e.target.value) }} />
            <input name="email" placeholder="email" type="text" onChange={(e) => { setEmail(e.target.value) }} />
            <input name="password" placeholder="password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
            <input name="password_confirm" placeholder="password_confirm" type="password" onChange={(e) => { setPasswordConfirm(e.target.value) }} />
            <button type="submit" onClick={onClickHandler}>submit</button>
        </div>
    );
}

const JournalistSingupPage2 = ({ setPage, setUserInfo, userInfo }) => {
    const [company, setCompany] = useState("none");
    const [location, setLocation] = useState("none");
    const onClickHandler = (e) => {
        e.preventDefault();
        let obj = userInfo;
        obj.company = company;
        obj.location = location;
        setUserInfo(obj);
        console.log(obj);
        setPage("JournalistSingupPage3");
    }
    return (
        <div className="Signup">
            <input name="company" placeholder="company" type="text" onChange={(e) => { setCompany(e.target.value) }} />
            <input name="location" placeholder="location" type="text" onChange={(e) => { setLocation(e.target.value) }} />
            <button type="submit" onClick={onClickHandler}>submit</button>
        </div>
    );
}

function JournalistSingupPage3({setPage, userInfo}) {
    const url = `/api/userList/newUser`;
    axios.post(url, userInfo).then((res) => {
        setPage("Home");
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    
    return (
        <div className="Signup">
            Please authenticate your account using your E-mail.:)
        </div>
    );
}

function ExpertSignupPage1(props) {
    return (
        <div className="Signup">
            ExpertSignupPage1
        </div>
    );
}

function ExpertSignupPage2(props) {
    return (
        <div className="Signup">
            ExpertSignupPage2
        </div>
    );
}

function ExpertSignupPage3(props) {
    return (
        <div className="Signup"
        >ExpertSignupPage3
        </div>
    );
}