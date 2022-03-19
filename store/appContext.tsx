import { FC, Dispatch, createContext, useReducer } from 'react';
import { PostsContext, AuthContext } from '../types';
import {
  postsReducer,
  authReducer,
  PostsActions,
  AuthActions,
} from './reducers';

interface AppContextState {
  posts: PostsContext;
  auth: AuthContext;
}

const contextDefaultValues: AppContextState = {
  posts: { posts: [] },
  auth: {},
};

export const AppContext = createContext<{
  state: AppContextState;
  dispatch: Dispatch<PostsActions | AuthActions>;
}>({
  state: contextDefaultValues,
  dispatch: () => {
    return null;
  },
});

const mainReducer = (
  { posts, auth }: AppContextState,
  action: PostsActions | AuthActions,
) => {
  return {
    posts: postsReducer(posts, action),
    auth: authReducer(auth, action),
  };
};

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, contextDefaultValues);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
