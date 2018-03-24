export enum Gender {
    Male = 'Male',
    Female = 'Female',
    None = 'None'
};

export interface SignUp {
    email: string,
    username: string,
    password: string,
    gender: 'M' | 'F' | null,
    birthdate: string
}

export interface Login {
    username: string,
    password: string
}

export interface User {
    username: string,
    email: string,
    hash: string,
    salt: string,
    birthdate: string,
    gender: 'M' | 'F' | null
}