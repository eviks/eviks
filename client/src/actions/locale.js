import {
  CHANGE_LOCALE,
  SET_UI_TRANSLATIONS_LOADING,
  SET_UI_TRANSLATIONS_LOADED,
} from './types';

export const changeLocale = (locale) => ({
  type: CHANGE_LOCALE,
  locale,
});

export const setUiTranslationsLoading = () => ({
  type: SET_UI_TRANSLATIONS_LOADING,
});

export const setUiTranslationsLoaded = (isLoaded) => ({
  type: SET_UI_TRANSLATIONS_LOADED,
  isLoaded,
});
