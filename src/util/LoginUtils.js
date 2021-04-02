import { isEmpty } from "./StringUtils";


export const isEmailValid = email => {
    if (isEmpty(email))
        return false;
    
    const userEmail = email;
    if(userEmail.length > 50){
        return false;
    }
    let emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return emailReg.test(email);
}

export const isUserNameValid = name => {
    console.log(name);
    const username = name;
    const num = username.search(/[0-9]/g);
    const eng = username.search(/[a-z]/ig);
    const spe = username.search(/[`~!@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const space = username.search(/^\s+|\s+$/g);
    console.log(username);
    console.log(num);    
    console.log(eng);
    console.log(spe);
    console.log(space);

    if(isEmpty(username)){
        return "이름을 입력해주세요.";
    }

    if(num > -1 || eng > -1 || spe > -1){
        return "숫자, 영문, 특수기호는 사용하실 수 없습니다.";
    }

    if(space != -1){
        return "공백없이 입력해주세요.";
    }

  return "VALID";
}

export const isPasswordValid = (str) => {
    const pw = str;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/ig);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const space = pw.search(/^\s+|\s+$/g);

    if(pw.length < 8 || pw.length > 20){
        return "8자리 ~ 20자리 이내로 영문,숫자,특수문자를 혼합하여 입력해주세요.";
    }

    if(space != -1){
        return "공백없이 입력해주세요.";
    }

    if(num < 0 || eng < 0 || spe < 0 ){
        return "영문,숫자,특수문자를 혼합하여 입력해주세요.";
    }

    // if(pw !== repeatedPw) {
    //     return "비밀번호와 비밀번호 확인이 다릅니다.";
    // }

    return "VALID";
}