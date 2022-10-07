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
        console.log('handleSubmit', this.props.resetOtp.values.otp)
        let data = await Axios.axiosHelperFunc('post', 'user/verifyOTP', { verificationOtp: this.props.resetOtp.values.otp, token: this.props.match.params.id })
        if (data.data && data.data.error == false) {
            NotificationManager.success(data.data.title)
            localStorage.setItem('token', data.data.token)
            this.props.history.push(`/admin/dashboard`)
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
                            <Field name="otp" type="text"
                                component={TextField} label=""
                                fullWidth={true}
                                validate={[required]}
                                margin="normal"
                                formGroupClass='form-group'
                                placeholder='Otp'
                                classNameField='form-control form-control-lg'
                            />


                            <div className=" mb-2">
                                <Button disabled={submitting} className="btn btn-primary " type='submit' variant="contained" color="primary">
                                    Verify
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
    const { resetOtp } = form
    return { loader, alertMessage, showMessage, authUser, resetOtp }
};
Signin = connect(
    mapStateToProps,
    {
        login
    }               // bind account loading action creator
)(Signin)
Signin = reduxForm({
    form: 'resetOtp',// a unique identifier for this form
    destroyOnUnmount: true
})(Signin)

export default Signin;