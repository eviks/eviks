import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Hero from './hero/hero.component';
import CategoryCard from './categoryCard/categoryCard.component';
import SwipeBlock from './swipeBlock/swipeBlock.component';
import { useTranslation } from 'react-i18next';
import categorySale from '../../assets/img/photos/CategorySale.jpg';
import categoryNewBuildingsImg from '../../assets/img/photos/CategoryNewBuildings.jpg';
import categoryRentImg from '../../assets/img/photos/CategoryRent.jpg';
import categoryRentByDayImg from '../../assets/img/photos/CategoryRentByDay.jpg';
import categoryHouseImg from '../../assets/img/photos/CategoryHouse.jpg';
import PropTypes from 'prop-types';

import './landing.style.scss';

const Landing = ({ city }) => {
  const [t] = useTranslation();

  const saleAppartmentLinks = [
    {
      name: t('landing.categories.oneRoom'),
      url: `/${city.routeName}/sale?rooms=1&estateType=apartment`,
    },
    {
      name: t('landing.categories.twoRoom'),
      url: `/${city.routeName}/sale?rooms=2&estateType=apartment`,
    },
    {
      name: t('landing.categories.threeRoom'),
      url: `/${city.routeName}/sale?rooms=3&estateType=apartment`,
    },
  ];

  const newBuildingsLinks = [
    {
      name: t('landing.categories.oneRoom'),
      url: `/${city.routeName}/sale?rooms=1&estateType=apartment&apartmentType=newBuilding`,
    },
    {
      name: t('landing.categories.twoRoom'),
      url: `/${city.routeName}/sale?rooms=2&estateType=apartment&apartmentType=newBuilding`,
    },
    {
      name: t('landing.categories.threeRoom'),
      url: `/${city.routeName}/sale?rooms=3&estateType=apartment&apartmentType=newBuilding`,
    },
  ];

  const rentLinks = [
    {
      name: t('landing.categories.oneRoom'),
      url: `/${city.routeName}/rent?rooms=1`,
    },
    {
      name: t('landing.categories.twoRoom'),
      url: `/${city.routeName}/rent?rooms=2`,
    },
    {
      name: t('landing.categories.threeRoom'),
      url: `/${city.routeName}/rent?rooms=3`,
    },
  ];

  const rentPerDayLinks = [
    {
      name: t('landing.categories.rentAppartment'),
      url: `/${city.routeName}/rentPerDay?estateType=apartment`,
    },
    {
      name: t('landing.categories.rentHousePerDay'),
      url: `/${city.routeName}/rentPerDay?estateType=house`,
    },
  ];

  const HousesLinks = [
    {
      name: t('landing.categories.oneRoom'),
      url: `/${city.routeName}/sale?rooms=1&estateType=house`,
    },
    {
      name: t('landing.categories.twoRoom'),
      url: `/${city.routeName}/sale?rooms=2&estateType=house`,
    },
    {
      name: t('landing.categories.threeRoom'),
      url: `/${city.routeName}/sale?rooms=3&estateType=house`,
    },
  ];

  return (
    <Fragment>
      <Hero />
      <div className="container">
        <div className="category-card-wrapper my-2">
          <CategoryCard
            links={saleAppartmentLinks}
            title={t('landing.categories.buyAppartment')}
            img={categorySale}
          />
          <CategoryCard
            links={newBuildingsLinks}
            title={t('landing.categories.newBuildings')}
            img={categoryNewBuildingsImg}
          />
          <CategoryCard
            links={HousesLinks}
            title={t('landing.categories.houses')}
            img={categoryHouseImg}
          />
          <CategoryCard
            links={rentLinks}
            title={t('landing.categories.rent')}
            img={categoryRentImg}
          />
          <CategoryCard
            links={rentPerDayLinks}
            title={t('landing.categories.rentPerDay')}
            img={categoryRentByDayImg}
          />
        </div>
        <SwipeBlock />
      </div>
    </Fragment>
  );
};

Landing.propTypes = {
  city: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.locality.currentLocality.city,
});

export default connect(mapStateToProps)(Landing);
