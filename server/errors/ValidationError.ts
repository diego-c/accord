export class ValidationError extends Error {

    public name: string;

    constructor(msg: string) {
        super(msg);
        this.name = 'ValidationError';
    }
}