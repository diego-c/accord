import { State, initialState } from "../state/initialState";
import { actionTypes } from "../actions/actionTypes";
import { Reducer } from "redux";

export const reducer: Reducer<State> = (state = initialState, action) => {
    if (action.type === actionTypes.LOAD_USER) {
        return {
            user: {
                id: action.payload.id,
                username: action.payload.username
            }
        }
    }
    return state;
}