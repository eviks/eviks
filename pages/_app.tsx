import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { parseCookies } from 'nookies';
import Layout from '../components/layout/Layout';
import createEmotionCache from '../utils/createEmotionCache';
import { User, CustomNextPage } from '../types';
import AppProvider from '../store/appContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  Component: CustomNextPage;
  emotionCache?: EmotionCache;
}

interface PageProps {
  user?: User;
  initDarkMode: boolean;
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { displayBottomNavigationBar, displaySearchBar } = Component;
  return (
    <CacheProvider value={emotionCache}>
      <AppProvider>
        <Layout
          displayBottomNavigationBar={displayBottomNavigationBar}
          displaySearchBar={displaySearchBar}
          {...pageProps}
        >
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </CacheProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const pageProps: PageProps = { initDarkMode: false };

  const { darkMode } = parseCookies(ctx);

  // Theme mode
  pageProps.initDarkMode = darkMode === 'ON';

  return { pageProps };
};

export default MyApp;
