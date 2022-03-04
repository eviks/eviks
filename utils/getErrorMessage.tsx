import axios from 'axios';

interface ErrorObject {
  msg: string;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (axios.isAxiosError(error)) {
      const errors = error.response?.data.errors.map(
        (errorMessage: ErrorObject) => {
          return errorMessage.msg;
        },
      );
      return errors.join('/n');
    }
    return error.message;
  }
  return String(error);
};

export default getErrorMessage;
