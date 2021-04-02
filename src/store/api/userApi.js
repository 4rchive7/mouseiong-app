import axios from "axios";
import { removeQutation } from "../../util/StringUtils";
import { requestGetWrapper} from "../wrapper/JwtWrapper";
import AuthenticationService from "./AuthenticationService";

const API = `/signin`;

export const jwtAuthenticate = async (identity, password) => {
    const ret = await AuthenticationService.executeJwtAuthenticationService(identity, password).then(response => {
        AuthenticationService.registerSuccessfulLoginForJwt(response.data.jwt);
        return true;
    }).catch(error => {
        return false;
    })
    return ret;
}


export const jwtCheckRefreshToken = async () => {

    const params = {
        "aid": removeQutation(localStorage.getItem("MOUSEION/authenticatedUser"))
    };

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("MOUSEION/REFRESH_TOKEN")
    };

    const config = {
        headers
    }
    console.log(headers);
    const result = await axios.post('/check', params, config).then(response => {
        console.log(response.data.jwt);
        const token = JSON.parse(response.data.jwt);
        sessionStorage.setItem("MOUSEION/ACCESS_TOKEN", token['ACCESS_TOKEN']);
        localStorage.setItem("MOUSEION/REFRESH_TOKEN", token['REFRESH_TOKEN']);

        return true;
    }).catch(error => {
        console.log(error);
        return false;
    })

    return result;
}


// export const searchKeyword = async keyword =>{    
//     const params = {params : {keyword:keyword}};
//     return await requestGetWrapper(API+'/keyword', params, "MOUSEION/SearchList/listData");
// }

export const getUserDetail = async email => {
    const params = { params: { email: email } };
    return await requestGetWrapper(API + '/detail', params, 'MOUSEION/Searh/Detial');
}

//----------------------------------------------------------------------------------------------------------
export const authenticate = async accountInfo => {
    await axios.post(API + `/authenticate`, accountInfo).then((response) => {
        console.log(response);
        sessionStorage.setItem('MOUSEION/ACCESSTOKEN', response.data);
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
}

export const registUser = async newUserInfo => {
    let status = await axios.post(API + `/regist/json`, newUserInfo).then((response) => {
        console.log(response);
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
    return status;
}

export const isEmailExistInServer = async email => {
    const params = {
        email: email
    };
    const status = await axios.post(API + `/isEmailExist/json`, params
    ).then((response) => {
        console.log(response);
        return response.data;
    }).catch((error) => {
        console.log(error);
        return false;
    });
    return status;
}



export const updateUserDetail = async userDetailInfo => {
    const status = await axios.post(API + `/registDetail/json`, userDetailInfo).then((response) => {
        console.log(response);
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
    return status;
}


// export const getUserDetail = async email =>{
//     const result = await axios.get('/api/user/detail', {
//         params : {email : email}
//     }).then(response=>{
//         sessionStorage.setItem("MOUSEION/Searh/Detial", JSON.stringify(response.data));
//         return response.data;
//     }).catch(error=>{
//         return null;
//     });
// }

export const checkEmailAuth = async email => {
    const result = await axios.get('/signin/check', {
        params: { email: email }
    }).then(response => {
        if (response.data === "VALID")
            return true;
        else
            return false;
    }).catch(error => {
        return false;
    });
    return result;
}


export const retryAuthenticate = async email => {
    axios.get('/signin/retryAuthenticate', {
        params: { email: email }
    })
}



export const getNewTempPasswordFromServer = async email => {
    await axios.post(API + `/forget/json`, email).catch((error) => {
        console.log(error);
        return false;
    });
}


export const changeUserInfo = async password => {
    console.log("working##########3");
    await axios.post(API + `/changeinfo/json`, password).then(response => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
        return false;
    });
}


export const getMyInfomation = async aid => {
    await axios.get('/signin/myinfo', {
        params: { aid: aid }
    }
    ).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(error => {
        return null;
    });
}