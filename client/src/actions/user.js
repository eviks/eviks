import axios from 'axios';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async'
import {GET_USER_POSTS, USER_ERROR} from '../actions/types';

export const getUserPosts = (userId) => async dispatch => {
    try {
        dispatch(asyncActionStart())
        const res = await axios.get(`/api/users/${userId}/posts?limit=15`)
        dispatch({type: GET_USER_POSTS, payload: res.data})
        dispatch(asyncActionFinish())
    } catch (error) {
        dispatch(asyncActionError())
        dispatch({
            type: USER_ERROR,
            payload: {
              message: error.message
            }
          })
    }
}