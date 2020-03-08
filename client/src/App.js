import React, { Fragment, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import Navbar from './components/layout/navbar/navbar.component'
import Landing from './components/layout/landing/landing.component'
import Modal from 'react-modal'
import ReduxToastr from 'react-redux-toastr'
import Auth from './components/auth/auth.component'
import Verification from './components/auth/verification/verification.component'
import ResetPassword from './components/auth/resetPassword/resetPassword.component'
import Posts from './components/posts/posts.component'

import './sass/style.scss'
import './i18n'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

// Redux
import { Provider } from 'react-redux'
import store from './store'

Modal.setAppElement('body')

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Suspense fallback="loading">
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/auth" component={Auth} />
            <Route
              exact
              path="/verification/:activationToken"
              component={Verification}
            />
            <Route exact path="/reset_password" component={ResetPassword} />
            <Route exact path="/posts" component={Posts} />
          </Fragment>
        </Router>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          getState={state => state.toastr} // This is the default
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </Provider>
    </Suspense>
  )
}

export default App
