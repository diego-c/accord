import { UserInfo, UserResponse } from '../types/types';
import { actionTypes } from './actionTypes';
import { fetch } from '../../axios/connect';
import * as Axios from 'axios';

export const loadCredentials = (cred: UserInfo) => ({
    type: actionTypes.LOAD_CREDENTIALS,
    payload: cred
});

export const loadUserSuccess = (res: UserResponse) => (
    {
        type: actionTypes.LOAD_USER_SUCCESS,
        payload: res
    }
);

export const loadUserFailure = (err: Error) => (
    {
        type: actionTypes.LOAD_USER_FAILURE,
        payload: err
    }
);

export const fetchUser = (userInfo: UserInfo) => {
    return (dispatch: Function) => {
        fetch
            .post('/', userInfo)
            .then((res: Axios.AxiosResponse) => dispatch(loadUserSuccess(res.data)))
            .catch((err: Error) => dispatch(loadUserFailure(err)));
    }
}