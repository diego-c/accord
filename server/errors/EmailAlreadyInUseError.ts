export class EmailAlreadyInUseError extends Error {
    public name: string;

    constructor(msg: string) {
        super(msg);
        this.name = 'EmailAlreadyInUseError';
    }
}