import { initialState } from '../state/initialState';
import { actionTypes } from "../actions/actionTypes";
import * as Redux from "redux";

export const reducer: Redux.Reducer<any> = (state = initialState, action: Redux.AnyAction) => {
    if (action.type === actionTypes.LOAD_USER_SUCCESS) {
        return {
            ...state,
            test: action.payload
        }
    } else if (action.type === actionTypes.LOAD_USER_FAILURE) {
        return {
            ...state,
            error: action.payload
        }
    } else if (action.type === actionTypes.LOAD_CREDENTIALS) {
        return {
            ...state,
            userInfo: action.payload
        }
    }
    return state;
}