import React from 'react';
import { connect } from 'react-redux';
import Ripple from '../../layout/ripple/ripple.component';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '../../../components/localization/LocalizedLink.component';
import PropTypes from 'prop-types';

const Hero = ({ city }) => {
  const [t] = useTranslation();
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">{t('landing.title')}</h1>
          <p className="lead">{t('landing.slogan')}</p>
          <div className="buttons">
            <LocalizedLink
              to={'/create_post'}
              className="btn btn-ghost mr-1"
              style={{ marginRight: '0.5rem' }}
            >
              {t('landing.sell')}
              <Ripple />
            </LocalizedLink>
            <LocalizedLink
              to={`/${city.routeName}/sale`}
              className="btn btn-primary"
            >
              {t('landing.search')}
              <Ripple />
            </LocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  city: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.locality.currentLocality.city,
});

export default connect(mapStateToProps)(Hero);
