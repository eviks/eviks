import { Dispatch } from 'react';
import Cookies from 'js-cookie';
import { Types } from '../store/reducers';

export const setTheme = (theme: 'light' | 'dark') => {
  return async (
    dispatch: Dispatch<{ type: Types.SetTheme; payload: 'light' | 'dark' }>,
  ) => {
    Cookies.set('darkMode', theme === 'dark' ? 'ON' : 'OFF', { expires: 365 });
    dispatch({ type: Types.SetTheme, payload: theme });
  };
};
