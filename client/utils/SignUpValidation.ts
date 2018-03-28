enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export interface SignUpValidation {
    username: boolean,
    password: boolean,
    email: boolean,
    birthdate: boolean,
    gender: boolean
}

export function validateSignUp(user: any): SignUpValidation | boolean {

    if (validateUser(user)) {
        return {
            username: validateUsername(user.username),
            password: validatePassword(user.password),
            email: validateEmail(user.email),
            birthdate: validateBirthdate(user.birthdate),
            gender: validateGender(user.gender)
        }
    }
    return false;
}

function validateUser(user: any): boolean {
    return Boolean(user.username && user.password && user.email && user.birthdate && user.gender);
}

export function validateUsername(username: string): boolean {
    return Boolean((username.length <= 20));
}

export function validatePassword(password: string): boolean {
    return Boolean((password.length >= 6) && (password.length <= 100));
}

export function validateBirthdate(birthdate: string): boolean {
    return Boolean(/\d{4}\-\d{2}\-\d{2}/.test(birthdate));
}

export function validateEmail(email: string): boolean {
    return Boolean((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) && (email.length <= 254));
}

export function validateGender(gender: string): boolean {
    if ((gender === Gender.Male) || (gender === Gender.Female) || (gender === Gender.Other)) {
        return true;
    }
    return false;
}