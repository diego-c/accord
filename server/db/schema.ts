export enum Gender {
    Male = 'M',
    Female = 'F'
};

export interface SignUp {
    email: string,
    username: string,
    password: string,
    gender?: Gender,
    birthdate: string
}

export interface Login {
    username?: string,
    email?: string,
    password: string
}

export interface User {
    username: string,
    email: string,
    hash: string,
    salt: string,
    birthdate: string,
    gender?: Gender
}