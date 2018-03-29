import * as Redux from "redux";
import { User } from "../state/initialState";

export interface UserAction extends Redux.Action {
    payload: User
}