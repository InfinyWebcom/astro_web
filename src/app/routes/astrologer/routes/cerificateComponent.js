import React, { Component } from 'react';
import { Row, Col, Label, FormGroup, FormFeedback, Input } from 'reactstrap'
import CardBox from 'components/CardBox'
import { Field, FieldArray, reduxForm } from 'redux-form'
import TextField from 'components/reactstrapText'
import { required, speciaCharacter } from 'constants/validations'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import moment from 'moment'
import { withStyles, createStyles } from '@material-ui/styles';
import AppConfig from 'constants/config'


class CertiFicateComponent extends Component {
    constructor(props) {
        super(props);
        this.uploadFile = React.createRef();
        this.state = {}
    }
    handleFileSelect = (e, index) => {
        this.props.handleFileSelect(e, index)
    }
    handleClick = () => {
        console.log('uploadFile', this.uploadFile)
        this.uploadFile.click()
    }
    handleView = (data) => {
        var newTab = window.open();
        newTab.document.body.innerHTML = data
    }

    render() {
        let { certificate, index, handleRemove, length, handleChange, handleFocus, validateDate } = this.props
        let { title, isVisTitle, isVisCert, isVisDate, cert_date } = certificate
        console.log('certificate.cert_date?(certificate.cert_date.toIsoString().splice(0,10)):certificate.cert_date', certificate.cert_date ? (moment(certificate.cert_date).format('YYYY-MM-DD')) : certificate.cert_date)
        return (
            <>
                <Row>

                    <Col sm={4} xs={12} md={4} lg={4} xl={4}>
                        <FormGroup >
                            <Label>Title</Label>
                            <Input invalid={isVisTitle && !(title.trim())} onFocus={() => handleFocus('isVisTitle', index)} name='title' value={certificate.title} className='form-control form-control-lg' onChange={(e) => handleChange(e, index, 'title')} />
                            <FormFeedback>This field is required</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col sm={4} xs={12} md={3} lg={3} xl={3}>
                        <FormGroup >
                            <Label>Date</Label>
                            <Input name='cert_date' invalid={(isVisDate && !cert_date) || validateDate(index)} onFocus={() => handleFocus('isVisDate', index)} value={certificate.cert_date ? (moment(certificate.cert_date).format('YYYY-MM-DD')) : certificate.cert_date} onChange={(e) => handleChange(e, index, 'cert_date')} className='form-control form-control-lg' type='date' />
                            <FormFeedback>{!cert_date ? 'This field is required' : 'Date should not be greater than the current date'}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col sm={12} xs={12} md={4} lg={5} xl={5} className='d-flex align-items-center'>
                        <div>
                            <FormGroup className={`align-items-center mt-3 ${isVisCert && !certificate.certificate ? 'pt-4' : ''}`} style={{ height: 'auto' }}>
                                <input type='file'
                                    accept='.jpg, .png, .jpeg, .pdf'
                                    style={{ display: 'none' }}

                                    onChange={(e) => this.handleFileSelect(e, index)} ref={(ref) => this.uploadFile = ref} className='form-control form-control-lg' />
                                <Button onFocus={() => handleFocus('isVisCert', index)} onClick={(e) => this.handleClick()} className="btn btn-primary jr-btn jr-btn-lg" type='submit' variant="contained" color="primary">
                                    {certificate.certificate ? 'File Uploaded' : 'Upload File'}
                                </Button>
                                <Input className='' style={{ display: 'none' }}
                                    onFocus={() => handleFocus('isVisCert', index)}
                                    invalid={isVisCert && !certificate.certificate}
                                    value={certificate.certificate} type='text' />
                                <FormFeedback >Please upload photo</FormFeedback>
                            </FormGroup>
                        </div>

                        {
                            certificate.certificate &&
                            <Button className="btn btn-succes jr-btn jr-btn-lg text-white " type='submit' variant="contained" >
                                <a href={certificate.certificate.length > 60 ? certificate.certificate : certificate.certificate.includes('.pdf') ? `${AppConfig.imageUrl}/certifications/${certificate.certificate}` : `${AppConfig.imageUrl}/certifications/${certificate.certificate}.jpg`} target='_blank' style={{ textDecoration: 'none' }} download>  View
                               </a>
                            </Button>

                        }
                        {/* {length !== 1 &&/ */}
                        {length > 0 &&

                            < Button onClick={() => handleRemove(index)} className="btn btn-danger jr-btn jr-btn-lg" type='submit' variant="contained" color="secondary">
                                Remove
                        </Button>
                        }

                    </Col>
                </Row>

                <Divider className='mb-3 mt-3' />
            </>)
    }
}

export default CertiFicateComponent;