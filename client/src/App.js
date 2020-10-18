import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import PrivateRoute from './components/routing/privateRoute.component'
import ScrollToTop from './components/layout/scrollToTop/scrollToTop.component'
import Navbar from './components/layout/navbar/navbar.component'
import LocalitiesQuestion from './components/layout/localities/localitiesQuestion.component'
import Landing from './components/landing/landing.component'
import Modal from 'react-modal'
import ReduxToastr from 'react-redux-toastr'
import AuthForm from './components/auth/authForm.component'
import Verification from './components/auth/verification/verification.component'
import ResetPassword from './components/auth/resetPassword/resetPassword.component'
import PasswordConfirmation from './components/auth/resetPassword/passwordConfirmation.component'
import Posts from './components/posts/postList/posts.component'
import Post from './components/posts/post/post.component'
import PostForm from './components/posts/postForm/postForm.component'

import './sass/style.scss'
import './i18n'
import { loadUser } from './actions/auth'
import { setCurrentLocality } from './actions/locality'
import setAuthToken from './utils/setAuthToken'

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

    if (localStorage.currentLocality)
      store.dispatch(setCurrentLocality(JSON.parse(localStorage.currentLocality)))
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Navbar navRef={navRef} />
        <LocalitiesQuestion />
        <Switch>
          {/* Home page */}
          <Route exact path="/" component={Landing} />
          {/* Authentication */}
          <Route exact path="/auth" component={AuthForm} />
          <Route
            exact
            path="/verification/:activationToken"
            component={Verification}
          />
          <Route exact path="/reset_password" component={ResetPassword} />
          <Route
            exact
            path="/password_confirmation/:resetPasswordToken"
            component={PasswordConfirmation}
          />
          {/* Posts */}
          <Route exact path="/posts/:id" component={Post} />
          <PrivateRoute exact path="/create_post" component={PostForm} />
          <Route
            path="/:city/:dealType"
            component={() => <Posts navRef={navRef} />}
          />
        </Switch>
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
  )
}

export default App
