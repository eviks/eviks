import React, { Fragment, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import PrivateRoute from './components/routing/privateRoute.component'
import ScrollToTop from './components/layout/scrollToTop/scrollToTop.component'
import Navbar from './components/layout/navbar/navbar.component'
import Landing from './components/layout/landing/landing.component'
import Modal from 'react-modal'
import ReduxToastr from 'react-redux-toastr'
import AuthForm from './components/auth/authForm.component'
import Verification from './components/auth/verification/verification.component'
import ResetPassword from './components/auth/resetPassword/resetPassword.component'
import Posts from './components/posts/postList/posts.component'
import Post from './components/posts/post/post.component'
import PostForm from './components/posts/postForm/postForm.component'

import './sass/style.scss'
import './i18n'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

// Yandex map
import { YMaps } from 'react-yandex-maps'
import { yandexAPIKey } from './config'

// Redux
import { Provider } from 'react-redux'
import store from './store'

Modal.setAppElement('body')

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  // Reference to navbar element
  let navRef = useRef(null)

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Suspense fallback="loading">
      <YMaps query={{ lang: 'az_AZ' }}>
        <Provider store={store}>
          <Router>
            <ScrollToTop />
            <Fragment>
              <Navbar navRef={navRef} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/auth" component={AuthForm} />
              <Route
                exact
                path="/verification/:activationToken"
                component={Verification}
              />
              <Route exact path="/reset_password" component={ResetPassword} />
              <Route
                exact
                path="/posts"
                component={() => <Posts navRef={navRef} />}
              />
              <Route path="/posts/:id" component={Post} />
              <PrivateRoute exact path="/create_post" component={PostForm} />
            </Fragment>
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
        </Provider>
      </YMaps>
    </Suspense>
  )
}

export default App
