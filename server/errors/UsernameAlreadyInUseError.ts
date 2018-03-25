export class UsernameAlreadyInUseError extends Error {
    public name: string;

    constructor(msg: string) {
        super(msg);
        this.name = 'UsernameAlreadyInUseError';
    }
}