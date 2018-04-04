import * as Redux from 'redux';
import * as Axios from 'axios';

export type User = {
    username: string,
    global_role?: string
}

export enum Role {
    'NOOB',
    'USER',
    'MODERATOR',
    'HOST',
    'ADMIN'
}

export type Room = {
    name: string,
    user_role: Role
}

export interface State {
    currentRoute: string | null,
    test: Object | null,
    user: User | null,
    rooms: Room[] | null,
    userInfo: UserInfo | null,
    error: Object | null
}

export interface UserInfo {
    token: string | null,
    publicKey: string | null
}

export interface UserResponse extends Redux.Action {
    response: Axios.AxiosResponse
}

export interface UserAction extends Redux.Action {
    payload: UserInfo
}