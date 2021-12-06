import _ from 'lodash';
import i18n from 'i18next';
import axios from 'axios';

export const prefixPath = (path, prefix) => {
  return `/${prefix}/${_.trim(path, '/')}`;
};

export const setURLParams = (params) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key]) searchParams.set(key, params[key]);
  });
  return searchParams.toString();
};

export const getURLParams = (queryString) => {
  return new URLSearchParams(queryString);
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const priceFormatter = (num, digits) => {
  let si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: i18n.t('assets.formats.thousand') },
    { value: 1e6, symbol: i18n.t('assets.formats.million') },
    { value: 1e9, symbol: i18n.t('assets.formats.billion') },
  ];
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (
    (num / si[i].value).toFixed(digits).replace(rx, '$1') + ' ' + si[i].symbol
  );
};
