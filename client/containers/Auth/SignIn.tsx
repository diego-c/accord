import * as React from 'react';
import { Field } from './SignUp';
import { fetch } from '../../axios/connect';
import { validateUsername, validatePassword } from '../../utils/UserValidation';
import { Paper, Grid, TextField, FormHelperText, Button } from 'material-ui';
import { CustomError } from '../../errors/CustomError';
import { AxiosResponse } from 'axios';
import { CircularProgress } from 'material-ui';
import { Notification } from '../../components/Notification/Notification';

interface SignInFields {
    username: Field,
    password: Field
}

interface SignInState {
    signInError: {
        error: boolean,
        message: string
    },
    canSubmit: boolean,
    loading: boolean,
    formFields: SignInFields
}

class SignIn extends React.Component<{}, SignInState> {
    state = {
        signInError: {
            error: false,
            message: ''
        },
        canSubmit: false,
        loading: true,
        formFields: {
            username: {
                touched: false,
                type: 'text',
                label: 'Username',
                value: '',
                required: true,
                validation: {
                    validate: validateUsername,
                    error: false,
                    errorMsgs: []
                }
            },
            password: {
                touched: false,
                type: 'password',
                label: 'Password',
                value: '',
                required: true,
                validation: {
                    validate: validatePassword,
                    error: false,
                    errorMsgs: []
                }
            }
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            loading: false
        })
    }

    componentDidUpdate() {
        const canSubmit = this.checkSubmit();
        if (this.state.canSubmit !== canSubmit) {
            this.setState({
                ...this.state,
                canSubmit
            })
        }
    }

    checkSubmit = () => {
        return Object.keys(this.state.formFields).every((field) => {
            return this.state.formFields[field as (keyof SignInFields)].required ? this.state.formFields[field as (keyof SignInFields)].touched &&
                !this.state.formFields[field as (keyof SignInFields)].validation.errorMsgs.length :
                true;
        });
    }

    handleTouch = (e: React.FocusEvent<any>, field: string) => {

        const currentState = { ...this.state };
        const { value } = e.target;
        const validationError = !(currentState as any).formFields[field].validation.validate(value);

        const errorMsgs = [];

        if (!value) {
            errorMsgs.push('This field is required');
        }

        if ((/\s/g).test(value)) {
            errorMsgs.push('This field should not contain spaces')
        }

        if (validationError) {

            if (field === 'username') {
                errorMsgs.push('The username should be between', '3 than 20 characters');
            } else if (field === 'password') {
                errorMsgs.push('Passwords should be between', '6 and 100 characters long');
            }
        }

        this.setState({
            ...currentState,
            formFields: {
                ...currentState.formFields,
                [field]: {
                    ...(currentState as any).formFields[field],
                    touched: true,
                    validation: {
                        ...(currentState as any).formFields[field].validation,
                        error: (!value || validationError) ? true : false,
                        errorMsgs
                    }
                }
            }
        })
    }

    handleChange = (e: React.ChangeEvent<any>) => {
        const currentState = { ...this.state };
        const field = (currentState as any).formFields[e.currentTarget.name];
        const fieldName = e.currentTarget.name;
        const { value } = e.currentTarget;

        const validationError: boolean = Boolean(field.touched && !field.validation.validate(e.currentTarget.value));
        const errorMsgs: string[] = [];

        if ((/\s/g).test(value)) {
            errorMsgs.push('This field should not contain spaces')
        }

        if (fieldName === 'username') {
            errorMsgs.push('The username should be between', '3 than 20 characters long');
        } else if (fieldName === 'password') {
            errorMsgs.push('Passwords should be between', '6 and 100 characters long');
        }

        this.setState({
            ...currentState,
            formFields: {
                ...currentState.formFields,
                [fieldName]: {
                    ...(currentState as any).formFields[fieldName],
                    value,
                    validation: {
                        ...(currentState.formFields as any)[fieldName].validation,
                        error: validationError,
                        errorMsgs
                    }
                }
            }
        })
    }

    handleSubmit = () => {
        this.setState({
            ...this.state,
            loading: true
        });

        const { formFields } = this.state;

        const fields = Object.keys(formFields).map(f => {
            return {
                [f]: (formFields as any)[f].value
            }
        })
            .reduce((acc: { [k: string]: string }, field, index, arr) => {
                acc[Object.keys(arr[index])[0]] = Object.values(field)[0];
                return acc;
            }, {})

        fetch.post('/signin', fields)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('public_key', res.data['public_key']);
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
            .catch((err: CustomError) => {
                this.setState({
                    ...this.state,
                    loading: false,
                    signInError: {
                        error: true,
                        message: err.response.data.message
                    }
                })
            })
    }

    handleNotification = (_: React.SyntheticEvent<any>, __: string) => {
        this.setState({
            ...this.state,
            signInError: {
                error: false,
                message: ''
            }
        })
    }

    render() {
        const { formFields } = this.state;
        const { loading } = this.state;
        const { error } = this.state.signInError;
        const { message: errorMsg } = this.state.signInError;

        return loading ?
            (
                <Grid
                    container
                    direction="row"
                    style={{ width: '100%' }}
                    justify="center"
                >
                    <Grid item>
                        <CircularProgress style={{ margin: '10rem auto' }} size={80} />
                    </Grid>
                </Grid>
            )
            : (
                <React.Fragment>
                    <Notification
                        open={error}
                        vertical="top"
                        horizontal="center"
                        message={errorMsg}
                        close={this.handleNotification}
                    />

                    <Paper elevation={4} style={{
                        padding: '1rem'
                    }}>
                        <form action="#" method="POST" style={{
                            width: 'calc(100% - 16px)'
                        }
                        }>
                            <Grid
                                container
                                alignItems="center"
                                spacing={8}
                                alignContent="center"
                                direction="column"
                                style={{ padding: '3rem' }}>
                                {
                                    Object.keys(formFields).map((field, index) => (
                                        <Grid
                                            item xs={12}
                                            xl={6}
                                            key={index}
                                        >
                                            <TextField
                                                key={index}

                                                name={field}

                                                type={(formFields as any)[field].type}

                                                label={(formFields as any)[field].label}

                                                value={(formFields as any)[field].value}

                                                required={(formFields as any)[field].required}

                                                onChange={this.handleChange}
                                                margin="normal"

                                                onBlur={e => this.handleTouch(e, field)}

                                                error={
                                                    (formFields as any)[field].touched
                                                    &&
                                                    (formFields as any)[field].validation.error
                                                }
                                            />
                                            {
                                                (formFields as any)[field].touched
                                                    &&
                                                    (formFields as any)[field].validation.error ?
                                                    (
                                                        (formFields as any)[field].validation.errorMsgs.map((msg: string, index: number) => (
                                                            <FormHelperText
                                                                key={index}
                                                                error={true}>
                                                                {msg}
                                                            </FormHelperText>
                                                        ))
                                                    ) : null
                                            }
                                        </Grid>
                                    ))
                                }
                                <Button
                                    variant="raised"
                                    size="large"
                                    color="primary"
                                    disabled={!this.state.canSubmit}
                                    onClick={this.handleSubmit}
                                    style={{ marginTop: '3rem' }}
                                >
                                    Sign In
                        </Button>
                            </Grid>
                        </form >
                    </Paper >
                </React.Fragment>
            )
    }
}

export default SignIn;