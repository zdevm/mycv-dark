export class ErrorResponse extends Error {
    constructor(public errors: string[]) {
        super(errors.join(','));
    }
}
