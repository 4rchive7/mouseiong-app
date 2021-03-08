import { handleActions } from "redux-actions";
import type from "./type";

let initState = {
    accountId : 'notVaild',
    connectStatus : false,
    createdAccountDate : null,
    lastSignedInDate : null,
    errorMessage : null
};

export default handleActions({
    [type.SIGNIN_SUCCESS] : (state, action)=>({
        ...state,
        accountId : action.payload,
        connectStatus : true
    }),
    [type.SIGNIN_FAIL] : (state, action) => ({
        ...state,
        connectStatus : false,
        errorMessage : action.payload
    })
}, initState);
