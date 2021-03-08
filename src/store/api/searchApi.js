import axios from "axios";
import { useState } from "react";

const API = `/api/search`;

export const searchKeyword = async keyword =>{
    let ret = null;
    await axios.get('/api/search/keyword', {
        params : {keyword : keyword}
    }).then(response=>{
        console.log(response.data);
        sessionStorage.setItem("MOUSEION/SearchList/listData", JSON.stringify(response.data));
        ret = response;
    }).catch(error=>{
        console.log(error);
    });
    return ret;
}

