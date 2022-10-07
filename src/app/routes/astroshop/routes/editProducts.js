import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import CardBox from 'components/CardBox'
import { connect } from 'react-redux'
import { Field, reduxForm, getFormInitialValues, initialize, change } from 'redux-form'
import { addEditProducts } from 'actions/auth'
import Button from '@material-ui/core/Button';
import { Row, Col, Label } from 'reactstrap';
import Axios from 'util/axiosRequest'
import ServicesForm from './servicesForm'
import AppConfig from 'constants/config'
import NotificationManager from 'react-notifications'
import ContentLoader from "react-content-loader"

class EditProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tempImage: '',
            isLoading: false
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        let data = await Axios.axiosHelperFunc('post', 'product/getProductDetails', { product_id: this.props.match.params.id })
        if (data.data && data.data.error == false) {
            let { name, description, rate, commission, commissionPer, image_url } = data.data.data
            this.props.initialize({ name: name, description: description, rate: rate, commission: commission, commissionPer: commissionPer })
            this.setState({ croppedImage: `${AppConfig.imageUrl}${image_url}.jpg`, tempImage: image_url, isLoading: false })
        } else {

        }
    }
    submit = () => {
        let { values } = this.props.editproducts
        let { name, description, rate, commission, commissionPer } = values
        if (this.state.croppedImage) {
            this.setState({ isLoading: true })
            this.props.addEditProducts({ name, description, rate, commission, commissionPer, image_url: this.state.croppedImage.includes('http') ? this.state.temoImage : this.state.croppedImage, url: 'product/editProduct', product_id: this.props.match.params.id }, this.props.history)
        } else {
            NotificationManager.error('Please upload image')

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
    handleChg = (e, key) => {
        let { values } = this.props.editproducts;
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
                        {this.state.isLoading ? this.MyLoader() : <>
                            <ServicesForm submitting={submitting} label='Image' croppedImage={this.state.croppedImage} index={0} handleCrop={this.handlePhoto} handleChange={this.handleChg}/>
                            <Row >
                                <Col className="mt-4 mb-2">
                                    <Button disabled={this.props.submitting} className="btn btn-primary  jr-btn jr-btn-lg" type='submit' variant="contained" color="primary">
                                        Submit
                            </Button>

                                </Col>
                            </Row>
                        </>}
                    </form>
                </CardBox>
            </div>
        );
    }
}

const mapStateToProps = ({ auth, form }) => {
    const { loader, alertMessage, showMessage, authUser } = auth;
    const { editproducts } = form
    return { loader, alertMessage, showMessage, authUser, editproducts }
};
EditProducts = connect(
    mapStateToProps,
    { addEditProducts }              // bind account loading action creator
)(EditProducts)
EditProducts = reduxForm({
    form: 'editproducts',// a unique identifier for this form
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: getFormInitialValues('editproducts')(),
    onSubmitSuccess: (result, dispatch) => {
        const newInitialValues = getFormInitialValues('editproducts')();
        dispatch(initialize('editproducts', newInitialValues));
    },
})(EditProducts)

export default EditProducts;