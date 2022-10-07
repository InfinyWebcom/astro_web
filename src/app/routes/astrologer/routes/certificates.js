import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import { Row, Col, Label, FormGroup, FormFeedback, Input } from 'reactstrap'
import CardBox from 'components/CardBox'
import { Field, FieldArray, reduxForm } from 'redux-form'
import TextField from 'components/reactstrapText'
import Button from '@material-ui/core/Button';
import { required, speciaCharacter } from 'constants/validations'
import CertificateComponent from './cerificateComponent'
import { NotificationManager } from 'react-notifications'
import Axios from 'util/axiosRequest'
import DialogAlert from 'components/Dialog'

class Certificates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            certificates: [{
                title: '', cert_date: '', certificate: '', isVisTitle: false, isVisCert: false, isVisDate: false
            }],
            isLoading: false,
            open: false,
            index: -1
        }
    }
    componentDidMount = async () => {
        let data = await Axios.axiosHelperFunc('post', 'admin/getUserDetails', { user_id: this.props.match.params.id })
        if (data.data && data.data.error == false) {
            if (data.data.data.certifications.length > 0) {
                this.setState({ certificates: data.data.data.certifications })
            }
        }
    }
    submit = async (e) => {
        e.preventDefault();
        let { certificates } = this.state

        let requiredTitle = certificates.findIndex((val) => ((val.title.trim()) == ''))
        let requiredDate = certificates.findIndex((val, index) => (val.cert_date == '' || this.validateDate(index)))
        let requiredCertificate = certificates.findIndex((val) => val.certificate == '')
        console.log('requiredTitle', requiredTitle, requiredDate, requiredCertificate)
        if (requiredTitle < 0 && requiredDate < 0 && requiredCertificate < 0) {
            this.setState({ isLoading: true })
            let data = await Axios.axiosHelperFunc('post', 'admin/uploadCertifications', { user_id: this.props.match.params.id, certs: certificates })
            console.log('data.data', data)
            if (data.data && data.data.error == false) {
                this.setState({ isLoading: false })
                console.log('data.data', data.data.title)
                NotificationManager.success(data.data.title)
            } else {
                this.setState({ isLoading: false })
                NotificationManager.error(data.data.title)
            }
        } else {
            let temp = [...certificates]
            let i = 0
            for (i; i <= certificates.length - 1; i++) {
                console.log('requiredTitle i', i)
                temp[i].isVisTitle = true;
                temp[i].isVisDate = true;
                temp[i].isVisCert = true
            }

            this.setState({ certificates: temp, isLoading: false })
        }

    }
    handleFileSelect = (e, i) => {
        // const { input: { onChange } } = this.props
        let document = "";
        let temp = [...this.state.certificates]
        let reader = new FileReader();
        console.log('e.target.files', e.target.files);
        if (e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                let data = {}
                document = reader.result;

                temp[i].certificate = document
                this.setState({ certificates: temp })
                // this.apiCall('value', data)
                // onChange(document)

                console.log('e.....', document);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
                console.log('e.....', document);
            };
        }

    }
    handleAddMore = () => {
        let temp = [...this.state.certificates]
        temp.push({ title: '', cert_date: '', certificate: '', isVisTitle: false, isVisCert: false, isVisDate: false })
        this.setState({ certificates: temp })
    }
    handleRemove = (index) => {
        let temp = [...this.state.certificates];
        temp.splice(this.state.index, 1);
        this.setState({ certificates: temp, open: false, index: -1 })
    }
    handleChange = (e, i, key) => {
        let temp = [...this.state.certificates]
        temp[i][key] = e.target.value
        if (key == 'title') {
            temp[i].isVisTitle = true
        } else {
            temp[i].isVisDate = true
        }
        this.setState({ certificates: temp })

    }
    handleFocus = (key, i) => {
        let temp = [...this.state.certificates]
        temp[i][key] = true
        this.setState({ certificates: temp })
    }
    validateDate = (index) => {
        let date = new Date()
        let selectedDate = new Date(this.state.certificates[index].cert_date)
        if (this.state.certificates[index].isVisDate && selectedDate > date) {
            return true
        } else {
            return false
        }
    }
    handleClose = () => {
        this.setState({ open: false, index: -1 })
    }
    openRemoveAlert = (index) => {
        this.setState({ index, open: true })
    }
    render() {
        const { handleSubmit, pristine, reset, submitting, } = this.props
        let { certificates, isLoading } = this.state
        console.log('certificates======', certificates)
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">


                <CardBox styleName="col-12" heading={''}
                    headerOutside>
                    < >
                        {
                            certificates.map((certificate, index) => <CertificateComponent validateDate={this.validateDate} handleFocus={this.handleFocus} handleFileSelect={this.handleFileSelect} handleChange={this.handleChange} length={certificates.length} handleRemove={this.openRemoveAlert} certificate={certificate} index={index} />)
                        }

                        <Row>
                            <Col xs={12} sm={12} md={4} xl={4} lg={4}  >
                                <Button disabled={isLoading == true} onClick={(e) => this.submit(e)} className="btn btn-primary jr-btn jr-btn-lg" variant="contained" color="primary">
                                    {isLoading == true ? 'Saving data' : 'Save'}
                                </Button>
                                <Button onClick={this.handleAddMore} className="btn btn-primary jr-btn jr-btn-lg" variant="contained" color="primary">
                                    Add More
                            </Button>
                            </Col>
                            <Col sm={4} md={4} xs={4} lg={4} xs={4}>

                            </Col>
                            <Col sm={4} md={4} xs={4} lg={4} xs={4}>

                            </Col>
                        </Row>

                    </>

                </CardBox>
                <DialogAlert open={this.state.open} handleClose={this.handleClose} handleYes={this.handleRemove} title={'Remove Certificate'} description='Are you sure you want to remove this certificate?' />
            </div>
        );
    }
}
Certificates = reduxForm({
    form: 'certificates',
    destroyOnUnmount: true
})(Certificates)
export default Certificates;