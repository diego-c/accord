export interface LoginValidation {
    username: boolean,
    password: boolean
};

export function validateLogin(user: any): (LoginValidation | boolean) {
    if (validateUser(user)) {
        return {
            username: validateUsername(user.username),
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

function validatePassword(password: string) {
    return Boolean(password.trim() && (password.length >= 6) && (password.length <= 100));
}