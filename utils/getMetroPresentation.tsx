import Router from 'next/router';
import { MetroStation } from '../types';

const getMetroPresentation = (settlement: MetroStation) => {
  if (Router.locale === 'az') return settlement.name;
  if (Router.locale === 'ru' && settlement.nameRu) return settlement.nameRu;
  if (Router.locale === 'en' && settlement.nameEn) return settlement.nameEn;

  return settlement.name;
};

export default getMetroPresentation;
