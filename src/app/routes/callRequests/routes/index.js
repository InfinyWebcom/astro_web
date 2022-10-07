import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { getCallRequests, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Axios from 'util/axiosRequest'
import ButtonGroup from 'components/buttonGroup';
import MUIDataTable from "components/DataTable";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import moment from 'moment-timezone';
import DataLoader from 'components/DataLoader'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { textCapitalize } from 'util/helper'
import DialogAlert from 'components/Dialog'
import ScheduleCall from 'components/ScheduleCall';
import CompleteCall from 'components/CompleteCall'
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
    typography: {
        padding: theme.spacing(2),
    },
    appBar: {
        backgroundColor: '#fff',
        borderBottom: "2px solid"
    },
    MuiPaperRounded: {
        borderRadius: 0
    }
});
const statusArray = ['Requested', 'Scheduled', 'Completed', 'Settled']
class Ticketing extends Component {
    constructor(props) {
        super(props);
        let url = props.location.search
        let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''

        let date = new Date()
        this.state = {
            message: '',
            open: false,
            user_id: '',
            ishidden: false,
            data: [],
            page: json.page ? Number(json.page) : 0,
            perPage: 20,
            value: json.value ? Number(json.value) : 0,
            month: date.getMonth(),
            year: date.getFullYear(),
            tempMonth: date.getMonth(),
            tempYear: date.getFullYear(),
            openAlert: false,
            astrologers: [],
            astrolger: '',
            cost: '',
            openDetail: '',
            anchorEl: '',
            zone: moment.tz.guess(true)
        }
    }
    componentDidMount = async () => {
        this.props.getCallRequests({ page: Number(this.state.page) + 1, perPage: this.state.perPage, request_status: statusArray[this.state.value] }, this.props.history)
        let data = await Axios.axiosHelperFunc('post', 'admin/getUsersList', {})
        if (data.data && data.data.error == false) {
            this.setState({ astrologers: data.data.data, astrolger: data.data.data.length > 0 ? data.data.data[0]._id : '' })
        }

    }
    componentDidUpdate = (prevProps, prevState) => {
        let zone = moment.tz.guess(true);
        if (prevProps.callRequests !== this.props.callRequests) {
            let temp = []
            let tab = this.state.value
            if (tab == 0) {
                this.props.callRequests.map((val, i) => {
                    temp.push([`${textCapitalize(val.name)}`, val.email, ` ${val.mobile}`, moment(val.preferred_time).format('MMMM Do YYYY, h:mm a'), this.getAction(val)])
                })
            } else if (tab == 1) {
                this.props.callRequests.map((val, i) => {
                    temp.push([`${textCapitalize(val.name)}`, val.email, ` ${val.mobile}`, moment(val.call_time).format('MMMM Do YYYY, h:mm a'), val.astrologer_id ? textCapitalize(val.astrologer_id.first_name) : 'N/A', this.getAction(val)])
                })
            } else if (tab == 2) {
                this.props.callRequests.map((val, i) => {
                    temp.push([`${textCapitalize(val.name)}`, val.email, ` ${val.mobile}`, moment(val.call_time).format('MMMM Do YYYY, h:mm a'), val.astrologer_id ? textCapitalize(val.astrologer_id.first_name) : 'N/A', `${val.call_duration} minutes`, `₹ ${Number(val.call_rate).toFixed(2)}`, this.getAction(val)])
                })
            } else if (tab == 3) {
                this.props.callRequests.map((val, i) => {
                    temp.push([`${textCapitalize(val.name)}`, val.email, ` ${val.mobile}`, moment(val.call_time).format('MMMM Do YYYY, h:mm a'), val.astrologer_id ? textCapitalize(val.astrologer_id.first_name) : 'N/A', `${val.call_duration} minutes`, `₹ ${Number(val.call_rate).toFixed(2)}`, this.getAction(val)])
                })
            }

            this.setState({ data: temp })
        }
    }
    showPopover = (val) => {
        this.setState({ openDetail: val, message: val.refer_code_blocked == true ? 'Unblock' : 'Block' })
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
        let obj = { value: this.state.value, page: page }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/call_requests/lists?${url}`)
        this.props.getCallRequests(data, this.props.history)
        this.setState({ page })

    };
    getColor = (data) => {
        switch (data) {
            case 'Requested':
                return 'primary';
            case 'Scheduled':
                return 'warning'
            case 'Completed':
                return 'success'
            case 'Rejected':
                return 'danger'
            case 'Settled':
                return 'success'

        }
    }
    getStatus = (data) => {
        const statusData = data.request_status;
        return <>
            <span id={`simple-${data._id}`} className={`badge jr-hover mb-0 text-white text-capitalize badge-${this.getColor(statusData)}`}>
                {statusData}
            </span>

        </>
    };
    getAction = (val) => {
        return val.request_status !== 'Settled' ? <ButtonGroup key={val._id} id={val} LabelE='' buttonE={this.buttonE} buttonA={this.buttonA} buttonB={this.buttonB} buttonC={this.buttonC} LabelA={val.request_status == 'Requested' ? 'Accept' : ''} LabelB={val.request_status == 'Requested' ? 'Reject' : ''} LabelC={val.request_status == 'Scheduled' ? 'Complete' : ''} LabelD={val.request_status == 'Completed' ? 'Settle' : ''} buttonD={this.buttonD} /> : 'N/A'
    }
    handleSwitch1 = (data) => {
        this.setState({ openDetail: data, message: data.refer_code_blocked == true ? 'Unblock' : 'Block' })
    }
    buttonA = (data) => {
        this.setState({ message: 'Schedule', openDetail: data, open: true })
    }
    buttonE = () => {

    }
    buttonB = (data) => {
        this.setState({ message: 'Reject', openDetail: data, open: true })
    }
    buttonC = (data) => {
        this.setState({ message: 'Complete', openDetail: data, open: true })
    }
    buttonD = (data) => {
        this.setState({ message: 'Settle', openDetail: data, open: true })
    }

    handleChange = (event, value) => {
        this.setState({ value });
        let obj = { value: Number(value), page: Number(this.state.page) }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/call_requests/lists?${url}`)
        this.props.getCallRequests({ page: Number(this.state.page) + 1, request_status: statusArray[value] }, this.props.history)

    };

    handleChangeIndex = index => {
        this.setState({ value: index });
        let obj = { value: Number(index), page: Number(this.state.page) }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/call_requests/lists?${url}`)
        this.props.getCallRequests({ page: Number(this.state.page) + 1, request_status: statusArray[index] }, this.props.history)
    };
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
    handleChangeState = (e, key) => {
        this.setState({ [key]: e.target.value })
    }
    handleRequestClose = () => {
        this.setState({ openAlert: false })
    }
    getUrl = (data, data1) => {
        switch (data) {
            case "Reject":
                return { url: 'callRequest/denyCallRequest', request_id: this.state.openDetail._id }
            case "Schedule":
                return { url: 'callRequest/scheduleCallRequest', request_id: this.state.openDetail._id, call_time: moment(data1.call_time).format(), astrologer_id: data1.astrologer_id }
            case "Complete":
                return { url: "callRequest/completeCallRequest", request_id: this.state.openDetail._id, call_rate: data1.call_rate, call_duration: data1.call_duration, request_status: 'Completed' }
            case "Settle":
                return { url: "callRequest/completeCallRequest", request_id: this.state.openDetail._id, request_status: 'Settled' }
        }
    }

    changeStatus = async (data1) => {
        this.setState({ open: false, loading: true })
        let data = await Axios.axiosHelperFunc('post', this.getUrl(this.state.message, data1).url, this.getUrl(this.state.message, data1))
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.componentDidMount()

        } else {
            this.props.apiFailed(data.data.title)
        }
        this.setState({ loading: false })
    }

    handleClosePopover = () => {
        this.setState({ openDetail: '', anchorEl: '', message: '', open: false })
    }
    getColumns = () => {
        let data = {
            Requested: ['Name ', 'Email ', ' Phone', 'Date', 'Actions'],
            Scheduled: ['Name ', 'Email ', ' Phone', 'Date', 'Astologers', 'Actions'],
            Completed: ['Name ', 'Email ', ' Phone', 'Date', 'Astologers', 'Duration', 'Cost', 'Actions'],
            Settled: ['Name ', 'Email ', ' Phone', 'Date', 'Astologers', 'Duration', 'Cost',],
        }
        return data[statusArray[this.state.value]]
    }
    render() {
        let { classes, Order } = this.props;
        console.log('Order', this.state.astrologers)
        const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            viewColumns: false,
            selectableRows: false,
            // resizableColumns:true,
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
            count: this.props.total_count,
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
        let { data, astrologers, open, message, loading } = this.state
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
                            <Tab className="tab" label="Requested" />
                            <Tab className="tab" label="Scheduled" />
                            <Tab className="tab" label="Completed" />
                            <Tab className="tab" label="Settled" />

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
                            <Tab className="tab" label="Requested" />
                            <Tab className="tab" label="Scheduled" />
                            <Tab className="tab" label="Completed" />
                            <Tab className="tab" label="Settled" />

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
                    </SwipeableViews>}
                </div>

                {message !== 'Schedule' && message !== 'Complete' && <DialogAlert handleYes={this.changeStatus} open={open} close='close' handleClose={this.handleClosePopover} title={`${this.state.message} this call request`}
                    description={message == 'Reject' ? 'Are you sure you want to reject this call request?' : 'Are you sure you want to settle this call request?'} />}
                {message == 'Schedule' && <ScheduleCall open={open} astrologers={astrologers} date={this.state.openDetail.preferred_time} handleClose={this.handleClosePopover} handleYes={this.changeStatus} />}
                {message == 'Complete' && <CompleteCall open={open} handleClose={this.handleClosePopover} handleYes={this.changeStatus} />}

            </div>
        );
    }
}

Ticketing.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { callRequests, loading, total_count } = auth
    return { callRequests, loading, total_count }
}
export default connect(mapStateToProps, { getCallRequests, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Ticketing))