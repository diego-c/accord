export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
};

export enum GlobalRole {
    NOOB = 'NOOB',
    USER = 'USER',
    MODERATOR = 'MODERATOR',
    HOST = 'HOST',
    ADMIN = 'ADMIN'
}

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
    id: number,
    username: string,
    email: string,
    hash: string,
    salt: string,
    birthdate: string,
    joined: string,
    global_role: GlobalRole,
    gender: 'M' | 'F' | null
}

export interface BasicUser {
    username: string,
    email: string,
    hash: string,
    salt: string,
    birthdate: string,
    gender: 'M' | 'F' | null
}