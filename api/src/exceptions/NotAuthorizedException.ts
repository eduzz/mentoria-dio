import { MainError } from "./MainError";

export class NotAuthorizedException extends MainError {
    constructor(message: any) {
        super(message);
        this.statusCode = 401;
    }

    toJSON() {
        return {
            name: this.name,
            code: this.statusCode,
            message: this.message
        }
    }
}