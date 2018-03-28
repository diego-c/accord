import * as React from 'react';
import {
    validateEmail,
    validateUsername,
    validatePassword,
    validateBirthdate,
    validateGender
} from '../../utils/SignUpValidation';
import { Radio, Grid, TextField, FormControl, RadioGroup, FormControlLabel, FormLabel, Paper, Button, FormHelperText } from 'material-ui';

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
        .join('-');

export type Field = {
    touched: boolean,
    type: string,
    label: string,
    value: string,
    required: boolean,
    validation: {
        validate: (val: string) => boolean,
        error: boolean,
        errorMsgs: string[]
    },
    placeholder?: string,
    defaultValue?: string
}

type GenderField = {
    value: string,
    control: JSX.Element,
    label: string
}

interface SignUpState {
    loading: boolean,
    formFields: {
        email: Field,
        username: Field,
        password: Field,
        birthdate: Field,
        gender?: {
            currentValue: string,
            validation: (val: string) => boolean,
            fields: GenderField[]
        }
    }
}

export class SignUp extends React.Component<{}, SignUpState> {

    state = {
        loading: false,
        formFields: {
            email: {
                touched: false,
                type: 'email',
                label: 'E-mail',
                value: '',
                required: true,
                validation: {
                    validate: validateEmail,
                    error: false,
                    errorMsgs: []
                }
            },
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
            },
            birthdate: {
                touched: false,
                type: 'date',
                label: 'Birthdate',
                value: '',
                required: true,
                defaultValue: today,
                validation: {
                    validate: validateBirthdate,
                    error: false,
                    errorMsgs: []
                }
            },
            gender: {
                currentValue: 'Male',
                validation: validateGender,
                fields: [
                    {
                        value: 'Male',
                        label: 'Male',
                        control: <Radio />
                    },
                    {
                        value: 'Female',
                        label: 'Female',
                        control: <Radio />
                    },
                    {
                        value: 'Other',
                        label: 'Other',
                        control: <Radio />
                    }
                ]
            }
        }
    }

    handleSubmit = () => {

    }

    handleTouch = (e: React.FocusEvent<any>) => {
        const currentState = { ...this.state };
        this.setState({
            ...currentState,
            [e.currentTarget.name]: {
                ...(currentState as any)[e.currentTarget.name],
                touched: true
            }
        })
    }

    handleChange = (e: (React.ChangeEvent<any>)) => {
        const currentState = { ...this.state };
        if (e.currentTarget.name === 'gender') {
            this.setState({
                ...currentState,
                formFields: {
                    ...currentState.formFields,
                    gender: {
                        ...currentState.formFields.gender,
                        currentValue: e.currentTarget.value
                    }
                }
            })
        } else {
            this.setState({
                ...currentState,
                formFields: {
                    ...currentState.formFields,
                    [e.currentTarget.name]: {
                        ...(currentState as any).formFields[e.currentTarget.name],
                        value: e.currentTarget.value
                    }
                }
            })
        }
    }

    render() {
        const { formFields } = this.state;

        return (
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
                        alignContent="center"
                        direction="column">
                        {
                            Object.keys(formFields).map((field, index) => (
                                field !== 'gender' &&
                                <Grid
                                    item xs={12}
                                    xl={6}
                                    spacing={8}
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
                                        defaultValue={(formFields as any)[field].defaultValue || ""}

                                        onBlur={this.handleTouch}

                                        InputLabelProps={(formFields as any)[field].label === 'Birthdate' ? {
                                            shrink: true
                                        } : {}}

                                        error={
                                            (formFields as any)[field].touched
                                            &&
                                            (formFields as any)[field].error
                                        }
                                    />
                                    {
                                        (formFields as any)[field].touched
                                            &&
                                            (formFields as any)[field].error ?
                                            (
                                                (formFields as any)[field].errorMsgs.map((msg: string, index: number) => (
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
                        <Grid
                            item xs={12}
                            xl={6}
                            spacing={8}
                            style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <FormControl component="fieldset">
                                <FormLabel
                                    component="legend"
                                    style={{ marginBottom: '1rem' }}
                                >
                                    Gender
                            </FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    onChange={this.handleChange}
                                    name="gender"
                                    value={formFields.gender.currentValue}
                                >
                                    {
                                        formFields.gender['fields'].map((_, index, arr) => (
                                            <FormControlLabel
                                                key={index}
                                                value={arr[index].value}
                                                control={
                                                    <Radio color="primary" />}
                                                label={arr[index].label}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Button
                            variant="raised"
                            size="large"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                </form >
            </Paper >
        )
    }
}