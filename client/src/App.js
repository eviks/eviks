import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/navbar/navbar.component'
import Landing from './components/layout/landing/landing.component'
import Modal from 'react-modal'
import Auth from './components/auth/auth.component'
import './sass/style.scss'

Modal.setAppElement('body')

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/auth" component={Auth} />
      </Fragment>
    </Router>
  )
}

export default App
