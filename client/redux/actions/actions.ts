import { User } from '../state/initialState';
import { actionTypes } from './actionTypes';
import { UserAction } from './userActions';

export const loadUser = (user: User): UserAction => (
    {
        type: actionTypes.LOAD_USER,
        payload: user
    }
);