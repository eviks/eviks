import Router from 'next/router';
import { Settlement } from '../types';

const getSettlementPresentation = (settlement: Settlement) => {
  if (Router.locale === 'az') return settlement.name;
  if (Router.locale === 'ru' && settlement.nameRu) return settlement.nameRu;
  if (Router.locale === 'en' && settlement.nameEn) return settlement.nameEn;

  return settlement.name;
};

export default getSettlementPresentation;
