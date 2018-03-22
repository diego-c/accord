import * as React from 'react';
import { AxiosResponse } from 'axios';
import { fetch } from '../../axios/connect';

export interface signUpProps {
    isSignedIn: boolean
}

interface signUpState {
    username: string,
    password: string
}

export class SignUp extends React.Component<signUpProps, signUpState> {

    state = {
        username: '',
        password: ''
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'username') {
            this.setState({ username: e.target.value });
        } else {
            this.setState({ password: e.target.value });
        }
    }

    onSubmit = () => {
        if (this.state.username && this.state.password) {
            console.log('Signing up as: \n' + JSON.stringify(this.state));

            fetch.post('/signup', {
                username: this.state.username,
                password: this.state.password
            })
                .then((res: AxiosResponse) => console.log('From the server: \n' + JSON.stringify(res.data, null, 2)))
                .catch((err: Error) => console.log('Oops! \n' + err))
        }
    }

    render() {
        if (!this.props.isSignedIn) {
            return (
                <div>
                    <h3>Sign Up</h3>
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