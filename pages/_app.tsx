import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { parseCookies } from 'nookies';
import Layout from '../components/Layout';
import createEmotionCache from '../utils/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
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
  const { darkMode } = parseCookies(ctx);
  const pageProps = { initDarkMode: darkMode === 'ON' };

  return { pageProps };
};

export default MyApp;
