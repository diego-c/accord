export class UserNotFoundError extends Error {

    public name: string;

    constructor(msg: string) {
        super(msg);
        this.name = 'UserNotFoundError';
    }
}