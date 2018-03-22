import * as React from 'react';
import { AxiosResponse } from 'axios';
import { fetch } from '../../axios/connect';

export interface signUpProps {
    isSignedIn: boolean
}

const today: string =
    new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/')
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

enum Gender {
    Male = 'Male',
    Female = 'Female'
}

interface signUpState {
    email: string,
    username: string,
    password: string,
    gender?: Gender,
    birthdate: string
}

export class SignUp extends React.Component<signUpProps, signUpState> {

    state = {
        email: '',
        username: '',
        password: '',
        gender: Gender.Male,
        birthdate: today
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                this.setState({ email: e.target.value });
                break;

            case 'username':
                this.setState({ username: e.target.value });
                break;

            case 'password':
                this.setState({ password: e.target.value });
                break;

            case 'gender':
                this.setState({ gender: e.target.value === 'Male' ? Gender.Male : Gender.Female });
                break;

            case 'birthdate':
                console.log('Birthdate: ' + e.target.value);
                this.setState({ birthdate: e.target.value });
                break;

            default:
                return;
        }
    }

    onSubmit = () => {
        if (this.state.username && this.state.password) {
            console.log('Signing up as: \n' + JSON.stringify(this.state));

            fetch.post('/signup', this.state)
                .then((res: AxiosResponse) => console.log('From the server: \n' + JSON.stringify(res.data, null, 2)))
                .catch((err: Error) => console.log('Oops! \n' + err))
        }
    }

    render() {
        if (!this.props.isSignedIn) {
            return (
                <div>
                    <h3>Sign Up</h3>
                    <p>E-mail:
                        <input
                            type="email"
                            name="email"
                            onChange={e => this.onInputChange(e)}
                            value={this.state.email} />
                    </p>
                    <p>Username:
                        <input
                            type="text"
                            name="username"
                            onChange={e => this.onInputChange(e)}
                            value={this.state.username} />
                    </p>
                    <p>Password:
                         <input
                            type="password"
                            name="password"
                            onChange={e => this.onInputChange(e)}
                            value={this.state.password} />
                    </p>
                    <p>Gender:
                         <input
                            type="radio"
                            name="gender"
                            onChange={e => this.onInputChange(e)}
                            value={Gender.Male}
                            checked />
                        Male
                        <input
                            type="radio"
                            name="gender"
                            onChange={e => this.onInputChange(e)}
                            value={Gender.Female} />
                        Female
                    </p>
                    <p>Birthdate:
                         <input
                            type="date"
                            name="birthdate"
                            onChange={e => this.onInputChange(e)}
                            value={this.state.birthdate} />
                    </p>
                    <button onClick={this.onSubmit}>
                        Sign Up
                    </button>
                </div>
            )
        } else {
            return null;
        }
    }
}