import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from 'components/textFields';
import { connect } from 'react-redux'
import { required, emailField } from '../constants/validations'
import './index.css'
import {
  login,
  hideMessage,
  showAuthLoader
} from '../actions/auth';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onSubmit = () => {
    localStorage.setItem({ isLoggenIn: true })
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, loader, showMessage, alertMessage } = this.props
    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">

          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="Jambo">
              <img src={require("assets/images/logo.png")} alt="jambo" title="jambo" />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-header mb-4">
              <h1><IntlMessages id="Login" /></h1>
            </div>

            <div className="app-login-form">
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                  <Field name="email" type="text"
                    component={TextField} label="Email"
                    fullWidth={true}
                    validate={emailField}
                    margin="normal"
                    className="mt-1 my-sm-3"
                  />
                  <Field name="password" type="password"
                    component={TextField} label="Password"
                    validate={required}
                    margin="normal"
                    fullWidth={true}
                    className="mt-1 my-sm-3"
                  />

                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <Button type='submit' variant="contained" color="primary">
                      <IntlMessages id="appModule.signIn" />
                    </Button>
                  </div>

                </fieldset>
              </form>
            </div>
          </div>

        </div>
        {
          loader &&
          <div className="loader-view">
            <CircularProgress />
          </div>
        }
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser }
};
SignIn = reduxForm({
  form: 'signin',// a unique identifier for this form
  destroyOnUnmount: true
})(SignIn)
SignIn = connect(
  mapStateToProps,
  {
    login
  }               // bind account loading action creator
)(SignIn)
export default SignIn;
