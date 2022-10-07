import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { serviceRequestList, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Axios from 'util/axiosRequest'
import ButtonGroup from 'components/buttonGroup';
import MUIDataTable from "components/DataTable";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppConfig from 'constants/config'
import MonthYearFilter from 'components/MonthYearFilter';
import moment from 'moment';
import DialogAlert from 'components/Dialog'
import { Row, Col, Input, FormGroup, FormFeedback, Label } from 'reactstrap'
import { number } from 'constants/validations'
import DataLoader from 'components/DataLoader'
import { textCapitalize } from 'util/helper'
import ServiceDetails from '../Components/ServiceDetails';

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

const statusArray = ['New', 'Approved', 'Scheduled', 'Denied', 'Cancelled', 'Completed']
class SeviceRequest extends Component {
    constructor(props) {
        super(props);
        let url = props.location.search
        let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''

        let date = new Date()
        this.state = {
            message: '',
            open: false,
            service_id: '',
            ishidden: false,
            data: [],
            page: json.page ? Number(json.page) : 0,
            perPage: 10,
            value: json.value ? Number(json.value) : 0,
            month: json.month ? json.month : date.getMonth(),
            year: json.year ? json.year : date.getFullYear(),
            tempMonth: json.month ? json.month : date.getMonth(),
            tempYear: json.year ? json.year : date.getFullYear(),
            openAlert: false,
            astrologers: [],
            astrolger: '',
            cost: '',
            selectedData: '',
            viewServiceDialog : false,
            commission:'',
            commissionPer: 0
        }
    }

    componentDidMount = async () => {
        console.log('calling - CMD');

        this.props.serviceRequestList({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
        let data = await Axios.axiosHelperFunc('post', 'admin/getUsersList', {})
        console.log('data==', data.data.data)
        if (data.data && data.data.error == false) {
            this.setState({ astrologers: data.data.data, astrolger: data.data.data.length > 0 ? data.data.data[0]._id : '' })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.serviceRequests !== this.props.serviceRequests) {
            let temp = []
            this.props.serviceRequests.map((val, i) => {
                temp.push([
                    `${textCapitalize(val.consumer_id.first_name)}`,
                    val.service_id.name,
                    `₹ ${Number(val.rate).toFixed(2)}`,
                    // moment(val.service_time).calendar(),
                    moment(val.service_time).calendar(null, {
                        sameElse: 'DD/MM/YYYY hh:mm A'
                    }),
                    // val.service_status, 
                    statusArray[this.state.value] == 'New' ? this.getAction(val) : val.astrologer_id ? val.astrologer_id.first_name : ''
                ])
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
            month: Number(this.state.month) + 1,
            year: this.state.year
        }
        let obj = { month: Number(this.state.month), year: this.state.year, value: this.state.value, page: page }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/serviceRequests/lists?${url}`)
        this.props.serviceRequestList(data, this.props.history)
        this.setState({ page })

    };

    getAction = (data) => {
        return <ButtonGroup
            id={data}
            buttonA={this.buttonA}
            buttonB={this.buttonB}
            buttonC={this.buttonC}
            LabelA={'Accept'}
            LabelB='Deny'
            buttonD={this.buttonD}
            LabelD='Details'
        />
    }

    buttonA = (data) => {
        console.log('data===', data)
        let comm = data?.commission ? data.commission : 0;
        this.setState({ openAlert: true, message: 'Accept', service_id: data._id, cost: data.rate, tempCost: data.rate, commission: comm, commissionPer: data.commissionPer })
    }

    buttonB = (data) => {
        this.setState({ openAlert: true, service_id: data._id, message: 'Deny', cost: data.rate })
    }

    buttonC = (id) => {
        let index = this.props.Order.findIndex((val) => val._id == id)
        this.setState({ open: true, service_id: id, message: this.props.Order[index].is_hidden == true ? 'Unhide' : 'Hide' })
    }

    buttonD = (data) => {
        console.log('SelectedData :', data);
        this.setState({ selectedData: data, viewServiceDialog: !this.state.viewServiceDialog })
    }

    handleRequestClose = () => {
        this.setState({ open: false, service_id: '', ishidden: false })
    }

    deleteAstro = async () => {
        if ((this.state.message == 'Accept' && !number(this.state.cost) && !(Number(this.state.cost) < Number(this.state.tempCost))) || this.state.message == 'Deny') {
            let data = await Axios.axiosHelperFunc('post', 'serviceRequest/acceptDenyRequest', { request_id: this.state.service_id, rate: this.state.cost, commission: this.state.commission, service_status: this.state.message == 'Accept' ? 'Approved' : 'Denied', astrologer_id: this.state.message == 'Accept' ? this.state.astrolger : '' })
            if (data.data && data.data.error == false) {
                this.props.addEditAstrolgerSuccess(data.data.title)
                this.props.serviceRequestList({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
                this.handleRequestClose()
            } else if (data.data && data.error == true) {
                this.props.apiFailed(data.data.title)
                // this.props.serviceRequestList({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
            }
        }

    }

    handleChange = (event, value) => {

        this.setState({ value });
        let obj = { month: Number(this.state.month), year: this.state.year, value: Number(value), page: 0 }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/serviceRequests/lists?${url}`)
        this.props.serviceRequestList({ page: 0, status: statusArray[value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

    }

    handleChangeIndex = index => {

        this.setState({ value: index });
        let obj = { month: Number(this.state.month), year: this.state.year, value: Number(index), page: Number(this.state.page) }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/serviceRequests/lists?${url}`)
        this.props.serviceRequestList({ page: Number(this.state.page) + 1, status: statusArray[index], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

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
        let obj = { month: Number(this.state.tempMonth), year: this.state.tempYear, value: Number(this.state.value), page: Number(this.state.page) }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/serviceRequests/lists?${url}`)
        this.props.serviceRequestList({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: this.state.tempMonth, year: this.state.tempYear }, this.props.history)
        this.setState({ month: this.state.tempMonth, year: this.state.tempYear, open: false })
    }

    handleChangeState = (e, key) => {
        this.setState({ [key]: e.target.value })
    }

    handleRequestClose = () => {
        this.setState({ openAlert: false })
    }

    getColumns = () => {
        let data = {
            New: ['Consumer', 'Service', ' Cost', 'Date', 'Actions'],
            Approved: ['Consumer', 'Service', ' Cost', 'Date', 'Atrologers'],
            Scheduled: ['Consumer', 'Service', ' Cost', 'Date', 'Astrologers'],
            Denied: ['Consumer', 'Service', ' Cost', 'Date'],
            Cancelled: ['Consumer', 'Service', ' Cost', 'Date', 'Astrologers'],
            Completed: ['Consumer', 'Service', ' Cost', 'Date', 'Astrologers'],
        }
        return data[statusArray[this.state.value]]
    }

    selectAstro = (e) => {
        this.setState({ astrolger: e.target.value })
    }

    changeCost = (e) => {
        let newCommission = ((Number(this.state.commissionPer) / 100) * Number(e.target.value)).toFixed(2);
        this.setState({ cost: e.target.value, commission: newCommission })
    }

    getDescription = () => {
        return (
            <Row>
                <Col className='col-12'>
                    <FormGroup>
                        <Label>Astrologer</Label>
                        <Input className='form-control form-control-lg' type={'select'} onChange={(e) => this.selectAstro(e)} value={this.state.astrologer}>
                            {
                                this.state.astrologers.map((val, i) => <option key={val._id} value={val._id}>{val.first_name}</option>)
                            }
                        </Input>
                    </FormGroup>

                </Col>
                <Col className='col-12'>
                    <FormGroup>
                        <Label>Cost</Label>
                        <Input invalid={number(this.state.cost) ? true : Number(this.state.cost) < Number(this.state.tempCost) ? true : false} className='form-control form-control-lg' type={'number'} onChange={(e) => this.changeCost(e)} value={this.state.cost} />
                        <FormFeedback>{number(this.state.cost) ? number(this.state.cost) : `Cost should not be less than ${this.state.tempCost}`}</FormFeedback>
                    </FormGroup>

                </Col>
                <Col className='col-12'>
                    <FormGroup>
                        <Label>Commission</Label>
                        <Input disabled={true} className='form-control form-control-lg' type={'number'} value={this.state.commission} />
                        {/* <FormFeedback>{number(this.state.cost) ? number(this.state.cost) : `Cost should not be less than ${this.state.tempCost}`}</FormFeedback> */}
                    </FormGroup>

                </Col>
            </Row>
        )
    }

    render() {

        let { classes, Order } = this.props;
        console.log('Orderas', this.state)

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
            rowsPerPage: this.state.perPage,
            serverSide: true,
            server: true,
            selectableRowsOnClick: false,
            selectableRows: 'none',
            fixedHeader: true,
            search: false,
            onTableChange: (action, tableState) => {
                console.log('action=', action, tableState)
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page);
                        break;

                }
            },
        }

        let columns = this.getColumns()
        let { data, selectedData, viewServiceDialog } = this.state

        console.log('classes===', classes)

        return (
            <div className=" animated slideInUpTiny animation-duration-3">

                <div className="w-100">
                    <AppBar position="static" className={"bg-primary d-none d-md-block " + classes.appBar}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="info"
                            variant="fullWidth"
                            scrollButtons="on"
                        >
                            <Tab className="tab" label="New" />
                            <Tab className="tab" label="Pending" />
                            <Tab className="tab" label="Scheduled" />
                            <Tab className="tab" label="Denied" />
                            <Tab className="tab" label="Cancelled" />
                            <Tab className="tab" label="Completed" />
                        </Tabs>
                    </AppBar>
                    <AppBar position="static" className={"bg-primary  d-md-none " + classes.appBar}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="info"
                            variant="scrollable"
                            scrollButtons="on"
                        >
                            <Tab className="tab" label="New" />
                            <Tab className="tab" label="Pending" />
                            <Tab className="tab" label="Scheduled" />
                            <Tab className="tab" label="Denied" />
                            <Tab className="tab" label="Cancelled" />
                            <Tab className="tab" label="Completed" />
                        </Tabs>
                    </AppBar>
                    {this.props.loading ? <DataLoader /> : <SwipeableViews
                        axis={'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                        <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                        <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                        <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                        <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                        <TabContainer dir={'x'}> {this.dateTable('', data, columns, options)}</TabContainer>
                    </SwipeableViews>}
                </div>

                <DialogAlert open={this.state.openAlert} handleClose={this.handleRequestClose} handleYes={this.deleteAstro} title={`${this.state.message} Service`} description={this.state.message === 'Accept' ? this.getDescription() : `Are you sure you want to ${this.state.message == 'Approve' ? 'approve' : this.state.message == 'Deny' ? 'deny' : 'deny'} this service ?`} />

                <ServiceDetails
                    viewServiceDialog={viewServiceDialog}
                    handleView={this.buttonD}
                    selectedData={selectedData}
                />

            </div>
        );
    }
}

SeviceRequest.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { serviceRequests, loading, total_count } = auth
    return { serviceRequests, loading, total_count }
}
export default connect(mapStateToProps, { serviceRequestList, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(SeviceRequest))