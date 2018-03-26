import * as React from 'react';
import classes from '../../scss/components/SignUp/SignUp.scss';

export const today: string =
    new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
        .split('/')
        .reduce((acc: string[], field: string, index: number) => {
            if (/\d{4}/.test(field)) {
                acc.splice(0, 0, field);
            } else if (index === 0) {
                acc.splice(1, 0, field);
            } else {
                acc.splice(2, 0, field);
            }
            return acc;
        }, [])
        .join('-')

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    None = 'None'
}

export interface signUpProps {
    email: string,
    username: string,
    password: string,
    gender?: Gender,
    birthdate: string,
    onInputChange: Function,
    onSubmit: Function
}

export interface signUpState {
    email: string,
    username: string,
    password: string,
    gender?: Gender,
    birthdate: string
}

export const SignUp: React.SFC<signUpProps> = (props) => {
    return (
        <form action="#" method="POST" className={classes.SignUp}>
            <p>E-mail:
                    <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    onChange={e => props.onInputChange(e)}
                    value={props.email} />
            </p>
            <p>Username:
                    <input
                    type="text"
                    name="username"
                    autoComplete="username"
                    required
                    onChange={e => props.onInputChange(e)}
                    value={props.username} />
            </p>
            <p>Password:
                    <input
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    onChange={e => props.onInputChange(e)}
                    value={props.password} />
            </p>
            <p>Gender:
                    <input
                    type="radio"
                    name="gender"
                    onChange={e => props.onInputChange(e)}
                    value={Gender.Male}
                />
                Male
                    <input
                    type="radio"
                    name="gender"
                    onChange={e => props.onInputChange(e)}
                    value={Gender.Female}
                />
                Female
                    <input
                    type="radio"
                    name="gender"
                    onChange={e => props.onInputChange(e)}
                    value={Gender.None}
                    defaultChecked
                />
                Prefer not to say
                    </p>
            <p>Birthdate:
                    <input
                    type="date"
                    name="birthdate"
                    required
                    onChange={e => props.onInputChange(e)}
                    value={props.birthdate} />
            </p>
            <button
                type="submit"
                onClick={e => props.onSubmit(e)}>
                Sign Up
            </button>
        </form>
    )
}