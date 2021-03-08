import { createAction } from "redux-actions";
import type from "./type";

export const setSearchKeyword = createAction(
    type.SET_KEYWORD, keyword => keyword
);

export const setSearchList = createAction(
    type.SET_DATA, data => data
);