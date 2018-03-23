import * as React from 'react';

export interface loginState {
    username?: string,
    email?: string,
    password: string
}

export interface loginProps {
    username?: string,
    email?: string,
    password: string,
    onInputChange: Function,
    onSubmit: Function
}

export const Login: React.SFC<loginProps> = (props) => {
    return (
        <form action="#" method="POST">
            <h3>Login</h3>
            <p>E-mail:
                    <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    onChange={e => props.onInputChange(e)}
                    value={props.email} />
            </p>
            <p>Username:
                    <input
                    type="text"
                    autoComplete="username"
                    name="username"
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