import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import { Row, Col, Label } from 'reactstrap';
import CardBox from 'components/CardBox'
import TextField from 'components/reactstrapText'
import TextField2 from 'components/reactNormalTextFiled'
import { connect } from 'react-redux'
import { required, emailField, number, validatePhone, speciaCharacter, latlong, arrayData, validatePinCode, notDecimal } from 'constants/validations'
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { Field, reduxForm, change } from 'redux-form'
import Address from 'components/autoCompleteAddress'
import Button from '@material-ui/core/Button';
import SelectField from 'components/multipleSelect'
import Axios from 'util/axiosRequest'
import Divider from '@material-ui/core/Divider';
import { addEditAstrolger } from 'actions/auth'
import asyncValidate from 'constants/asyncValidate'
import Cropper from 'components/imageCropper'
import { NotificationManager } from 'react-notifications';
import ContentLoader from "react-content-loader"
import CheckBox from 'components/CheckBox'
class AddAstrologer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAddress: '',
            latlong: [],
            language: [],
            languageLists: [],
            specialityLists: [],
            speciality: [],
            croppedImage: '',
            audioCall: false,
            videoCall: false,
            chat: false,
            report: false,
            loading: false
        }
    }
    handlePhoto = (data, i) => {
        this.setState({ croppedImage: data.data })
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
            <rect x="3" y="15" rx="0" ry="0" width="264" height="150" />
            <rect x="285" y="15" rx="0" ry="0" width="350" height="42" />
            <rect x='730' y="15" rx="0" ry="0" width="350" height="42" />
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
        // if (this.state.croppedImage) {
        const { values } = this.props.addastrolger
        const { audioCall, videoCall, chat, report } = this.state
        let languages_spoken = values.language.map((val) => val._id ? val._id : val)
        let specialities = values.specialities.map((val) => val._id ? val._id : val)
        let data = {
            languages_spoken, specialities, first_name: values.first_name, last_name: values.last_name, mobile: values.mobile, user_type: 'astrologer', user_state: values.user_state, user_city: values.user_city, pincode: values.pincode, street_address: values.street_address, building_name: values.building_name, block_number: values.block_number,
            info: values.info, email: values.email, user_address: this.state.userAddress, chat_rate: chat ? values.chat_rate : '', video_rate: videoCall ? values.video_rate : '', experience_years: values.experience_years,
            audio_rate: audioCall ? values.audio_rate : '', report_rate: report ? values.report_rate : '', longitude: this.state.latlong[0], latitude: this.state.latlong[1], url: 'admin/createAstrologer',
            profile_url: this.state.croppedImage.includes('http') ? this.state.temoImage : this.state.croppedImage, is_chat: chat, is_audio: audioCall, is_video: videoCall, is_report: report,
            client_chat_rate: chat ? values.client_chat_rate : '', client_video_rate: videoCall ? values.client_video_rate : '', client_audio_rate: audioCall ? values.client_audio_rate : '',
            client_report_rate: report ? values.client_report_rate : ''
        }
        console.log('data==', data)
        this.props.addEditAstrolger(data, this.props.history)
        // } else {
        //     NotificationManager.error('Please upload image')
        // }

    }
    componentDidMount() {
        this.getLanguage()
        this.getSpeciality()
    }
    getLanguage = async () => {
        let data = await Axios.axiosHelperFunc('post', 'admin/getLanguagesList', {})
        if (data.data && data.data.error == false) {
            this.setState({ languageLists: data.data.data })
        }
    }
    getSpeciality = async () => {
        let data = await Axios.axiosHelperFunc('post', 'admin/getSpecialitiesList', {})
        if (data.data && data.data.error == false) {
            this.setState({ specialityLists: data.data.data })
        }
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
        
        const { handleSubmit, pristine, reset, submitting, loader, showMessage, alertMessage, signin } = this.props
        let { audioCall, videoCall, chat, report } = this.state

        const { values } = this.props.addastrolger ? this.props.addastrolger : {}
        let audioVal = audioCall ? [required, number] : []
        let videoVal = videoCall ? [required, number] : []
        let chatVal = chat ? [required, number] : []
        let reportVal = report ? [required, number] : []
        let audio_comission = this.getpercentValue(values ? values.audio_rate : '', values ? values.client_audio_rate : '');
        let video_comission = this.getpercentValue(values ? values.video_rate : '', values ? values.client_video_rate : '');
        let chat_comission = values ? this.getpercentValue(values.chat_rate, values.client_chat_rate) : '';
        let report_comission = values ? this.getpercentValue(values.report_rate, values.client_report_rate) : '';
        console.log('getpercentValue', audio_comission)
        // videoCall = false

        return (
            <div className="parent animated slideInUpTiny animation-duration-3">


                <CardBox styleName="col-12" heading={''}
                    headerOutside>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        {
                            this.props.loading ? this.MyLoader() :
                                <>
                                    <Row>
                                        <Col sm={12} xs={12} md={3} lg={3} xl={3}>

                                            <Cropper label='Image' croppedImage={this.state.croppedImage} index={0} handleCrop={this.handlePhoto} />


                                        </Col>
                                        <Col sm={12} xs={12} md={9} lg={9} xl={9}>
                                            <Row>
                                                <Col sm={6} xs={12} md={6} lg={6}>
                                                    <Field name="first_name" type="text"
                                                        component={TextField}
                                                        fullWidth={true}
                                                        validate={[required, speciaCharacter]}
                                                        label='Name'
                                                        margin="normal"
                                                        classNameField='form-control form-control-lg'


                                                    />
                                                </Col>

                                                <Col sm={6} xs={12} md={6} lg={6}>
                                                    <Field name="email" type="text"
                                                        component={TextField}
                                                        fullWidth={true}
                                                        validate={emailField}
                                                        label='Email'
                                                        margin="normal"
                                                        classNameField='form-control form-control-lg'


                                                    />
                                                </Col>
                                                <Col sm={6} xs={12} md={6} lg={6}>
                                                    <Field name="mobile" type="text"
                                                        component={TextField} label="Phone"
                                                        fullWidth={true}
                                                        validate={[required, validatePhone]}
                                                        margin="normal"
                                                        classNameField='form-control form-control-lg'
                                                        placeholder=''

                                                    />
                                                </Col>
                                                <Col sm={6} xs={12} md={6} lg={6}>
                                                    <Field name="experience_years" type="number"
                                                        component={TextField} label="Experience (In years)"
                                                        fullWidth={true}
                                                        validate={[required, number, notDecimal]}
                                                        margin="normal"
                                                        classNameField='form-control form-control-lg'
                                                        placeholder=''

                                                    />
                                                </Col>
                                                <Col sm={12} xs={12} md={12} lg={12} className='mt-2'>
                                                    <Field name="info" type="textarea"
                                                        component={TextField} label="Personal Info"
                                                        fullWidth={true}
                                                        validate={required}
                                                        margin="normal"
                                                        classNameField='form-control form-control-lg text-area'


                                                    />
                                                </Col>

                                            </Row>
                                        </Col>
                                    </Row>
                                    <Divider className='mt-3 mb-3' />
                                    <Row className='mt-2'>
                                        <Col sm={6} xs={12} md={6} lg={6}>
                                            <Field name="block_number" type="text"
                                                component={TextField} label="Block no. / Room no."
                                                fullWidth={true}
                                                // validate={[required]}
                                                margin="normal"
                                                classNameField='form-control form-control-lg'
                                                placeholder=''

                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={6} lg={6}>
                                            <Field name="building_name" type="text"
                                                component={TextField} label="Building / Colony Name"
                                                fullWidth={true}
                                                // validate={[required]}
                                                margin="normal"
                                                classNameField='form-control form-control-lg'
                                                placeholder=''

                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={6} lg={6}>
                                            <Field name="street_address" type="text"
                                                component={TextField} label="Street Address"
                                                fullWidth={true}
                                                // validate={[required]}
                                                margin="normal"
                                                classNameField='form-control form-control-lg'
                                                placeholder=''

                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={6} lg={6}>
                                            <Field name="pincode" type="text"
                                                component={TextField} label="Pincode"
                                                fullWidth={true}
                                                validate={[validatePinCode]}
                                                margin="normal"
                                                classNameField='form-control form-control-lg'
                                                placeholder=''

                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={6} lg={6}>
                                            <Field name="user_city" type="text"
                                                component={TextField} label="City"
                                                fullWidth={true}
                                                // validate={[required]}
                                                margin="normal"
                                                classNameField='form-control form-control-lg'
                                                placeholder=''

                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={6} lg={6}>
                                            <Field name="user_state" type="text"
                                                component={TextField} label="State"
                                                fullWidth={true}
                                                // validate={[required]}
                                                margin="normal"
                                                classNameField='form-control form-control-lg'
                                                placeholder=''

                                            />
                                        </Col>
                                    </Row>
                                    <Divider className='mt-3 mb-3' />
                                    <Row className='mt-2'>
                                        <Col className='d-flex align-items-center' sm={6} xs={6} md={2} lg={2} xl={2}>
                                            <CheckBox label='Audio Call' checked={audioCall} handleChange={this.handleAudio} />
                                        </Col>
                                        <Col sm={6} xs={12} md={4} lg={4} xl={4}>
                                            <Field name="audio_rate" type="number"
                                                component={TextField} label="Astrologer"
                                                fullWidth={true}
                                                disabled={!audioCall}
                                                validate={audioVal}
                                                prepend='₹'
                                                append='/ minute'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>

                                        <Col sm={6} xs={12} md={4} lg={4} xl={4}>
                                            <Field name="client_audio_rate" type="number"
                                                component={TextField} label="Astrowize"
                                                fullWidth={true}
                                                disabled={!audioCall}
                                                validate={audioVal}
                                                prepend='₹'
                                                append='/ minute'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                            <TextField2 name="audio_comission" type="number"
                                                label="Comission"
                                                fullWidth={true}
                                                value={audio_comission}
                                                value2={audio_comission}
                                                disabled={true}
                                                append='%'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='d-flex align-items-center' sm={6} xs={6} md={2} lg={2} xl={2}>
                                            <CheckBox label='Video Call' checked={videoCall} handleChange={this.handleVideo} />
                                        </Col>
                                        <Col sm={6} xs={12} md={4} lg={4} xl={4}>
                                            <Field name="video_rate" type="number"
                                                component={TextField} label="Astrologer"
                                                fullWidth={true}
                                                disabled={!videoCall}
                                                validate={videoVal}
                                                prepend='₹'
                                                append='/ minute'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>

                                        <Col sm={6} xs={12} md={4} lg={4} xl={4}>
                                            <Field name="client_video_rate" type="number"
                                                component={TextField} label="Astrowize"
                                                fullWidth={true}
                                                disabled={!videoCall}
                                                validate={videoVal}
                                                prepend='₹'
                                                append='/ minute'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                            <TextField2 name="video_comission" type="text"
                                                label="Comission"
                                                fullWidth={true}
                                                disabled={true}
                                                value={video_comission}
                                                append='%'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='d-flex align-items-center' sm={6} xs={6} md={2} lg={2} xl={2}>
                                            <CheckBox label='Chat Session' checked={chat} handleChange={this.handleChat} />
                                        </Col>
                                        <Col sm={6} xs={12} md={4} lg={4} xl={4}>
                                            <Field name="chat_rate" type="number"
                                                component={TextField} label="Astrologer"
                                                fullWidth={true}
                                                disabled={!chat}
                                                validate={chatVal}
                                                prepend='₹'
                                                append='/ minute'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>

                                        <Col sm={6} xs={12} md={4} lg={4} xl={4}>
                                            <Field name="client_chat_rate" type="number"
                                                component={TextField} label="Astrowize"
                                                fullWidth={true}
                                                disabled={!chat}
                                                validate={chatVal}
                                                prepend='₹'
                                                append='/ minute'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                            <TextField2 name="chat_comission" type="number"
                                                label="Comission"
                                                fullWidth={true}
                                                value={chat_comission}
                                                value2={chat_comission}
                                                disabled={true}
                                                append='%'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='d-flex align-items-center' sm={6} xs={6} md={2} lg={2} xl={2}>
                                            <CheckBox label='Report ' checked={report} handleChange={this.handleReport} />
                                        </Col>
                                        <Col sm={6} xs={12} md={4} lg={4} xl={4}>
                                            <Field name="report_rate" type="number"
                                                component={TextField} label="Astrologer"
                                                fullWidth={true}
                                                disabled={!report}
                                                validate={reportVal}
                                                prepend='₹'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>

                                        <Col sm={6} xs={12} md={4} lg={4} xl={4}>
                                            <Field name="client_report_rate" type="number"
                                                component={TextField} label="Astrowize"
                                                fullWidth={true}
                                                disabled={!report}
                                                validate={reportVal}
                                                prepend='₹'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                        <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                            <TextField2 name="report_comission" type="text"
                                                label="Comission"
                                                fullWidth={true}
                                                disabled={true}
                                                value={report_comission}
                                                append='%'
                                                margin="normal"
                                                classNameField='form-control form-control-lg'


                                            />
                                        </Col>
                                    </Row>
                                    <Row>


                                        {<Col sm={12} xs={12} md={6} lg={6}>
                                            <Field name="language" type="select"
                                                component={SelectField} label="Language"
                                                fullWidth={true}
                                                validate={required}
                                                margin="normal"
                                                data={this.state.languageLists}
                                                value={this.state.language}
                                                value1={this.state.language}
                                                classNameField='form-control form-control-lg'

                                                multiple={true}
                                                onChange={(e) => this.handleLanguage(e)}

                                            />
                                        </Col>}
                                        {<Col sm={12} xs={12} md={6} lg={6}>
                                            <Field name="specialities" type="select"
                                                component={SelectField} label="Speciality"
                                                fullWidth={true}
                                                validate={required}
                                                margin="normal"
                                                data={this.state.specialityLists}
                                                value={this.state.speciality}
                                                value1={this.state.speciality}
                                                classNameField='form-control form-control-lg'

                                                multiple={true}
                                                onChange={(e) => this.handleSpecialityChange(e)}

                                            />
                                        </Col>}
                                    </Row>
                                    <Row>
                                        <Col className="mt-4 mb-2">
                                            <Button disabled={submitting} className="btn btn-primary jr-btn jr-btn-lg" type='submit' variant="contained" color="primary">
                                                Submit
                    </Button>

                                        </Col>
                                    </Row>
                                </>
                        }

                    </form>
                </CardBox>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, form }) => {
    const { loader, alertMessage, showMessage, authUser, loading } = auth;
    const { addastrolger } = form
    return { loader, alertMessage, showMessage, authUser, addastrolger, loading }
};
AddAstrologer = connect(
    mapStateToProps,
    { addEditAstrolger }              // bind account loading action creator
)(AddAstrologer)
AddAstrologer = reduxForm({
    form: 'addastrolger',// a unique identifier for this form
    asyncValidate,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: true
})(AddAstrologer)

export default AddAstrologer;