import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';
import { FormGroup, FormFeedback, Input } from 'reactstrap'
import TextField from 'components/reactstrapText'
import { connect } from 'react-redux'
import { required, emailField } from '../constants/validations'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Axios from 'util/axiosRequest'
import {
    login,
    hideMessage,
    showAuthLoader
} from '../actions/auth';
import { NotificationManager } from 'react-notifications';
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    onSubmit = async () => {
        console.log('handleSubmit', this.props.forgotPassword.values.email)
        let data = await Axios.axiosHelperFunc('post', 'user/forgotPassword', { email: this.props.forgotPassword.values.email })
        if (data.data && data.data.error == false) {
            NotificationManager.success(data.data.title)
            this.props.history.push(`/verifyOtp/${data.data.token}`)
        } else {
            NotificationManager.error(data.data.title)
        }
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


                            <div className="mb-2">
                                <Button disabled={submitting} className="btn btn-primary " type='submit' variant="contained" color="primary">
                                    Reset
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
    const { forgotPassword } = form
    return { loader, alertMessage, showMessage, authUser, forgotPassword }
};
Signin = connect(
    mapStateToProps,
    {
        login
    }               // bind account loading action creator
)(Signin)
Signin = reduxForm({
    form: 'forgotPassword',// a unique identifier for this form
    destroyOnUnmount: true
})(Signin)

export default Signin;