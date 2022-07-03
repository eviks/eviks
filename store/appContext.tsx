import { FC, Dispatch, createContext, useReducer } from 'react';
import { PostsContext, AuthContext, Post } from '../types';
import {
  defaultPost,
  defaultPostFilters,
  defaultAlternativeFilters,
} from '../utils/defaultValues';
import {
  postsReducer,
  authReducer,
  postReducer,
  PostsActions,
  AuthActions,
  PostActions,
} from './reducers';

interface AppContextState {
  posts: PostsContext;
  post: Post;
  auth: AuthContext;
}

const contextDefaultValues: AppContextState = {
  posts: {
    posts: [],
    filters: defaultPostFilters,
    alternativeFilters: defaultAlternativeFilters,
  },
  auth: {},
  post: defaultPost,
};

export const AppContext = createContext<{
  state: AppContextState;
  dispatch: Dispatch<PostsActions | AuthActions | PostActions>;
}>({
  state: contextDefaultValues,
  dispatch: () => {
    return null;
  },
});

const mainReducer = (
  { posts, auth, post }: AppContextState,
  action: PostsActions | AuthActions | PostActions,
) => {
  return {
    posts: postsReducer(posts, action),
    auth: authReducer(auth, action),
    post: postReducer(post, action),
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
