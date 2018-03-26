import * as React from 'react';
import classes from '../../scss/components/Login/Login.scss';

export interface loginState {
    username: string,
    password: string
}

export interface loginProps {
    username: string,
    password: string,
    onInputChange: Function,
    onSubmit: Function
}

export const Login: React.SFC<loginProps> = (props) => {
    return (
        <form action="#" method="POST" className={classes.Login}>
            <p>Username:
                    <input
                    type="text"
                    autoComplete="username"
                    name="username"
                    required
                    onChange={e => props.onInputChange(e)}
                    value={props.username} />
            </p>
            <p>Password:
                    <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    onChange={e => props.onInputChange(e)}
                    value={props.password} />
            </p>
            <button
                type="submit"
                onClick={e => props.onSubmit(e)}>
                Login
            </button>
        </form>
    )
}