
export class MainError extends Error {
    constructor(message: any) {
      super();
      this.message = message;
      this.name = "Error"; 
    }
}