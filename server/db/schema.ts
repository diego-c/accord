enum Gender {
    Male = 'M',
    Female = 'F'
};

export interface User {
    id: number,
    username: string,
    hash: string,
    salt: string,
    gender?: Gender,
    age?: number
};

export interface Login {
    username?: string,
    email?: string,
    password: string
}