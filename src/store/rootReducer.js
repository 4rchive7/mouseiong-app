import { combineReducers, createStore } from "redux";
import search from './modules/search/reducer';
import user from './modules/user/reducer';

const rootReducer = combineReducers({
    search,
    user
});

export default rootReducer;