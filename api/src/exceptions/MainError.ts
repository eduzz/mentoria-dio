
export abstract class MainError extends Error {
  protected statusCode: number = 500;

  constructor(message: any) {
    super();
    this.message = message;
    this.name = "Error"; 
  }
    
  abstract toJSON(): any;
}