import * as React from 'react';
import { SignUp, signUpState, Gender, today } from '../../components/Auth/SignUp';
import { Login, loginState } from '../../components/Auth/Login';
import { validateLogin, LoginValidation } from '../../utils/LoginValidation';
import { AxiosResponse } from 'axios';
import { fetch } from '../../axios/connect';
import { CustomError } from '../../errors/CustomError';
import { SignUpValidation, validateSignUp } from '../../utils/SignUpValidation';
import { Selector } from '../../components/Selector/Selector';
import classes from '../../scss/containers/Auth/Auth.scss';

enum current {
    SIGN_UP = 'signUp',
    LOGIN = 'login'
}

interface authState<S, L> {
    signUp: S,
    login: L,
    current: current
}

const initialState: authState<signUpState, loginState> = {
    signUp: {
        email: '',
        username: '',
        password: '',
        gender: Gender.None,
        birthdate: today
    },
    login: {
        username: '',
        password: ''
    },
    current: current.SIGN_UP
}

export class Auth extends React.Component<{}, authState<signUpState, loginState>> {

    state = { ...initialState };

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
            const validation: SignUpValidation | boolean = validateSignUp(this.state.signUp);

            if (typeof validation === 'boolean' && validation === false) {
                console.log('Please fill all fields');
                return;
            }
            if (!((validation as SignUpValidation).username)) {
                console.log('Username should not be empty and should have no more than 20 characters');
                return;
            }
            if (!((validation as SignUpValidation).password)) {
                console.log('Password should not be empty and should have between 6 and 100 characters');
                return;
            }
            if (!((validation as SignUpValidation).email)) {
                console.log('Invalid email');
                return;
            }
            if (!((validation as SignUpValidation).birthdate)) {
                console.log('Invalid birthdate');
                return;
            }
            if (!((validation as SignUpValidation).gender)) {
                console.log('Invalid gender');
                return;
            }

            console.log('Signing up as: \n' + JSON.stringify(this.state[curr]));

            fetch.post('/signup', this.state.signUp)
                .then((res: AxiosResponse) => {
                    console.log('From the server: \n' + JSON.stringify(res.data, null, 2))
                    this.setState(prevState => ({
                        signUp: { ...initialState.signUp },
                        current: prevState.current
                    }))
                })
                .catch((err: CustomError) => console.log('Oops! \n' + JSON.stringify(err.response.data, null, 2)));

        } else if (curr === current.LOGIN) {
            const validation: LoginValidation | boolean = validateLogin(this.state.login);
            if (typeof validation === 'boolean' && validation === false) {
                console.log('Please fill all fields');
                return;
            }
            if (!((validation as LoginValidation).username)) {
                console.log('Username should not be empty and should have no more than 20 characters');
                return;
            }
            if (!((validation as LoginValidation).password)) {
                console.log('Password should not be empty and should have between 6 and 100 characters');
                return;
            }
            console.log('Signing in as: \n' + JSON.stringify(this.state[curr]));
            fetch.post('/login', this.state.login)
                .then((res: AxiosResponse) => {
                    console.log('From the server: \n' + JSON.stringify(res.data, null, 2))
                    this.setState(prevState => ({
                        login: { ...initialState.login },
                        current: prevState.current
                    }))
                })
                .catch((err: CustomError) => console.log('Oops! \n' + JSON.stringify(err.response.data, null, 2)));
        }
        return;
    }

    switchToSignUp = () => {
        this.setState({
            current: current.SIGN_UP
        });
    };

    switchToLogin = () => {
        this.setState({
            current: current.LOGIN
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
            <div className={classes.Auth}>
                <Selector
                    switch={this.switchToSignUp}
                    activeBorderColor='#c2234f'>
                    Sign Up
                </Selector>

                <Selector
                    switch={this.switchToLogin}>
                    Login
                </Selector>
                {loginOrSignUp}
            </div>
        )
    }
}