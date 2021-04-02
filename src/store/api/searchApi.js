import axios from "axios";
import { useState } from "react";
import { requestGetWrapper } from "../wrapper/JwtWrapper";

const API = `/api/search`;

export const searchKeyword = async keyword =>{    
    const params = {params : {keyword:keyword}};
    return await requestGetWrapper(API+'/keyword', params, "MOUSEION/SearchList/listData");
}


// export const searchKeyword = async (params) =>{
//     let keyword="";
    
//     params.map(word=>{
//         keyword += word;
//     })
//     let ret = null;
//     console.log(keyword);
//     await axios.get('/api/search/keyword'
//     , {
//         params : {keyword : keyword}
//     }).then(response=>{
//         console.log(response.data);
//         sessionStorage.setItem("MOUSEION/SearchList/listData", JSON.stringify(response.data));
//         ret = response;
//     }).catch(error=>{
//         console.log(error);
//     });
//     return ret;
// }