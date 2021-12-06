import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../layout/spinner/spinner.component';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  userIsLoading,
  locale,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      userIsLoading ? (
        <Spinner className="centered-spinner" />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={`/${locale}/auth`} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  userIsLoading: PropTypes.bool.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userIsLoading: state.auth.userIsLoading,
  locale: state.locale.locale,
});

export default connect(mapStateToProps)(PrivateRoute);
