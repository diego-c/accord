import { Action } from "redux";
import { User } from "../state/initialState";

export interface UserAction extends Action {
    payload: User
}