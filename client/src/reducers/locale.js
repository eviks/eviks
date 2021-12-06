import {
  CHANGE_LOCALE,
  SET_UI_TRANSLATIONS_LOADING,
  SET_UI_TRANSLATIONS_LOADED,
} from '../actions/types';
import { defaultLocale } from '../config/i18n';

const initialState = {
  locale: defaultLocale,
  uiTranslationsLoaded: false,
};

const localeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };

    case SET_UI_TRANSLATIONS_LOADING:
      return {
        ...state,
        uiTranslationsLoaded: false,
      };

    case SET_UI_TRANSLATIONS_LOADED:
      return {
        ...state,
        uiTranslationsLoaded: action.isLoaded,
      };

    default:
      return state;
  }
};

export default localeReducer;
