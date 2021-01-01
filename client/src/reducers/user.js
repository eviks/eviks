import initialState from './initialStates/userInitialState';
import {
    GET_USER_POSTS,
    USER_ERROR
} from '../actions/types';

export default function (state = initialState, action) {
    const {type, payload} = action
    switch(type) {
        case GET_USER_POSTS:
            return {...state, posts: { ...state.posts, ...payload }}
        case USER_ERROR:
            return { ...state, error: payload }
        default:
            return state
    }
}