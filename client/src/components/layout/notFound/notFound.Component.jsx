import React from 'react';
import { useTranslation } from 'react-i18next';
import Ripple from '../ripple/ripple.component';
import LocalizedLink from '../../localization/LocalizedLink.component';

import './notFound.style.scss';

const NotFound = () => {
  const [t] = useTranslation();

  return (
    <div className="container container-center">
      <h1>{t('notFound.title')}</h1>
      <h2 className="medium text-secondary">{t('notFound.text')}</h2>
      <div className="not-found-img my-1" />
      <div className="mt-1">
        <LocalizedLink to="/" className="btn btn-secondary">
          {t('notFound.homePage')}
          <Ripple />
        </LocalizedLink>
      </div>
    </div>
  );
};

export default NotFound;
