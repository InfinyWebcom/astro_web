import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import { Row, Col, Label } from 'reactstrap';
import CardBox from 'components/CardBox'
import TextField from 'components/reactstrapText'
import TextField2 from 'components/reactNormalTextFiled'
import { connect } from 'react-redux'
import { number, required, validateDate } from 'constants/validations'
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { Field, reduxForm, getFormInitialValues, initialize } from 'redux-form'
import Address from 'components/autoCompleteAddress'
import Button from '@material-ui/core/Button';
import Axios from 'util/axiosRequest'
import Divider from '@material-ui/core/Divider';
import { addEditAstrolgerSuccess } from 'actions/auth'
import asyncValidate from 'constants/asyncValidate'
import Cropper from 'components/imageCropper'
import { NotificationManager } from 'react-notifications';
import ContentLoader from "react-content-loader"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SelectField from 'components/reactstrapSelect'
class CompleteCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            referrlCode: (Math.random().toString(36).substring(7)).toUpperCase()
        }
    }

    MyLoader = (props) => (
        <ContentLoader
            speed={2}
            width={1250}
            height={400}
            viewBox="0 0 1209 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >

            <rect x="285" y="78" rx="0" ry="0" width="350" height="42" />
            <rect x="730" y="78" rx="0" ry="0" width="350" height="42" />
            <rect x="3" y="180" rx="0" ry="0" width="350" height="42" />
            <rect x="365" y="180" rx="0" ry="0" width="350" height="42" />
            <rect x="730" y="180" rx="0" ry="0" width="350" height="42" />
            <rect x="3" y="260" rx="0" ry="0" width="350" height="42" />
            <rect x="365" y="260" rx="0" ry="0" width="350" height="42" />
            <rect x="730" y="260" rx="0" ry="0" width="350" height="42" />
        </ContentLoader>
    )
    onSubmit = async () => {
        const { values } = this.props.completecall

        this.props.handleYes(values)
    }
    componentDidMount() {
        this.props.initialize({ refferal: this.state.referrlCode, first_name: '', email: '', mobile: '' })
    }


    asyncValidate = () => {

    }
    render() {
        const { handleSubmit, pristine, reset, submitting, loader, showMessage, alertMessage, signin, handleClose, open, astrologers } = this.props
        const { audioCall, videoCall, chat, report } = this.state

        const { values } = this.props.completecall ? this.props.completecall : {}

        return (
            <div className="parent animated slideInUpTiny animation-duration-3">


                <Dialog
                    fullWidth={true}
                    open={open}
                    onClose={() => handleClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form onSubmit={handleSubmit(this.onSubmit)}>

                        <DialogTitle id="alert-dialog-title">Complete this call</DialogTitle>
                        <DialogContent>
                            {
                                this.props.loading ? this.MyLoader() :
                                    <>

                                        <Row className='mt-2'>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <Field name="call_duration" type="number"
                                                    component={TextField} label="Call Duration"
                                                    fullWidth={true}
                                                    validate={[required, number]}
                                                    margin="normal"
                                                    append='in minutes'
                                                    classNameField='form-control form-control-lg'
                                                    placeholder=''

                                                />
                                            </Col>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <Field name="call_rate" type="number"
                                                    component={TextField} label="Call Cost"
                                                    fullWidth={true}
                                                    validate={[required, number]}
                                                    margin="normal"
                                                    prepend='₹'
                                                    classNameField='form-control form-control-lg'
                                                    placeholder=''

                                                />
                                            </Col>



                                        </Row>


                                    </>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleClose(false)} color="secondary">
                                Close
                            </Button>
                            <Button type='submit' color="primary" autoFocus>
                                Submit
                            </Button>
                        </DialogActions>

                    </form>
                </Dialog>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, form }) => {
    const { loader, alertMessage, showMessage, authUser, loading } = auth;
    const { completecall } = form
    return { loader, alertMessage, showMessage, authUser, completecall, loading }
};
CompleteCall = connect(
    mapStateToProps,
    { addEditAstrolgerSuccess }              // bind account loading action creator
)(CompleteCall)
CompleteCall = reduxForm({
    form: 'completecall',// a unique identifier for this form
    asyncValidate,
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: getFormInitialValues('completecall')(),
    onSubmitSuccess: (result, dispatch) => {
        const newInitialValues = getFormInitialValues('completecall')();
        dispatch(initialize('completecall', newInitialValues));
    },
})(CompleteCall)

export default CompleteCall;