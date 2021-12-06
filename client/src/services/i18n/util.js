import { defaultLocale } from '../../config/i18n';
import { prefixPath } from '../util';

export const localizeRoutes = (routes) => {
  return routes.map((route) => {
    // we default to localizing
    if (route.localize !== false) {
      return {
        ...route,
        path:
          typeof route.path === 'object'
            ? route.path.map((path) => prefixPath(path, ':locale'))
            : prefixPath(route.path, ':locale'),
      };
    }
    return { ...route };
  });
};

export const getLocaleFromPath = (path) => {
  if (path === '/') {
    return defaultLocale;
  }

  return path.split('/')[1];
};

export const switchHtmlLocale = (locale) => {
  window.document.documentElement.lang = locale;
};
