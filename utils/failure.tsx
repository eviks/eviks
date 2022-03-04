class Failure extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, Failure.prototype);
  }
}

export default Failure;
