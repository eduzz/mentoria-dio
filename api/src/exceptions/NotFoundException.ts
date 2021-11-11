import { MainError } from "./MainError";

export class NotFoundError extends MainError {
    constructor(message: any) {
        super(message);
    }
}