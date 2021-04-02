import axios from 'axios'
import { removeQutation } from '../../util/StringUtils';

class AuthenticationService {
    // send username, password to the SERVER
    executeJwtAuthenticationService(username, password) {
        return axios.post('/authentication', {
            username,
            password
        })
    }

    executeJwtCheckRefreshToken() {    
        const params = {
            "aid" : removeQutation(localStorage.getItem("MOUSEION/authenticatedUser"))
        };
        const headers = {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + removeQutation(localStorage.getItem("MOUSEION/REFRESH_TOKEN"))
        };
        
        let config = {
            headers
          }
        console.log(headers);
        return axios.post('/check', params, config);

    }

    registerSuccessfulLoginForJwt(token) {
        console.log("===registerSuccessfulLoginForJwt===")
        const jsonToken = JSON.parse(token);
        sessionStorage.setItem('MOUSEION/ACCESS_TOKEN', JSON.stringify(jsonToken["ACCESS_TOKEN"]));
        localStorage.setItem('MOUSEION/REFRESH_TOKEN', JSON.stringify(jsonToken["REFRESH_TOKEN"]));
        localStorage.setItem('MOUSEION/authenticatedUser', JSON.stringify(jsonToken["AID"]));
    }

    
    requestSuccessfulGetAccessToekn(token) {
        console.log("===registerSuccessfulGetAccessToekn===")
        console.log(token);
        const jsonToken = JSON.parse(token);
        sessionStorage.setItem('MOUSEION/ACCESS_TOKEN', JSON.stringify(jsonToken["ACCESS_TOKEN"]));
        localStorage.setItem('MOUSEION/REFRESH_TOKEN', JSON.stringify(jsonToken["REFRESH_TOKEN"]));
    
    }

    removeAllToken(){
        sessionStorage.removeItem('MOUSEION/ACCESS_TOKEN');
        localStorage.removeItem('MOUSEION/REFRESH_TOKEN');
        localStorage.removeItem('MOUSEION/authenticatedUser');    
    }


    createJWTToken(token) {
        return 'Bearer ' + token
    }

    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    logout() {
        //sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    isUserLoggedIn() {
        const token = localStorage.getItem('token');
        console.log("===UserloggedInCheck===");
        console.log(token);

        if (token) {
            return true;
        }

        return false;
    }

    getLoggedInUserName() {
        //let user = sessionStorage.getItem('authenticatedUser')
        let user = localStorage.getItem('authenticatedUser');
        if (user === null) return '';
        return user;
    }
}

export default new AuthenticationService()