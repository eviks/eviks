import React, { Fragment, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import routes from './components/routing/routes.component'
import Localizer from './Localizer'
import PrivateRoute from './components/routing/privateRoute.component'
import ScrollToTop from './components/layout/scrollToTop/scrollToTop.component'
import Navbar from './components/layout/navbar/navbar.component'
import LocalitiesQuestion from './components/layout/localities/localitiesQuestion.component'
import Modal from 'react-modal'
import ReduxToastr from 'react-redux-toastr'

import { loadUser } from './actions/auth'
import { setCurrentLocality } from './actions/locality'
import setAuthToken from './utils/setAuthToken'

// Modal windows
Modal.setAppElement('body')

// User token
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = ({ uiTranslationsLoaded, loadUser, setCurrentLocality }) => {
  // Reference to navbar element
  let navRef = useRef(null)

  useEffect(() => {
    loadUser()

    if (localStorage.currentLocality)
      setCurrentLocality(JSON.parse(localStorage.currentLocality))
  }, [loadUser, setCurrentLocality])

  return (
    <Fragment>
      <Router>
        <Localizer>
          {uiTranslationsLoaded && (
            <Fragment>
              <ScrollToTop />
              <Navbar navRef={navRef} />
              <LocalitiesQuestion />
              <Switch>
                {routes.map((route, index) =>
                  route.private ? (
                    <PrivateRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ) : (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={
                        route.useNavRef
                          ? () => <route.component navRef={navRef} />
                          : route.component
                      }
                    />
                  )
                )}
              </Switch>
            </Fragment>
          )}
        </Localizer>
      </Router>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        getState={(state) => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  uiTranslationsLoaded: state.locale.uiTranslationsLoaded,
})

export default connect(mapStateToProps, { loadUser, setCurrentLocality })(App)
