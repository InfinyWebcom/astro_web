
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactStrapTextField from '../../components/reactstrapText/index';
import ReactstrapSelectField from '../../components/reactstrapSelect/index';
import { Field, reduxForm, getFormInitialValues, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { emailField, validatePhone, required } from '../../constants/validations';
import asyncValidate from '../../constants/asyncValidate'
import { Col, Row } from 'reactstrap';
import Axios from 'util/axiosRequest'
import { listOrder, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'

class ProcessOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_amount: '',
            invoice_number: '',
            invoice_image: null,
            length: 20,
            breadth: 12,
            height: 20,
            weight: ''
        }
    }

    componentDidMount = async () => {
        this.props.initialize({
            total_amount: this.props.order ? this.props.order.product.total_amount : this.state.total_amount,
            length: 20,
            breadth: 12,
            height: 20,
            // invoice_number: this.props.order ? this.props.order.product.invoice_number : this.state.invoice_number,
        });
        this.setState({
            total_amount: this.props.order ? this.props.order.product.total_amount : this.state.total_amount,
            length: 20,
            breadth: 12,
            height: 20,
            // invoice_number: this.props.order ? this.props.order.product.invoice_number : this.state.invoice_number,
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.order !== prevProps.order) {
            this.props.initialize({
                total_amount: this.props.order ? this.props.order.product.total_amount : this.state.total_amount,
                length: 20,
                breadth: 12,
                height: 20,
                // invoice_number: this.props.order ? this.props.order.product.invoice_number : this.state.invoice_number,
            });
            this.setState({
                total_amount: this.props.order ? this.props.order.product.total_amount : this.state.total_amount,
                length: 20,
                breadth: 12,
                height: 20,
                // invoice_number: this.props.order ? this.props.order.product.invoice_number : this.state.invoice_number,
            });
        }
    }

    handleChange = (event, key) => {
        this.setState({ [key]: event.target.value });
    }

    handleFileSelect = async (e) => {
        e.preventDefault();
        let file = e.target.files[0]
        console.log('invoice_image', file);
        this.setState({ invoice_image: file })
    }

    onSubmit = async (e) => {
        this.props.handleYes(this.state)
    }

    render() {

        let { handleClose, close, open, handleYes, title, description, order, handleSubmit } = this.props;
        const { total_amount, invoice_number, invoice_image, length, breadth, height } = this.state;

        console.log('check', order);
        console.log('state', this.state);

        return (
            <div>
                <Dialog fullWidth={true} open={open} onClose={handleClose}>

                    <form noValidate onSubmit={handleSubmit(this.onSubmit)} autoComplete='off'>

                        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

                        <DialogContent>

                            <Row>
                                <Col xs={12} md={12} sm={12} xl={12} lg={12}>
                                    <Field id='total_amount' name='total_amount' type='text'
                                        component={ReactStrapTextField} label='Value of Invoice'
                                        validate={[required]}
                                        value={total_amount}
                                        disabled={true}
                                        onChange={(e) => this.handleChange(e, 'total_amount')}
                                    />
                                </Col>
                            </Row>

                            {/* <Row>
                                <Col xs={12} md={12} sm={12} xl={12} lg={12}>
                                    <Field id="invoice_number" name="invoice_number" type="text"
                                        component={ReactStrapTextField} label="Invoice Number"
                                        validate={[required]}
                                        value={invoice_number}
                                        onChange={(e) => this.handleChange(e, 'invoice_number')}
                                    />
                                </Col>
                            </Row> */}

                            <Row>
                                <Col xs={12} md={12} sm={12} xl={12} lg={12}>
                                    <Field id="length" name="length" type="number"
                                        component={ReactStrapTextField} label="Length (cm)"
                                        validate={[required]}
                                        value={length}
                                        disabled={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12} sm={12} xl={12} lg={12}>
                                    <Field id="breadth" name="breadth" type="text"
                                        component={ReactStrapTextField} label="Breadth (cm)"
                                        validate={[required]}
                                        disabled={true}
                                        value={breadth}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12} sm={12} xl={12} lg={12}>
                                    <Field id="height" name="height" type="text"
                                        component={ReactStrapTextField} label="Height (cm)"
                                        validate={[required]}
                                        disabled={true}
                                        value={height}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12} sm={12} xl={12} lg={12}>
                                    <Field
                                        name="weight"
                                        component={ReactstrapSelectField}
                                        label="Weight"
                                        validate={required}
                                        value={'weight'}
                                        type="select"
                                        onChange={(e) => this.handleChange(e, 'weight')}
                                    >
                                        <option value=" ">Select weight</option>
                                        <option value='0.5'>0.5 kg</option>
                                        <option value='1'>1.0 kg</option>
                                        <option value='1.5'>1.5 kg</option>
                                        <option value='2'>2.0 kg</option>
                                        <option value='2.5'>2.5 kg</option>
                                        <option value='3'>3.0 kg</option>
                                        <option value='3.5'>3.5 kg</option>
                                        <option value='4'>4.0 kg</option>
                                    </Field>
                                </Col>
                            </Row>

                            {/* <Row >
                                <Col xs={4} md={4} sm={4} xl={4} lg={4}>
                                    <div variant='contained' className='jr-btn text-white mt-3' style={{ backgroundColor: '#4326a7', cursor: 'pointer' }} >
                                        <label for='file-input' style={{ cursor: 'pointer' }}>
                                            <i className='zmdi zmdi-plus-circle zmdi-hc-fw m-1' />
                                            <span className='m-2'>Upload Invoice</span>
                                        </label>
                                    </div>
                                    <input id='file-input' type='file' accept='.jpg, .png, .jpeg, .pdf' style={{ display: 'none' }} onChange={(e) => this.handleFileSelect(e)} />
                                </Col>
                                <Col xs={8} md={8} sm={8} xl={8} lg={8}>
                                    <h4 className='mt-4'>{invoice_image ? invoice_image.name : null}</h4>
                                </Col>
                            </Row> */}
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                {close}
                            </Button>
                            {/* {
                                handleYes &&
                                <Button onClick={handleYes} color="primary" autoFocus>
                                    Process
                                </Button>
                            } */}
                            <Button type='submit' color='primary'>Process</Button>
                        </DialogActions>

                    </form>

                </Dialog>
            </div>
        );
    }
}

ProcessOrder = connect(null, {})(ProcessOrder)

export default ProcessOrder = reduxForm({
    form: 'ProcessOrder',
    asyncValidate,
})(ProcessOrder);
