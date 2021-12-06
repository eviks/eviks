import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from './types';

export const asyncActionStart = (payload = '') => {
  return { type: ASYNC_ACTION_START, payload };
};

export const asyncActionFinish = (payload = '') => {
  return { type: ASYNC_ACTION_FINISH, payload };
};

export const asyncActionError = (payload = '') => {
  return { type: ASYNC_ACTION_ERROR, payload };
};
