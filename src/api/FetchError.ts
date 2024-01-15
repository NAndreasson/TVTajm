export class FetchError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.name = "FetchError";
    this.statusCode = statusCode;
  }
}
