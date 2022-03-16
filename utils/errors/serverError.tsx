class ServerError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export default ServerError;
