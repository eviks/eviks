import React from 'react'
import { deleteAlert } from '../../../actions/alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alert = ({ alerts, deleteAlert }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.message}
      <i
        className="fas fa-times alert-close"
        onClick={() => deleteAlert(alert.id)}
      ></i>
    </div>
  ))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  deleteAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps, { deleteAlert })(Alert)
