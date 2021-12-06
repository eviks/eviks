import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from './types';

export const setAlert =
  (message, alertType, id, timeout = null) =>
  (dispatch) => {
    // Delete all pev alerts
    dispatch({ type: REMOVE_ALL_ALERTS });

    dispatch({
      type: SET_ALERT,
      payload: {
        message,
        alertType,
        id,
      },
    });

    if (timeout !== null) {
      setTimeout(() => {
        dispatch({ type: REMOVE_ALERT, payload: id });
      }, timeout);
    }
  };

export const deleteAlert = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALERT, payload: id });
};

export const deleteAllAlerts = () => (dispatch) => {
  dispatch({ type: REMOVE_ALL_ALERTS });
};
