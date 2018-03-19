import { User } from '../state/initialState';
import { Action } from 'redux';
import { actionTypes } from './actionTypes';

export const loadUser = (user: User): Action => (
    {
        type: actionTypes.LOAD_USER
    }
);