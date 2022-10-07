import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import OrderDetailsHeader from 'components/ContainerHeader';
import { Col, Row, Form, Badge, Label, Input } from 'reactstrap';
import IntlMessages from 'util/IntlMessages';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import moment from 'moment'
import Axios from 'util/axiosRequest'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CardBox from 'components/Card'
import TimeLine from './timelineStatus'
import { NewReleases, CreditCard } from '@material-ui/icons';
import DataLoader from 'components/DataLoader'
import DialogAlert from 'components/Dialog'
import { apiFailed, addEditAstrolgerSuccess, getOrderDetailsId } from 'actions/auth'
import UserCard from 'components/UserCard';
import Product from 'components/ProductDetails'


let some = 0;
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const styles = theme => ({
    root: {
        width: "100%",
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    },
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    },
    responsiveScroll: {
        overflowX: 'auto',
        overflow: 'auto',
        height: '100%',
        maxHeight: '600px',
        minHeight: '500px'
    },
});
class OrderDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            isRequested: false,
            updatedProduct: [],
            status: 'New',
            product: {},
            statusBadge: ' ',
            totalValue: 0,
            finalfinal: 0,
            product: '',
            openAlert: false,
            product: ''
        }
    }


    componentDidMount = async () => {
        this.props.getOrderDetailsId({ order_id: this.props.match.params.id }, this.props.history)

    }
    getTimeLine = () => {
        let { classes, orderDetails } = this.props;
        let product = orderDetails
        return <div className='timeline-section timeline-center'>
            {
                product && product.order_status.length > 0 ?
                    product.order_status.map((value, key) => {
                        return <TimeLine styleName={(key === 0 || key === 2 || key === 4 || key === 6 || key === 8 || key === 10) ? 'timeline-inverted' : ''} timeLine={value} color={value.status === 'Processed' ? 'bg-primary' : value.status === 'New' ? 'bg-danger' : value.status === 'Cancelled' ? 'bg-info' : value.status === 'Ready For Dispatch' ? 'bg-warning' : value.status === 'Delivered' ? 'bg-success' : 'bg-info'}>
                            {
                                value.status === 'Processed' ? <CreditCard /> : value.status === 'New' ? <NewReleases /> : value.status === 'Cancelled' ? <div><i style={{ fontSize: '1.5rem', paddingTop: 0 }} class="zmdi zmdi-close"></i></div> : value.status === 'Ready For Dispatch' ? <div><i style={{ fontSize: '1.5rem', paddingTop: 14 }} class="zmdi zmdi-run"></i></div> : value.status === 'Delivered' ? <div><i style={{ fontSize: '1.5rem', paddingTop: 0 }} class="zmdi zmdi-check"></i></div> : <div><i style={{ fontSize: '1.5rem', paddingTop: 14 }} class="zmdi zmdi-truck"></i></div>}
                        </TimeLine>
                    }) : ''
            }
        </div>
    }
    getButton = () => {
        let { product } = this.state
        return (
            <div>
                <Button onClick={this.buttonB} className='mr-2' variant="outlined" color="primary">
                    Track
                </Button>{' '}
                {product && product.current_status == 'New' && <Button onClick={this.buttonC} variant="outlined" color="secondary">
                    Process
                </Button>}
            </div>
        )
    }
    buttonB = (data) => {
        this.setState({ openAlert: true, message: 'Track' })
    }
    buttonC = (data) => {
        this.setState({ openAlert: true, message: 'Process' })
    }
    handleRequestClose = () => {
        this.setState({ openAlert: false, order_id: '', ishidden: false })
    }
    changeStatus = async () => {
        let data = await Axios.axiosHelperFunc('post', 'productOrder/changeOrderStatus', { order_id: this.state.product._id })
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.componentDidMount()
            this.handleRequestClose()
        } else if (data.data && data.error == true) {
            this.props.apiFailed(data.data.title)
        }
    }
    render() {
        let { classes, orderDetails } = this.props;
        let product = orderDetails;
        let { user_id } = product;

        // let user_card = product.user_id ? {
        //     data1: product.user_id.shipping_name, icon1: 'zmdi-account', icon2: 'zmdi-pin', icon3: 'zmdi-phone',
        //     data2: user_id.user_address ? `${user_id.user_address ? user_id.user_address.block_number : ''} ${user_id.user_address.building_name} ${user_id.user_address.street_address} ${user_id.user_address.pincode} ${user_id.user_address.user_state}` : 'N/A',
        //     data3: user_id.shipping_number
        // } : '';

        let user_card = product.user_id ? {
            data1: product.user_address.shipping_name, icon1: 'zmdi-account', icon2: 'zmdi-pin', icon3: 'zmdi-phone',
            data2: product.user_address ? `${product.user_address ? product.user_address.block_number : ''} ${product.user_address.building_name} ${product.user_address.street_address} ${product.user_address.pincode} ${product.user_address.user_state}` : 'N/A',
            data3: product.user_address.shipping_number
        } : '';

        let product_card = product ? { data1: product.order_number, icon1: '', title1: 'Order Number', icon2: '', title2: 'Current Status', title3: 'Total Amount', data2: product.current_status, icon3: '', data3: `₹ ${Number(product.total_amount).toFixed(2)}`, isProduct: true } : ''

        return (
            <React.Fragment>


                <div className="parent animated slideInUpTiny animation-duration-3">
                    <div className="row">
                        <Col sm={12} xs={12} md={4} lg={4} xl={4} className='mb-5'>
                            <CardBox className={classes.responsiveScroll}>
                                {
                                    this.getTimeLine()
                                }
                            </CardBox>
                        </Col>
                        <Col sm={12} xs={12} md={8} lg={8} xl={8}>
                            <Row>
                                <Col sm={12} xs={12} md={6} lg={6} xl={6} >

                                    <UserCard data={product_card} />
                                </Col>
                                <Col sm={12} xs={12} md={6} lg={6} xl={6} >
                                    <UserCard data={user_card} />
                                </Col>
                                <Col sm={12} xs={12} md={12} lg={12} xl={12} >
                                    <Paper className={classes.root}>
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <CustomTableCell>Title</CustomTableCell>
                                                    <CustomTableCell align="right">Cost</CustomTableCell>
                                                    <CustomTableCell align="right">Quantity</CustomTableCell>
                                                    <CustomTableCell align="right">Final Price</CustomTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {product ? product.products.map((row, i) => (
                                                    <TableRow key={i}>
                                                        <CustomTableCell component="th" scope="row">
                                                            {row.product_id.name}
                                                        </CustomTableCell>
                                                        <CustomTableCell align="right">{row.rate.toFixed(2)}</CustomTableCell>
                                                        <CustomTableCell align="right">{row.quantity}</CustomTableCell>
                                                        <CustomTableCell align="right">{(row.quantity * row.rate).toFixed(2)}</CustomTableCell>
                                                    </TableRow>
                                                ))
                                                    :
                                                    <TableRow key={0}>
                                                        <CustomTableCell align="right"><h3>No data found</h3></CustomTableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>

                                    </Paper>

                                    {/*<div className="jr-card jr-full-card">
                                        <Product data={product ? product.products : []} tableStyle="full-table-last-sm" />
                            </div>*/}
                                    {/*<div className="jr-card mb-0 ">
                                        <Row>
                                            {product && product.products.map((products, index) => <Product key={index} product={products} title='Products' />)}
                                        </Row>
                            </div>*/}

                                </Col>
                            </Row>
                        </Col>
                        {/*<div className="col-12">
                            <div className="jr-card chart-user-statistics bg-primary text-white">
                                <div className="orderDetails px-4 mb-4">
                                    <Row className="pb-4">
                                        <Col xs={12} xl={6} sm={12} md={6} lg={6} className="orderDetailsMainCol">
                                            <div className="p-1">

                                                <span className="align-self-center ml-1">
                                                    ORDER ID: {product.order_number}
                                                </span>
                                            </div>
                                            <div className="p-1">

                                                <span className="align-self-center ml-1 text-uppercase">
                                                    CURRENT STATUS: {product.current_status}
                                                </span>
                                            </div>
                                            <div className="p-1">

                                                <span className="align-self-center ml-1">
                                                    ORDER COST: ₹ {product.total_amount}
                                                </span>
                                            </div>

                                        </Col>
                                        <Col xs={12} xl={6} sm={12} md={6} lg={6} className="orderDetailsMainCol">
                                            <div className="p-1">
                                                <i className="zmdi zmdi-account zmdi-hc-fw zmdi-hc-sm text-white align-self-center" />
                                                <span className="align-self-center ml-1 text-uppercase">
                                                    {product.user_id ? product.user_id.first_name : 'N/A'}
                                                </span>
                                            </div>
                                            <div className="p-1">
                                                <i className="zmdi zmdi-pin zmdi-hc-fw zmdi-hc-sm text-white align-self-center" />
                                                <span className="align-self-center ml-1 text-uppercase">
                                                    {user_id && user_id.user_address && `${user_id.user_address ? user_id.user_address.block_number : ''} ${user_id.user_address.building_name} ${user_id.user_address.street_address} ${user_id.user_address.pincode} ${user_id.user_address.user_state}`}
                                                </span>
                                            </div>
                                            <div className="p-1">
                                                <i className="zmdi zmdi-phone zmdi-hc-fw zmdi-hc-sm text-white align-self-center" />
                                                <span className="align-self-center ml-1">
                                                    {user_id ? user_id.mobile : 'N/A'}
                                                </span>
                                            </div>

                                        </Col>

                                    </Row>
                                </div>
                            </div>
                        </div>*/}
                    </div>

                    {/* <div className="row">
                        <Paper className={classes.root}>
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>Title</CustomTableCell>
                                        <CustomTableCell align="right">Cost</CustomTableCell>
                                        <CustomTableCell align="right">Quantity</CustomTableCell>
                                        <CustomTableCell align="right">Final Price</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {product ? product.products.map((row, i) => (
                                        <TableRow key={i}>
                                            <CustomTableCell component="th" scope="row">
                                                {row.product_id.name}
                                            </CustomTableCell>
                                            <CustomTableCell align="right">{row.rate}</CustomTableCell>
                                            <CustomTableCell align="right">{row.quantity}</CustomTableCell>
                                            <CustomTableCell align="right">{row.quantity * row.rate}</CustomTableCell>
                                        </TableRow>
                                    ))
                                        :
                                        <TableRow key={0}>
                                            <CustomTableCell align="right"><h3>No data found</h3></CustomTableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>

                        </Paper>
                                </div>*/}
                </div>
                <DialogAlert open={this.state.openAlert} close='close' handleClose={this.handleRequestClose} handleYes={this.state.message == 'Track' ? '' : this.changeStatus} title={`${this.state.message} order`} description={this.state.message == 'Track' ? this.getTimeLine() : 'Are you sure you want to process this order'} />

            </React.Fragment>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { orderDetails, totalValue } = auth;
    return { orderDetails, totalValue }
};

export default connect(mapStateToProps, { apiFailed, addEditAstrolgerSuccess, getOrderDetailsId })(withStyles(styles)(OrderDetails));