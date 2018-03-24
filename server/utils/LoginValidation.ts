export interface LoginValidation {
    username: boolean,
    email: boolean,
    password: boolean
};

export function validateLogin(user: any): (LoginValidation | boolean) {
    if (validateUser(user)) {
        return {
            username: validateUsername(user.username),
            email: validateEmail(user.email),
            password: validatePassword(user.password)
        }
    }
    return false;
}

function validateUser(user: any): boolean {
    return Boolean((user.username || user.email) && user.password);
}

function validateUsername(username: string) {
    return Boolean((username.trim()) && (username.length <= 20));
}

function validateEmail(email: string) {
    return Boolean((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) && (email.length <= 254));
}

function validatePassword(password: string) {
    return Boolean(password.trim() && (password.length >= 6) && (password.length <= 100));
}