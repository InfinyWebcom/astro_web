import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { listOrder, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Axios from 'util/axiosRequest'
import ButtonGroup from 'components/buttonGroup';
import MUIDataTable from "components/DataTable";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppConfig from 'constants/config'
import MonthYearFilter from 'components/MonthYearFilter'
import TimeLine from './timelineStatus'
import { NewReleases, CreditCard } from '@material-ui/icons';
import DataLoader from 'components/DataLoader'
import { textCapitalize } from 'util/helper'
import DialogAlert from 'components/Dialog'
import moment from 'moment'
import ProcessOrder from 'components/ProcessOrder'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function TabContainer({ children, dir }) {
    return (
        <div dir={dir} >
            {children}
        </div>
    );
}

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
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
    appBar: {
        backgroundColor: '#4326a7 ',
        color: '#fff',
        borderBottom: "2px solid"
    },
    MuiPaperRounded: {
        borderRadius: 0
    }
});

const statusArray = ['New', 'Processed', 'Others', 'Delivered', 'Cancelled']
class Order extends Component {
    constructor(props) {
        super(props);
        let url = props.location.search
        let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''
        console.log('json======================', json)
        let date = new Date()
        this.state = {
            message: '',
            open: false,
            order_id: '',
            ishidden: false,
            data: [],
            page: json.page ? Number(json.page) : 0,
            perPage: 20,
            value: json.value ? Number(json.value) : 0,
            month: json.month ? Number(json.month) : date.getMonth(),
            year: json.year ? Number(json.year) : date.getFullYear(),
            tempMonth: json.tempMonth ? Number(json.month) : date.getMonth(),
            tempYear: json.tempYear ? Number(json.year) : date.getFullYear(),
            openAlert: false,
            product: '',
            loading: false,
            openAlertTrack: false,

            loader: false,
            cancelOrderDialog: false,
            cancelOrderData: ''

        }
    }
    componentDidMount = async () => {
        this.props.listOrder({ page: Number(this.state.page) + 1, perPage: this.state.perPage, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.orders !== this.props.orders) {
            let temp = []
            this.props.orders.map((val, i) => {
                temp.push([`${textCapitalize(val.user_id.first_name)}`, `₹ ${Number(val.total_amount).toFixed(2)}`, val.current_status, moment(val.createdAt).format('MMMM Do YYYY, h:mm a'), this.getAction(val)])
            })
            this.setState({ data: temp })
        }
    }
    changePage = (page) => {
    
        let pages = page + 1
        let data = {
            page: pages,
            perPage: this.state.perPage,
            filter: '',
            searchText: this.state.searchedText,
            status: statusArray[this.state.value],
            month:  Number(this.state.month) + 1,
            year: this.state.year
        }
        let obj = { month: Number(this.state.month), year: this.state.year, value: this.state.value, page: page }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/orders/lists?${url}`)
        this.props.listOrder(data, this.props.history)
        this.setState({ page })

    }
    handleClick = () => {
        this.props.history.push('/admin/astroshops/Order/addOrder')
    }
    getAction = (data) => {
        return <ButtonGroup id={data} buttonA={this.buttonA} buttonB={this.buttonB} buttonC={this.buttonC} buttonD={this.buttonD} LabelA={'Details'} LabelB='Track' LabelC={data.current_status == 'New' ? 'Process' : ''} LabelD={data.current_status == 'New' ? 'Cancel' : ''} />
    }
    buttonA = (data) => {
        this.props.history.push(`/admin/orders/details/${data._id}`)
    }
    buttonB = (data) => {
        this.setState({ openAlertTrack: true, order_id: data._id, product: data, message: 'Track' })
    }
    buttonC = (data) => {
        this.setState({ openAlert: true, order_id: data._id, product: data, message: 'Process' })
    }
    buttonD = (params) => {

        this.setState({ cancelOrderDialog: true, cancelOrderData: params })
        console.log('Cancel Order :', params);

    }
    handleRequestClose = () => {
        this.setState({ openAlert: false, openAlertTrack: false, ishidden: false })
    }
    changeStatus = async (args) => {
        this.setState({ loading: true })
        this.handleRequestClose()
        console.log('inside changeStatus', args)

        // let data = await Axios.axiosHelperFunc('post', 'productOrder/changeOrderStatus', { order_id: this.state.order_id })
        // if (data.data && data.data.error == false) {
        //     this.props.addEditAstrolgerSuccess(data.data.title)
        //     this.props.listOrder({ page: Number(this.state.page) + 1, perPage: this.state.perPage, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

        // }
        // else if (data.data && data.error == true) {
        //     this.props.apiFailed(data.data.title)
        //     this.props.listOrder({ page: Number(this.state.page) + 1, perPage: this.state.perPage, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
        // }
        this.setState({ loading: false })
    }
    handleChange = (event, value) => {
       
        this.setState({ value });
        let obj = { month: Number(this.state.month), year: this.state.year, value: Number(value), page: 0 }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/orders/lists?${url}`)
        this.props.listOrder({ page: 0, perPage: this.state.perPage, status: statusArray[value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

    }
    handleChangeIndex = index => {
      
        this.setState({ value: index });
        let obj = { month: Number(this.state.month), year: this.state.year, value: Number(index), page: 0 }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/orders/lists?${url}`)
        this.props.listOrder({ page: 0, perPage: this.state.perPage, status: statusArray[index], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
    
    }
    dateTable = (title, data, columns, options) => {
        return <MUIDataTable
            className={this.props.classes.MuiPaperRounded}
            title=''
            data={data}
            columns={columns}
            options={options}
        />
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ tempMonth: this.state.month, tempYear: this.state.year, open: false })
    }
    handleApply = () => {
        let obj = { month: Number(this.state.tempMonth), year: this.state.tempYear, value: this.state.value, page: Number(this.state.page) + 1 }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/orders/lists?${url}`)
        this.props.listOrder({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], perPage: this.state.perPage, month: Number(this.state.tempMonth) + 1, year: this.state.tempYear }, this.props.history)
        this.setState({ month: this.state.tempMonth, year: this.state.tempYear, open: false })
    }
    handleChangeState = (e, key) => {
        this.setState({ [key]: e.target.value })
    }
    getTimeLine = () => {
        let { product } = this.state
        return <div className='timeline-section timeline-center'>
            {
                product && product.order_status.length > 0 ?
                    product.order_status.map((value, key) => {
                        return <TimeLine styleName={(key === 0 || key === 2 || key === 4 || key === 6 || key === 8 || key === 10) ? 'timeline-inverted' : ''} timeLine={value}
                            color={value.status === 'Processed' ?
                                'bg-primary' :
                                value.status === 'New' ? 'bg-danger' :
                                    value.status === 'Cancelled' ? 'bg-info' :
                                        value.status === 'Ready For Dispatch' ? 'bg-warning' :
                                            value.status === 'Delivered' ? 'bg-success' : 'bg-info'}>
                            {
                                value.status === 'Processed' ?
                                    <CreditCard /> :
                                    value.status === 'New' ? <NewReleases /> :
                                        value.status === 'Cancelled' ? <div><i style={{ fontSize: '1.5rem', paddingTop: 0 }} class="zmdi zmdi-close"></i></div> :
                                            value.status === 'Ready For Dispatch' ? <div><i style={{ fontSize: '1.5rem', paddingTop: 14 }} class="zmdi zmdi-run"></i></div> :
                                                value.status === 'Delivered' ? <div><i style={{ fontSize: '1.5rem', paddingTop: 0 }} class="zmdi zmdi-check"></i></div> :
                                                    <div><i style={{ fontSize: '1.5rem', paddingTop: 14 }} class="zmdi zmdi-truck"></i></div>}
                        </TimeLine>
                    }) : ''
            }
        </div>
    }

    changeOrderStatus = async (args) => {
        this.setState({ loading: true })
        this.handleRequestClose()
        console.log('inside changeOrderStatus', args)

        let data = await Axios.axiosHelperFunc('post', 'productOrder/changeOrderStatus', {
            order_id: this.state.order_id,
            total_amount: args.total_amount,
            invoice_number: args.invoice_number,
            length: args.length,
            breadth: args.breadth,
            height: args.height,
            weight: args.weight
        })

        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.props.listOrder({ page: Number(this.state.page) + 1, perPage: this.state.perPage, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

        }
        else if (data.data && data.error == true) {
            this.props.apiFailed(data.data.title)
            this.props.listOrder({ page: Number(this.state.page) + 1, perPage: this.state.perPage, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
        }
        this.setState({ loading: false })
    }

    handleCancelOrderClose = () => {
        this.setState({ cancelOrderDialog: false })
    }

    handleConfirmCancelOrder = async () => {

        console.log('State Cancel 1 :', this.state.cancelOrderData);

        let { cancelOrderData } = this.state;
        let response = await Axios.axiosHelperFunc('post', 'productOrder/cancelProductOrder', { 'order_id': cancelOrderData._id })
        console.log('State Cancel 2 :', response);

        if (response.data.error) {
            NotificationManager.error(response.data.title, null, 1500)
        }
        else {
            this.setState({ cancelOrderDialog: false })
            NotificationManager.success(response.data.title, null, 1500)
            this.props.listOrder({ page: Number(this.state.page) + 1, perPage: this.state.perPage, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
        }


    }

    render() {

        let { classes, Order } = this.props;
        console.log('Order', Order)

        const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            viewColumns: false,
            selectableRows: false,
            // resizableColumns:true,
            count: this.props.total_count,
            page: Number(this.state.page),
            perPage: this.state.perPage,
            fixedHeader: true,
            print: false,
            download: false,
            filter: false,
            sort: false,
            selectableRows: false,
            serverSide: true,
            server: true,
            selectableRowsOnClick: false,
            selectableRows: 'none',
            fixedHeader: true,
            search: false,
            rowsPerPage: this.state.perPage,
            onTableChange: (action, tableState) => {
                console.log('action=', action, tableState)
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page);
                        break;

                }
            },
        }

        let columns = ["Consumer", "Amount", "Status", "Date", "Actions"]
        let { data, loader } = this.state

        console.log('classes===', classes)

        return (
            <div className=" animated slideInUpTiny animation-duration-3">

                <div className="w-100">
                    <AppBar className={"bg-primary d-none d-md-block " + classes.appBar} position="static" >
                        <Tabs

                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="info"
                            variant="fullWidth"
                            scrollButtons="on"
                        >
                            <Tab className="tab" label="New" />
                            <Tab className="tab" label="Processed" />
                            <Tab className="tab" label="Others" />
                            <Tab className="tab" label="Delivered" />
                            <Tab className="tab" label="Cancelled" />
                        </Tabs>
                    </AppBar>
                    <AppBar className={"bg-primary  d-md-none " + classes.appBar} position="static" >
                        <Tabs

                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="info"
                            variant="scrollable"
                            scrollButtons="on"
                        >
                            <Tab className="tab" label="New" />
                            <Tab className="tab" label="Processed" />
                            <Tab className="tab" label="Others" />
                            <Tab className="tab" label="Delivered" />
                            <Tab className="tab" label="Cancelled" />
                        </Tabs>
                    </AppBar>
                    {this.props.loading || this.state.loading ? <DataLoader /> :
                        <SwipeableViews
                            axis={'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                            <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                            <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                            <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                            <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                        </SwipeableViews>
                    }
                </div>

                {/* <DialogAlert
                    open={this.state.openAlert}
                    close='close'
                    handleClose={this.handleRequestClose}
                    handleYes={this.state.message == 'Track' ? '' : this.changeStatus}
                    title={`${this.state.message} Order`}
                    description={this.state.message == 'Track' ? this.getTimeLine() : 'Are you sure you want to process this order?'}
                    order={this.state}
                /> */}

                <DialogAlert
                    open={this.state.openAlertTrack}
                    close='close'
                    handleClose={this.handleRequestClose}
                    handleYes={''}
                    title={`${this.state.message} Order`}
                    description={this.getTimeLine()}
                    order={this.state}
                />

                <ProcessOrder
                    open={this.state.openAlert}
                    close='close'
                    handleClose={this.handleRequestClose}
                    handleYes={this.state.message == 'Track' ? '' : this.changeOrderStatus}
                    title={`${this.state.message} Order`}
                    description={this.state.message == 'Track' ? this.getTimeLine() : 'Are you sure you want to process this order?'}
                    order={this.state}
                />

                {/* Cancel Order Modal */}
                <Dialog open={this.state.cancelOrderDialog} onClose={this.handleCancelOrderClose} fullWidth={true} maxWidth={'sm'}>
                    <DialogTitle>
                        {'Cancel Order'}
                        {loader ?
                            <div className="loader-view">
                                <CircularProgress />
                            </div> : null}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Are you sure you want to cancel this order?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCancelOrderClose} color='secondary'>No</Button>
                        <Button onClick={this.handleConfirmCancelOrder} color='primary'>Yes</Button>
                    </DialogActions>
                </Dialog>


            </div>
        );
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => {
    let { orders, loading, total_count } = auth
    return { orders, loading, total_count }
}

export default connect(mapStateToProps, { listOrder, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Order))