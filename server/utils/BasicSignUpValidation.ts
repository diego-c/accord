import { Gender } from '../db/schema';

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

function validateUsername(username: string): boolean {
    return Boolean(username.trim() && (username.length <= 20));
}

function validatePassword(password: string): boolean {
    return Boolean(password.trim() && (password.length >= 6) && (password.length <= 100));
}

function validateBirthdate(birthdate: string): boolean {
    return Boolean(/^\d{4}\-\d{2}\-\d{2}$/.test(birthdate));
}

function validateEmail(email: string): boolean {
    return Boolean((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) && (email.length <= 254));
}

function validateGender(gender: string): boolean {
    if ((gender === Gender.Male) || (gender === Gender.Female) || (gender === Gender.Other)) {
        return true;
    }
    return false;
}