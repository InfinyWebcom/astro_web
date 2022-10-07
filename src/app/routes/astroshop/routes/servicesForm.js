import React, { Component } from 'react';
import Cropper from 'components/imageCropper'
import { Row, Col, Label } from 'reactstrap';
import { required, emailField, number, validatePhone, speciaCharacter, latlong, arrayData } from 'constants/validations'
import { Field } from 'redux-form'
import Button from '@material-ui/core/Button';
import TextField from 'components/reactstrapText'
class ServicesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        console.log('sfoimseiovwmsv',this.props)
        return (
            <Row>
                <Col sm={12} xs={12} md={3} lg={3} xl={3}>

                    <Cropper classNameField='card-business-logo1' label={'Image'} croppedImage={this.props.croppedImage} index={0} handleCrop={this.props.handleCrop} />

                </Col>
                <Col sm={12} xs={12} md={9} lg={9} xl={9}>
                    <Row>
                        <Col sm={12} xs={12} md={6} lg={6}>
                            <Field name="name" type="text"
                                component={TextField}
                                fullWidth={true}
                                validate={[required]}
                                label='Name'
                                margin="normal"
                                classNameField='form-control form-control-lg'
                                placeholder=''

                            />
                        </Col>

                        <Col sm={12} xs={12} md={6} lg={6}>
                            <Field name="rate" type="number"
                                component={TextField}
                                fullWidth={true}
                                validate={[required, number]}
                                label='Cost'
                                margin="normal"
                                prepend='₹'
                                classNameField='form-control form-control-lg'
                                placeholder=''
                                onChange={(e) => this.props.handleChange(e, 'rate')}
                            />
                        </Col>
                        <Col sm={12} xs={12} md={6} lg={6}>
                            <Field name="commission" type="number"
                                component={TextField}
                                fullWidth={true}
                                validate={[required]}
                                label='Commission in Rupees'
                                margin="normal"
                                classNameField='form-control form-control-lg'
                                placeholder=''
                                prepend='₹'
                                onChange={(e) => this.props.handleChange(e, 'commission')}
                            />
                        </Col>

                        <Col sm={12} xs={12} md={6} lg={6}>
                            <Field name="commissionPer" type="number"
                                component={TextField}
                                fullWidth={true}
                                validate={[required, number]}
                                label='Commission in Percentage'
                                margin="normal"
                                prepend='%'
                                classNameField='form-control form-control-lg'
                                placeholder=''
                                onChange={(e) => this.props.handleChange(e, 'commissionPer')}
                            />
                        </Col>
                        <Col sm={12} xs={12} md={12} lg={12}>
                            <Field name="description" type="textarea"
                                component={TextField}
                                fullWidth={true}
                                validate={[required]}
                                label='Description'
                                margin="normal"
                                classNameField='form-control form-control-lg text-area'
                                placeholder=''

                            />
                        </Col>


                    </Row>
                </Col>
            </Row>

        );
    }
}

export default ServicesForm;