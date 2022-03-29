import { Dispatch } from 'react';
import { Types } from '../store/reducers';

export const initPost = () => {
  return async (
    dispatch: Dispatch<{ type: Types.InitPost; payload: null }>,
  ) => {};
};
