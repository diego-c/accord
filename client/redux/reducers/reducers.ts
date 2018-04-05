import { initialState } from '../state/initialState';
import { actionTypes } from "../actions/actionTypes";
import * as Redux from "redux";
import { State } from '../types/types';

export const reducer: Redux.Reducer<any> = (state: State = initialState, action: Redux.AnyAction) => {
    if (action.type === actionTypes.LOAD_USER_SUCCESS) {
        return {
            ...state,
            user: action.payload.token
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
    } else if (action.type === actionTypes.UPDATE_ROUTE) {
        return {
            ...state,
            currentRoute: action.payload
        }
    }
    return state;
}