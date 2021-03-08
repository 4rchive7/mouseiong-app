import { createAction } from "redux-actions";
import type from "./type";

export const signInSuccess = createAction(
    type.SIGNIN_SUCCESS, accountId => accountId
);
export const signInFail = createAction(
    type.SIGNIN_FAIL, errorMessage => errorMessage
);