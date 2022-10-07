import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import { Field, reduxForm, getFormInitialValues, initialize, change } from 'redux-form'
import { addEditServices } from 'actions/auth'
import Button from '@material-ui/core/Button';
import { Row, Col, Label } from 'reactstrap';
import Axios from 'util/axiosRequest'
import { connect } from 'react-redux'
import CardBox from 'components/CardBox';
import { required, emailField, number, validatePhone, speciaCharacter, latlong, arrayData } from 'constants/validations'
import TextField from 'components/reactstrapText';
import { NotificationManager } from 'react-notifications';
class AddTip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.match.params.id,
            signs: [],

        }
    }
    componentDidMount = async () => {
        await this.getSigns()
        await this.getTipByDate()
    }
    getSigns = async () => {
        let data = await Axios.axiosHelperFunc('post', 'admin/getAstroSignsList', {})
        console.log('getSigns===', data)
        if (data.data && data.data.error == false) {
            this.setState({ signs: data.data.data })
            let temp = data.data.data

        }
    }
    getValue = (array, id) => {
        let index = array.findIndex((val) => val.sign._id == id)
        let val = index > -1 ? array[index].description : ''
        return val
    }
    getTipByDate = async () => {
        let { signs, date } = this.state
        let data = await Axios.axiosHelperFunc('post', 'admin/getTipOfTheDay', { tip_date: date })
        if (data.data && data.data.error == false) {
            let { tip } = data.data.data
            console.log('tipss=', tip, signs)
            this.props.initialize({
                [signs[0]._id]: this.getValue(tip, signs[0]._id), [signs[1]._id]: this.getValue(tip, signs[1]._id), [signs[2]._id]: this.getValue(tip, signs[2]._id), [signs[3]._id]: this.getValue(tip, signs[3]._id), [signs[4]._id]: this.getValue(tip, signs[4]._id), [signs[5]._id]: this.getValue(tip, signs[5]._id), [signs[6]._id]: this.getValue(tip, signs[6]._id), [signs[7]._id]: this.getValue(tip, signs[7]._id),
                [signs[8]._id]: this.getValue(tip, signs[8]._id), [signs[9]._id]: this.getValue(tip, signs[9]._id), [signs[10]._id]: this.getValue(tip, signs[10]._id), [signs[11]._id]: this.getValue(tip, signs[11]._id),
            })

        } else {
            this.props.initialize({
                [signs[0]._id]: '', [signs[1]._id]: '', [signs[1]._id]: '', [signs[3]._id]: '', [signs[4]._id]: '', [signs[5]._id]: '', [signs[6]._id]: '', [signs[7]._id]: '',
                [signs[8]._id]: '', [signs[9]._id]: '', [signs[10]._id]: '', [signs[11]._id]: '',
            })

        }
    }
    submit = async () => {

        let { values } = this.props.addtip
        console.log('addtip', values, Object.keys(values), Object.values(values))
        let keys = Object.keys(values)
        let value = Object.values(values)
        let data = []
        let isAnyData = false
        let i = 0
        for (i = 0; i < keys.length; i++) {
            if (value[i] && value[i].trim()) {
                isAnyData = true
            }
            data.push({
                sign: keys[i],
                description: value[i] ? (value[i]).trim() : ''
            })
        }
        let data2 = await Axios.axiosHelperFunc('post', 'admin/addTipOfTheDay', { tip: data, tip_date: this.state.date })
        console.log('data2', data2.data)
        if (data2.data && data2.data.error == false) {
            NotificationManager.success(data2.data.title)
            this.props.history.push('/admin/tod/lists')
        } else {
            NotificationManager.error(data2.data.title)
        }


    }
    render() {
        const { handleSubmit, pristine, reset, submitting, loader, showMessage, alertMessage } = this.props
        let { signs } = this.state
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">
                <CardBox styleName="col-12" heading={''}
                    headerOutside>
                    <form onSubmit={handleSubmit(this.submit)}>
                        <Row >
                            {
                                signs.map((val, index) => {
                                    return <Row className='col-12' key={index}>

                                        <Col sm={6} xs={12} md={12} lg={12}>
                                            <Field name={val._id} type="textarea"
                                                component={TextField}
                                                fullWidth={true}
                                                validate={speciaCharacter}
                                                label={val.name}
                                                margin="normal"
                                                classNameField='form-control form-control-lg text-area'
                                                placeholder=''

                                            />
                                        </Col>
                                    </Row>

                                })
                            }

                        </Row>

                        <Row >
                            <Col className="mt-4 mb-2">
                                <Button disabled={this.props.submitting || pristine} className="btn btn-primary jr-btn jr-btn-lg" type='submit' variant="contained" color="primary">
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
    const { addtip } = form
    return { loader, alertMessage, showMessage, authUser, addtip }
};
AddTip = connect(
    mapStateToProps,           // bind account loading action creator
)(AddTip)
AddTip = reduxForm({
    form: 'addtip',// a unique identifier for this form
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    initialValues: getFormInitialValues('addtip')(),
    onSubmitSuccess: (result, dispatch) => {
        const newInitialValues = getFormInitialValues('addtip')();
        dispatch(initialize('addtip', newInitialValues));
    },
    destroyOnUnmount: true
})(AddTip)
export default AddTip;