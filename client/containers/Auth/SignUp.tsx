import * as React from 'react';
import {
    validateEmail,
    validateUsername,
    validatePassword,
    validateBirthdate,
    validateGender
} from '../../utils/UserValidation';
import { Radio, Grid, TextField, FormControl, RadioGroup, FormControlLabel, FormLabel, Paper, Button, FormHelperText } from 'material-ui';
import { fetch } from '../../axios/connect';
import { AxiosResponse } from 'axios';
import { CustomError } from '../../errors/CustomError';
import { DatePicker } from 'material-ui-pickers';
import { format } from 'date-fns';

export type Field = {
    touched: boolean,
    type: string,
    label: string,
    value: string | Date,
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
    canSubmit: boolean,
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

class SignUp extends React.Component<{}, SignUpState> {

    state = {
        canSubmit: false,
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
                value: new Date(),
                required: true,
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

    componentDidUpdate() {
        const canSubmit = this.checkSubmit();
        if (this.state.canSubmit !== canSubmit) {
            this.setState({
                ...this.state,
                canSubmit: canSubmit
            })
        }
    }

    checkSubmit = () => {
        return Object.keys(this.state.formFields).every(field => {
            return (this.state.formFields as any)[field].required ? (this.state.formFields as any)[field].touched &&
                !(this.state.formFields as any)[field].validation.errorMsgs.length :
                true;
        });
    }

    handleDateChange = (date: any) => {
        this.setState({
            ...this.state,
            formFields: {
                ...this.state.formFields,
                birthdate: {
                    ...this.state.formFields.birthdate,
                    touched: true,
                    value: date
                }
            }
        })
    }

    handleSubmit = () => {
        const { formFields } = this.state;

        const fields = Object.keys(formFields).map(f => {
            if ((formFields as any)[f].value) {
                if (f !== 'birthdate') {
                    return {
                        [f]: (formFields as any)[f].value
                    }
                } else {
                    return {
                        [f]: format((formFields as any)[f].value, 'YYYY-MM-DD')
                    }
                }
            } else {
                return {
                    'gender': (formFields as any)[f].currentValue
                }
            }
        })
            .reduce((acc: { [k: string]: string }, field, index, arr) => {
                acc[Object.keys(arr[index])[0]] = Object.values(field)[0];
                return acc;
            }, {})

        console.log('Signing up as: \n' + JSON.stringify(fields, null, 2));

        fetch.post('/signup', fields)
            .then((res: AxiosResponse) => {
                console.log(JSON.stringify(res, null, 2));
            })
            .catch((err: CustomError) => {
                console.log('oops!! \n' + JSON.stringify(err.response.data, null, 2));
            })
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

            if (field === 'email') {
                errorMsgs.push("This does not look like a valid e-mail");
            } else if (field === 'username') {
                errorMsgs.push('The username should be between', '3 than 20 characters long');
            } else if (field === 'password') {
                errorMsgs.push('Passwords should be between', '6 and 100 characters long');
            } else if (field === 'birthdate') {
                errorMsgs.push('Birthdate should follow the format MM/DD/YYYY')
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
            const field = (currentState as any).formFields[e.currentTarget.name];
            const fieldName = e.currentTarget.name;
            const { value } = e.currentTarget;

            const validationError: boolean = Boolean(field.touched && !field.validation.validate(e.currentTarget.value));
            const errorMsgs: string[] = [];

            if ((/\s/g).test(value)) {
                errorMsgs.push('This field should not contain spaces')
            }

            if (fieldName === 'email') {
                errorMsgs.push("This does not look like a valid e-mail");
            } else if (fieldName === 'username') {
                errorMsgs.push('The username should be between', '3 than 20 characters');
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
    }

    render() {
        const { formFields } = this.state;

        return (
            <Paper elevation={4}
                style={{ padding: '4rem 0' }}>
                <form action="#" method="POST" style={{
                    width: 'calc(100% - 40px)'
                }}>
                    <Grid
                        container
                        alignItems="center"
                        spacing={40}
                        style={{ position: 'relative', marginBottom: '3rem' }}
                        alignContent="center"
                        justify="center"
                        direction="row">
                        <Grid
                            item
                        >
                            <Grid
                                container
                                alignItems="center"
                                alignContent="center"
                                direction="column"
                                spacing={16}
                            >
                                {
                                    Object.keys(formFields).map((field, index) => (
                                        (field !== 'gender') &&
                                        (field !== 'birthdate') &&
                                        <Grid
                                            item
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

                                                InputLabelProps={(formFields as any)[field].label === 'Birthdate' ? {
                                                    shrink: true
                                                } : {}}

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
                                <Grid
                                    item
                                    style={{ margin: '2rem 0' }}
                                >
                                    <DatePicker
                                        keyboard
                                        required
                                        label="Birthdate (MM/DD/YYYY)"
                                        format="MM/DD/YYYY"
                                        placeholder="03/30/2018"
                                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                        value={this.state.formFields.birthdate.value}
                                        animateYearScrolling={false}
                                        name="birthdate"
                                        onChange={this.handleDateChange}
                                    />
                                    {
                                        (formFields as any)['birthdate'].validation.errorMsgs.map((msg: string, index: number) => (
                                            <FormHelperText
                                                key={index}
                                                error={true}
                                            >
                                                {msg}
                                            </FormHelperText>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                        >
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
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid
                            item
                        >
                            <Button
                                variant="raised"
                                size="large"
                                color="primary"
                                disabled={!this.state.canSubmit}
                                onClick={this.handleSubmit}
                            >
                                Sign Up
                        </Button>
                        </Grid>
                    </Grid>
                </form >
            </Paper >
        )
    }
}

export default SignUp;