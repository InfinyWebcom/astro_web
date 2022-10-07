import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import { FormGroup, FormFeedback, Input } from 'reactstrap'
import TextField from 'components/reactstrapText'
import { connect } from 'react-redux'
import { required, emailField } from '../constants/validations'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {
  login,
  hideMessage,
  showAuthLoader
} from '../actions/auth';
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onSubmit = () => {
    console.log('handleSubmit', this.props.signin.values.email)
    this.props.login({ email: this.props.signin.values.email, password: this.props.signin.values.password, User_type: 'admin' }, this.props.history)
  }
  render() {
    const { handleSubmit, pristine, reset, submitting, loader, showMessage, alertMessage, signin } = this.props
    console.log('form', signin)
    return (
      <div
        className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="login-content">
          <div className="login-header">
            <Link className="app-logo" to="/" title="AstroWize">
              <img src={require("assets/images/logo.png")} alt="AstroWize" title="AstroWize" />
            </Link>
          </div>

          <div className="login-form">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Field name="email" type="text"
                component={TextField} label=""
                fullWidth={true}
                validate={emailField}
                margin="normal"
                formGroupClass='form-group'
                placeholder='Email'
                classNameField='form-control form-control-lg'
              />
              <Field name="password" type="password"
                component={TextField} label=""
                validate={required}
                margin="normal"
                fullWidth={true}
                formGroupClass='form-group'
                placeholder='Password'
                classNameField='form-control form-control-lg'
              />
              <p className='text-right'>

                <Link to="/forgotPassword" className="mr-1">
                  <IntlMessages id="Forgot password ?" />
                </Link>
              </p>
              <div className=" mb-2">
                <Button disabled={submitting} className="btn btn-primary " type='submit' variant="contained" color="primary">
                  <IntlMessages id="appModule.signIn" />
                </Button>

              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, form }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  const { signin } = form
  return { loader, alertMessage, showMessage, authUser, signin }
};
Signin = connect(
  mapStateToProps,
  {
    login
  }               // bind account loading action creator
)(Signin)
Signin = reduxForm({
  form: 'signin',// a unique identifier for this form
  destroyOnUnmount: true
})(Signin)

export default Signin;