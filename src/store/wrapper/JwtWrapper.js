import axios from "axios";
import { isEmpty, removeQutation } from "../../util/StringUtils";
import AuthenticationService from "../api/AuthenticationService";
import { jwtCheckRefreshToken } from "../api/userApi";

const setHeader = ()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("MOUSEION/ACCESS_TOKEN");
    axios.defaults.headers.post['Content-Type'] =  "application/json; charset=UTF-8";
}

export const requestGetWrapper = async (api, params, sessionStorageName) => {
    
    setHeader();
    console.log(params);
    let result = await axios.get(api, params).then(response=>{
        if(!isEmpty(sessionStorageName)){
            console.log(response.data);
            sessionStorage.setItem(sessionStorageName, JSON.stringify(response.data));
        }
        return response.data;
    }).catch(async error=>{        
        if(error.response.status == 401){
            let requestResultWithRefreshToken = await jwtCheckRefreshToken();
            console.log(requestResultWithRefreshToken);
            if(requestResultWithRefreshToken == true){
                setHeader();
                let result = await axios.get(api, params).then(response=>{
                    if(!isEmpty(sessionStorageName)){
                        sessionStorage.setItem(sessionStorageName, JSON.stringify(response.data));
                    }
                    return response.data;
                }).catch(error=>{
                    if (error.response) {
                        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                        console.log(error.response.data);
                        console.log(error.response.status); //이거면 refresh 토큰으로 요청보내기
                        console.log(error.response.headers);
                    }
                    else if (error.request) {
                        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                        // Node.js의 http.ClientRequest 인스턴스입니다.
                        console.log(error.request);
                    }
                    else {
                        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                        console.log('Error', error.message);
                    }
                    console.log(error.config);            
                })
            }else{
                AuthenticationService.removeAllToken();

            }
        }
        if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status); //이거면 refresh 토큰으로 요청보내기
            console.log(error.response.headers);
        }
        else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
        }
        else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
 
}


export const requestPostWrapper = async (api, params, sessionStorageName, token) => {
   
    const headers = {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token
    };
    
    let config = {
        headers
    }
    console.log(params);
    let result = await axios.post(api, params, config).then(response=>{
        if(!isEmpty(sessionStorageName)){
            console.log(response.data);
            sessionStorage.setItem(sessionStorageName, JSON.stringify(response.data));            
        }
        return response.data;
    }).catch(async error=>{        
        if(error.response.status == 401){
            let requestResultWithRefreshToken = await jwtCheckRefreshToken();
            console.log(requestResultWithRefreshToken);
            if(requestResultWithRefreshToken == true){
                setHeader();
                let result = await axios.post(api, params, config).then(response=>{
                    if(!isEmpty(sessionStorageName)){
                        sessionStorage.setItem(sessionStorageName, JSON.stringify(response.data));
                    }
                    return response.data;
                }).catch(error=>{
                    if (error.response) {
                        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                        console.log(error.response.data);
                        console.log(error.response.status); //이거면 refresh 토큰으로 요청보내기
                        console.log(error.response.headers);
                    }
                    else if (error.request) {
                        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                        // Node.js의 http.ClientRequest 인스턴스입니다.
                        console.log(error.request);
                    }
                    else {
                        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                        console.log('Error', error.message);
                    }
                    console.log(error.config);            
                })
            }else{
                AuthenticationService.removeAllToken();

            }
        }
        if (error.response) {
            // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status); //이거면 refresh 토큰으로 요청보내기
            console.log(error.response.headers);
        }
        else if (error.request) {
            // 요청이 이루어 졌으나 응답을 받지 못했습니다.
            // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
            // Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
        }
        else {
            // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
    
}