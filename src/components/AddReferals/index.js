import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import { Row, Col, Label } from 'reactstrap';
import CardBox from 'components/CardBox'
import TextField from 'components/reactstrapText'
import TextField2 from 'components/reactNormalTextFiled'
import { connect } from 'react-redux'
import { required, emailField, number, validatePhone, speciaCharacter, latlong, arrayData, validatePinCode } from 'constants/validations'
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { Field, reduxForm, getFormInitialValues } from 'redux-form'
import Address from 'components/autoCompleteAddress'
import Button from '@material-ui/core/Button';
import SelectField from 'components/multipleSelect'
import Axios from 'util/axiosRequest'
import Divider from '@material-ui/core/Divider';
import { addEditAstrolgerSuccess, getRefferals, apiFailed } from 'actions/auth'
import asyncValidate from 'constants/asyncValidate'
import Cropper from 'components/imageCropper'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ContentLoader from "react-content-loader"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from "react-router";
class AddReferrals extends Component {
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
        const { values } = this.props.addreferrals

        let data = {
            first_name: values.first_name, mobile: values.mobile, user_type: 'referror', email: values.email,
            referral_code: this.state.referrlCode
        }

        let data1 = await Axios.axiosHelperFunc('post', 'referral/addReferror', data)
        console.log('dataaaa', data1);
        
        if (data1.data && data1.data.error == false) {
            this.props.addEditAstrolgerSuccess(data1.data.title)
            this.props.handleClose(false)
            let url = this.props.location.search
            let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''

            this.props.getRefferals({ page: json.page ? Number(json.page) + 1 : 1, perPage: 20 }, this.props.history)
        } else if (data1.data && data1.data.error == true) {
            this.props.apiFailed(data1.data.title)
        }
    }
    componentDidMount() {
        this.props.initialize({ refferal: this.state.referrlCode, first_name: '', email: '', mobile: '' })
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
        const { handleSubmit, pristine, reset, submitting, loader, showMessage, alertMessage, signin, handleClose, openRefferal } = this.props
        const { audioCall, videoCall, chat, report } = this.state

        const { values } = this.props.addreferrals ? this.props.addreferrals : {}

        return (
            <div className="parent animated slideInUpTiny animation-duration-3">


                <Dialog
                    fullWidth={true}
                    open={openRefferal}
                    onClose={() => handleClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form onSubmit={handleSubmit(this.onSubmit)}>

                        <DialogTitle id="alert-dialog-title">Add new referral</DialogTitle>
                        <DialogContent>
                            {
                                this.props.loading ? this.MyLoader() :
                                    <>

                                        <Row className='mt-2'>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <Field name="first_name" type="text"
                                                    component={TextField} label="Name"
                                                    fullWidth={true}
                                                    validate={[required]}
                                                    margin="normal"
                                                    classNameField='form-control form-control-lg'
                                                    placeholder=''

                                                />
                                            </Col>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <Field name="email" type="text"
                                                    component={TextField} label="Email"
                                                    fullWidth={true}
                                                    validate={[required, emailField]}
                                                    margin="normal"
                                                    classNameField='form-control form-control-lg'
                                                    placeholder=''

                                                />
                                            </Col>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <Field name="mobile" type="text"
                                                    component={TextField} label="Mobile"
                                                    fullWidth={true}
                                                    validate={[required, validatePhone]}
                                                    margin="normal"
                                                    classNameField='form-control form-control-lg'
                                                    placeholder=''

                                                />
                                            </Col>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <Field name="refferal" type="text"
                                                    component={TextField} label="Referral"
                                                    fullWidth={true}
                                                    disabled={true}
                                                    // validate={[required, validatePinCode]}
                                                    value={this.state.referrlCode}
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
    const { addreferrals } = form
    return { loader, alertMessage, showMessage, authUser, addreferrals, loading }
};
AddReferrals = connect(
    mapStateToProps,
    { addEditAstrolgerSuccess, getRefferals, apiFailed }              // bind account loading action creator
)(AddReferrals)
AddReferrals = reduxForm({
    form: 'addreferrals',// a unique identifier for this form
    asyncValidate,
    destroyOnUnmount: true,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: getFormInitialValues('addreferrals')(),
})(AddReferrals)

export default withRouter(AddReferrals);