import * as React from 'react';
import { SignUp, signUpState, Gender, today } from '../../components/Auth/SignUp';
import { Login, loginState } from '../../components/Auth/Login';
import { AxiosResponse } from 'axios';
import { fetch } from '../../axios/connect';

enum current {
    SIGN_UP = 'signUp',
    LOGIN = 'login'
}

interface authState<S, L> {
    signUp: S,
    login: L,
    current: current
}

export class Auth extends React.Component<{}, authState<signUpState, loginState>> {

    state = {
        signUp: {
            email: '',
            username: '',
            password: '',
            gender: Gender.None,
            birthdate: today
        },
        login: {
            username: '',
            email: '',
            password: ''
        },
        current: current.SIGN_UP
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field: string = e.target.name;
        const val: string = e.target.value;

        switch (field) {
            case 'email':
                this.setState({
                    [this.state.current as any]: {
                        ...this.state[this.state.current],
                        email: val
                    }
                })
                break;

            case 'username':
                this.setState({
                    [this.state.current as any]: {
                        ...this.state[this.state.current],
                        username: val
                    }
                })
                break;

            case 'password':
                this.setState({
                    [this.state.current as any]: {
                        ...this.state[this.state.current],
                        password: val
                    }
                })
                break;

            case 'gender':
                this.setState({
                    [this.state.current as any]: {
                        ...this.state[this.state.current],
                        gender: Gender[val as Gender]
                    }
                });
                break;

            case 'birthdate':
                this.setState({
                    [this.state.current as any]: {
                        ...this.state[this.state.current],
                        birthdate: val
                    }
                });
                break;

            default:
                return;
        }
    }

    onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const curr = this.state.current;
        if (curr === current.SIGN_UP) {
            console.log('Signing up as: \n' + JSON.stringify(this.state[curr]));

            fetch.post('/signup', this.state.signUp)
                .then((res: AxiosResponse) => console.log('From the server: \n' + JSON.stringify(res.data, null, 2)))
                .catch((err: Error) => console.log('Oops! \n' + err));

        } else if (curr === current.LOGIN) {
            console.log('Signing in as: \n' + JSON.stringify(this.state[curr]));
            fetch.post('/login', this.state.login)
                .then((res: AxiosResponse) => {
                    console.log('From the server: \n' + JSON.stringify(res.data, null, 2))
                })
                .catch((err: Error) => console.log('Oops! \n' + err));
        }
        return;
    }

    switchMode = () => {
        this.setState({
            current: this.state.current === current.SIGN_UP ? current.LOGIN : current.SIGN_UP
        })
    }

    render() {
        let loginOrSignUp = null;
        if (this.state.current === current.SIGN_UP) {
            loginOrSignUp = <SignUp onInputChange={this.onInputChange} onSubmit={this.onSubmit} {...this.state.signUp} />;
        } else {
            loginOrSignUp = <Login onInputChange={this.onInputChange} onSubmit={this.onSubmit} {...this.state.login} />
        }
        return (
            <div>
                <button
                    onClick={this.switchMode}> Sign Up</button>
                <button
                    onClick={this.switchMode}>Login</button>
                {loginOrSignUp}
            </div>
        )
    }
}