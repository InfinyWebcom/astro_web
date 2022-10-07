import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import CardBox from 'components/CardBox'
import { connect } from 'react-redux'
import { reduxForm, change } from 'redux-form'
import { addEditServices } from 'actions/auth'
import { Col, Row } from 'reactstrap'
import Button from '@material-ui/core/Button';
import ServicesForm from './servicesForm'
import { NotificationManager } from 'react-notifications';

class AddServices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            croppedImage: ''
        }
    }
    componentDidMount = async () => {
        this.props.initialize({ name: '', description: '', rate: 0, commission: 0, commissionPer: 0 })
    }
    submit = () => {
        let { values } = this.props.addservices
        let { name, description, rate, commission, commissionPer } = values
        if (this.state.croppedImage) {
            this.props.addEditServices({ name, description, rate, commission, commissionPer, image_url: this.state.croppedImage, url: 'service/addService' }, this.props.history)
        } else {
            NotificationManager.error('Please upload image')
        }
    }
    handlePhoto = (data, i) => {
        this.setState({ croppedImage: data.data })
    }
    handleChg = (e, key) => {
        let { values } = this.props.addservices;
        let { name, description, rate, commission, commissionPer } = values;
        if (key == 'commission') {
            let newPer = ((Number(e.target.value) / Number(rate)) * 100).toFixed(2);
            this.props.initialize({ name: name, description: description, rate: rate, commission: e.target.value, commissionPer: newPer })
        } else if (key == 'commissionPer') {
            let newComm = ((Number(e.target.value) / 100) * Number(rate)).toFixed(2);
            this.props.initialize({ name: name, description: description, rate: rate, commission: newComm, commissionPer: e.target.value })
        } else if (key == 'rate') {
            let newPer = ((Number(commission) / Number(e.target.value)) * 100).toFixed(2);
            this.props.initialize({ name: name, description: description, rate: e.target.value, commission: commission, commissionPer: newPer })
        }
    }
    render() {
        const { handleSubmit, pristine, reset, submitting, loader, showMessage, alertMessage } = this.props
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">

                <CardBox styleName="col-12" heading={''}
                    headerOutside>
                    <form onSubmit={handleSubmit(this.submit)}>

                        <ServicesForm submitting={submitting} label='Image' croppedImage={this.state.croppedImage} index={0} handleCrop={this.handlePhoto} handleChange={this.handleChg}/>

                        <Row >
                            <Col className="mt-4 mb-2">
                                <Button disabled={this.props.submitting} className="btn btn-primary  jr-btn jr-btn-lg" type='submit' variant="contained" color="primary">
                                    Submit
                                </Button>

                            </Col>
                        </Row>

                    </form>
                </CardBox>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, form }) => {
    const { loader, alertMessage, showMessage, authUser } = auth;
    const { addservices } = form
    return { loader, alertMessage, showMessage, authUser, addservices }
};
AddServices = connect(
    mapStateToProps,
    { addEditServices }              // bind account loading action creator
)(AddServices)
AddServices = reduxForm({
    form: 'addservices',// a unique identifier for this form
    destroyOnUnmount: true
})(AddServices)

export default AddServices;