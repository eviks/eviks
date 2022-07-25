import { FC, Dispatch, createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
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
  themeReducer,
  PostsActions,
  AuthActions,
  PostActions,
  ThemeActions,
} from './reducers';

interface AppContextState {
  posts: PostsContext;
  post: Post;
  auth: AuthContext;
  theme: 'light' | 'dark';
}

const contextDefaultValues: AppContextState = {
  posts: {
    posts: [],
    filters: defaultPostFilters,
    alternativeFilters: defaultAlternativeFilters,
  },
  auth: {
    isInit: false,
  },
  post: defaultPost,
  theme: Cookies.get('darkMode') === 'ON' ? 'dark' : 'light',
};

export const AppContext = createContext<{
  state: AppContextState;
  dispatch: Dispatch<PostsActions | AuthActions | PostActions | ThemeActions>;
}>({
  state: contextDefaultValues,
  dispatch: () => {
    return null;
  },
});

const mainReducer = (
  { posts, auth, post, theme }: AppContextState,
  action: PostsActions | AuthActions | PostActions | ThemeActions,
) => {
  return {
    posts: postsReducer(posts, action),
    auth: authReducer(auth, action),
    post: postReducer(post, action),
    theme: themeReducer(theme, action),
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
