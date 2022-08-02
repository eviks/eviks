import axios from 'axios';
import { setURLParams } from '../utils/urlParams';
import Failure from '../utils/errors/failure';
import ServerError from '../utils/errors/serverError';
import getErrorMessage from '../utils/errors/getErrorMessage';
import { Settlement } from '../types';

export const getLocalities = async (queryParameters: {
  [key: string]: string;
}) => {
  const url = setURLParams(queryParameters);

  try {
    return await axios.get<Settlement[]>(`/api/localities/?${url}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};

export const getLocalitiesOnServer = async (queryParameters: {
  [key: string]: string;
}) => {
  const url = setURLParams(queryParameters);

  try {
    return await axios.get<Settlement[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/localities/?${url}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === '500')
      throw new ServerError(error.message);
    else {
      throw new Failure(getErrorMessage(error));
    }
  }
};
