import axios from "axios";

const API = `/api/user`;

export const authenticate = async accountInfo =>{
    await axios.post(API + `/authenticate`, accountInfo).then((response)=>{
        console.log(response);
        sessionStorage.setItem('MOUSEION/ACCESSTOCKEN', response.data);
        return true;
    }).catch((error)=>{
        console.log(error);
        return false;
    });
}

export const registUser = async newUserInfo =>{
    let status = await axios.post(API + `/regist/json`, newUserInfo).then((response)=>{
        console.log(response);
        return true;
    }).catch((error)=>{
        console.log(error);
        return false;
    });
    return status;
}


export const updateUserDetail = async userDetailInfo =>{
    const status = await axios.post(API + `/registDetail/json`, userDetailInfo).then((response)=>{
        console.log(response);
        return true;
    }).catch((error)=>{
        console.log(error);
        return false;
    });
    return status;
}


export const getUserDetail = async email =>{
    const result = await axios.get('/api/user/detail', {
        params : {email : email}
    }).then(response=>{
        sessionStorage.setItem("MOUSEION/Searh/Detial", JSON.stringify(response.data));
        return response.data;
    }).catch(error=>{
        return null;
    });
}

export const checkEmailAuth = async email => {
    const result = await axios.get('/api/user/check', {
        params : {email : email}
    }).then(response=>{
        if(response.data === "VALID")
            return true;
        else    
            return false;
    }).catch(error=>{
        return false;
    });
    return result;
}
