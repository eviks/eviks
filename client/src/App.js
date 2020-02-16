import React, { Fragment, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/navbar/navbar.component'
import Landing from './components/layout/landing/landing.component'
import Modal from 'react-modal'
import ReduxToastr from 'react-redux-toastr'
import Auth from './components/auth/auth.component'
import './sass/style.scss'
import './i18n'

// Redux
import { Provider } from 'react-redux'
import store from './store'

Modal.setAppElement('body')

const App = () => {
  return (
    <Suspense fallback="loading">
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/auth" component={Auth} />
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
