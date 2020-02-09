import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/navbar/navbar.component'
import Landing from './components/layout/landing/landing.component'
import Modal from 'react-modal'
import Auth from './components/auth/auth.component'
import './sass/style.scss'

// Redux
import { Provider } from 'react-redux'
import store from './store'

Modal.setAppElement('body')

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/auth" component={Auth} />
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
