import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import { Row, Col, Label } from 'reactstrap';
import CardBox from 'components/CardBox'
import TextField from 'components/reactstrapText'
import TextField2 from 'components/reactNormalTextFiled'
import { connect } from 'react-redux'
import { required, validateDate } from 'constants/validations'
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
import moment from 'moment-timezone';
class ScheduleCall extends Component {
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
        const { values } = this.props.schedulecall

        this.props.handleYes(values)
    }
    componentDidMount() {
        let zone = moment.tz.guess(true);
        this.props.initialize({ refferal: this.state.referrlCode, first_name: '', email: '', mobile: '', call_time: moment(this.props.date).tz(zone).format('YYYY-MM-DD[T]HH:mm') })
    }

    handleAddres = async (e, key) => {
        if (key === 'userAddress') {
            this.props.change('latlong', '')
            this.setState({ [key]: e, latlong: [] })
        } else if (key === 'latlng') {
            this.props.change('latlong', e.latLng.lng)
            this.setState({ userAddress: e.userAddress, latlong: [e.latLng.lng, e.latLng.lat], zipCode: e.zipCode, disabled: true, disableZipcode: e.zipCode ? true : false })
        }
    }
    asyncValidate = () => {

    }
    handleLanguage = (e) => {
        try {
            let temp = []
            console.log('handlelaguage*****2', e.target.value)

            this.setState({
                language: e.target.value
            });
        } catch (error) {
            console.log('error', error)
        }



    }
    handleSpecialityChange = (e) => {
        let temp = []


        this.setState({
            speciality: e.target.value
        });


    }
    handleAudio = () => {
        this.setState({ audioCall: !this.state.audioCall })
    }
    handleVideo = () => {
        this.setState({ videoCall: !this.state.videoCall })
    }
    handleChat = () => {
        this.setState({ chat: !this.state.chat })
    }
    handleReport = () => {
        this.setState({ report: !this.state.report })
    }
    getpercentValue = (a, b) => {
        if (a && b) {
            let temp = ((Number(b) - Number(a)) * 100) / (Number(b))

            return temp.toFixed(2)
        } else {
            return ''
        }

    }
    render() {
        const { handleSubmit, pristine, reset, submitting, loader, showMessage, alertMessage, signin, handleClose, open, astrologers } = this.props
        const { audioCall, videoCall, chat, report } = this.state

        const { values } = this.props.ScheduleCall ? this.props.ScheduleCall : {}
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

                        <DialogTitle id="alert-dialog-title">Schedule this call</DialogTitle>
                        <DialogContent>
                            {
                                this.props.loading ? this.MyLoader() :
                                    <>

                                        <Row className='mt-2'>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <Field name="astrologer_id" type="select"
                                                    component={SelectField} label="Astrologer"
                                                    fullWidth={true}
                                                    validate={[required]}
                                                    margin="normal"
                                                    classNameField='form-control form-control-lg'
                                                    placeholder=''

                                                >
                                                    <option key='empty' value=''> Select Astrologer</option>
                                                    {
                                                        astrologers.map((val, i) => <option key={i} value={val._id}>{val.first_name}</option>)
                                                    }
                                                </Field>
                                            </Col>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <Field name="call_time" type="datetime-local"
                                                    component={TextField} label="Preferred date-time"
                                                    fullWidth={true}
                                                    validate={[required, validateDate]}
                                                    margin="normal"
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
    const { schedulecall } = form
    return { loader, alertMessage, showMessage, authUser, schedulecall, loading }
};
ScheduleCall = connect(
    mapStateToProps,
    { addEditAstrolgerSuccess }              // bind account loading action creator
)(ScheduleCall)
ScheduleCall = reduxForm({
    form: 'schedulecall',// a unique identifier for this form
    asyncValidate,
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: getFormInitialValues('schedulecall')(),
    onSubmitSuccess: (result, dispatch) => {
        const newInitialValues = getFormInitialValues('schedulecall')();
        dispatch(initialize('schedulecall', newInitialValues));
    },
})(ScheduleCall)

export default ScheduleCall;