import type from "./type";
import { handleActions } from "redux-actions";

let initialState = {
    keyword : null,
    data : null
}

export default handleActions({
    [type.SET_KEYWORD] : (state, action)=>({
        keyword : action.payload,
        data : state.data
    }),
    [type.SET_DATA] : (state, action)=>({
        keyword : state.keyword,
        data : action.payload
    })
}, initialState);