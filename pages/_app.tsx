import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { parseCookies, destroyCookie } from 'nookies';
import axios from 'axios';
import Layout from '../components/Layout';
import createEmotionCache from '../utils/createEmotionCache';
import { User } from '../types';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

interface PageProps {
  user?: User;
  initDarkMode: boolean;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </CacheProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const pageProps: PageProps = { initDarkMode: false };

  const { token, darkMode } = parseCookies(ctx);

  // Load user
  if (!token) {
    destroyCookie(ctx, 'token');
  } else {
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      const response = await axios.get<User>(
        `${process.env.BASE_URL}/api/auth`,
        config,
      );
      pageProps.user = response.data;
    } catch (error) {
      destroyCookie(ctx, 'token');
    }
  }

  // Theme mode
  pageProps.initDarkMode = darkMode === 'ON';

  return { pageProps };
};

export default MyApp;
