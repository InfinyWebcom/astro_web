import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { listTransactions, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Axios from 'util/axiosRequest'
import ButtonGroup from 'components/buttonGroup';
import MUIDataTable from "components/DataTable";
import AppConfig from 'constants/config'
import MonthYearFilter from 'components/MonthYearFilter';
import moment from 'moment';
import DataLoader from 'components/DataLoader'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { textCapitalize } from 'util/helper'
import axios from 'axios';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from "recharts";
import { increamentData, lineData } from "constants/mdata";

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
const statusArray = ['New', 'Approved', 'Scheduled', 'Denied', 'Cancelled']
class Transactions extends Component {
    constructor(props) {
        super(props);
        let date = new Date()
        let url = props.location.search
        let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''

        this.state = {
            message: '',
            open: false,
            user_id: '',
            ishidden: false,
            data: [],
            page: json.page ? json.page : 0,
            perPage: 50,
            value: 0,
            month: json ? json.month : date.getMonth(),
            year: json ? json.year : date.getFullYear(),
            tempMonth: json ? json.month : date.getMonth(),
            tempYear: json ? json.year : date.getFullYear(),
            type: json ? json.type : '',
            astrologer: json ? json.astrologerId : '',
            searchText: json ? json.searchText : '',
            openAlert: false,
            astrolger: '',
            cost: '',
            openDetail: '',
            anchorEl: '',
            statsData: ''
        }
    }

    componentDidMount = async () => {
        console.log('Cdm=====', AppConfig.months[this.state.month])
        let data = { page: Number(this.state.page) + 1, perPage: this.state.perPage, month: Number(this.state.month) + 1, year: this.state.year, type: this.state.type, astrologerId: this.state.astrologer, searchText: this.state.searchText };
        this.props.listTransactions(data, this.props.history)
        let method = 'POST'
        await axios({
            method,
            url: `${AppConfig.baseUrl}admin/transactionStats`,
            headers: {
                token: localStorage.getItem('token')
            },
            data
        }).then(result => this.setState({ statsData: result?.data?.data }))
            .catch(error => error)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.transactions !== this.props.transactions) {
            console.log('Order233', this.props.transactions)
            let temp = []
            this.props.transactions.map((val, i) => {
                console.log('iiii', i, val)
                temp.push([
                    val && val._id.substr(16, 24),
                    textCapitalize(val.consumer_id?.first_name),
                    val.astrologer_id ? textCapitalize(val.astrologer_id?.first_name) : 'N/A',
                    textCapitalize(val.transaction_type),
                    this.getStatement(val),
                    moment(val.createdAt).format('MMMM Do YYYY, h:mm a'),
                    <><b className='text-success'>₹ {val.client_transaction_amt ? Number(val.client_transaction_amt).toFixed(2) : 0}</b>{val.pay_type == 'refund' && ' (Refund)'}</>,
                    this.getCommission(val)])
            })
            this.setState({ data: temp })
        }
    }

    getCommission = (val) => {
        switch (val.transaction_type) {
            case 'audio':
                // return `${(Number(val.astrologer_id.audio_rate) / Number(val.astrologer_id.client_audio_rate)) * Number(val.client_trasaction_amt)}`
                return `₹ ${(Number(val.client_transaction_amt) - Number(val.transaction_amt)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            case 'report':
                // return `${(Number(val.astrologer_id.report_rate) / Number(val.astrologer_id.client_report_rate)) * Number(val.client_trasaction_amt)}`
                return `₹ ${(Number(val.client_transaction_amt) - Number(val.transaction_amt)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            case 'chat':
                // return `${(Number(val.astrologer_id.chat_rate) / Number(val.astrologer_id.client_chat_rate)) * Number(val.client_trasaction_amt)}`
                return `₹ ${(Number(val.client_transaction_amt) - Number(val.transaction_amt)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            case 'video':
                // return `${(Number(val.astrologer_id.video_rate) / Number(val.astrologer_id.client_video_rate)) * Number(val.client_trasaction_amt)}`
                return `₹ ${(Number(val.client_transaction_amt) - Number(val.transaction_amt)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            case 'product':
                return `${val.pay_type == 'refund' ? '₹ 0.00' : '₹ ' + `${Number(val.transaction_amt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}`
            case 'wallet':
                return `N/A`
            case 'settlement':
                return `N/A`
            case 'service':
                // return `${val?.service_req_id?.service_id?.name} ${val?.astrologer_id?.first_name ? `by ${val?.astrologer_id?.first_name}` : ''}`
                return `₹ ${(Number(val.client_transaction_amt) - Number(val.transaction_amt)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            case 'tip':
                // return `sending Guru Dakshina to ${val?.astrologer_id?.first_name}`
                return `N/A`
        }
    }

    showPopover = (val, e) => {
        console.log('anchorEl', e.currentTarget)
        this.setState({ openDetail: val, anchorEl: e.currentTarget })
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
        let obj = { month: Number(this.state.month), year: this.state.year, page: page }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/financials/transactions/lists?${url}`)
        this.props.listTransactions(data, this.props.history)
        this.setState({ page })

    };

    getAction = (data) => {
        return <ButtonGroup id={data} id2='test' buttonA={this.buttonA} buttonB={this.buttonB} buttonC={this.buttonC} LabelA={'Details'} LabelB={''} />
    }
    buttonA = (data) => {
        console.log('data===', data)
        this.props.history.push(`/admin/financials/Transactions/details/${data.astrologer_id._id}`)
    }

    handleRequestClose = () => {
        this.setState({ open: false, user_id: '', ishidden: false })
    }

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.listTransactions({ page: Number(this.state.page) + 1, status: statusArray[value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

    };
    getColor = (data) => {
        switch (data) {
            case 'Debit Card':
                return 'primary';
            case 'Uploaded':
                return 'warning'
            case 'Approved':
                return 'success'
            case 'Rejected':
                return 'danger'
            default:
                return 'primary'
        }
    }
    getStatus = (data, props) => {
        const statusData = data ? data.report_status : 'Debit Card';
        console.log('statusData', statusData)
        return <>

            <span className={`badge jr-hover mb-0 text-white badge-${this.getColor(statusData)}`}>
                {statusData}
            </span>

        </>
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
        this.props.listTransactions({ page: Number(this.state.page) + 1, status: statusArray[index], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
    };
    dateTable = (title, data, columns, options) => {
        return <MUIDataTable
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
        let obj = { month: Number(this.state.tempMonth), year: this.state.tempYear, page: Number(this.state.page) }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace(`/admin/financials/transactions/lists?${url}`)
        this.props.listTransactions({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: this.state.tempMonth, year: this.state.tempYear }, this.props.history)
        this.setState({ month: this.state.tempMonth, year: this.state.tempYear, open: false })
    }
    handleChangeState = (e, key) => {
        this.setState({ [key]: e.target.value })
    }
    handleRequestClose = () => {
        this.setState({ openAlert: false })
    }

    getStatement = (val) => {
        console.log('val===', val)
        let data = []
        val.transaction_type === 'product' && val.products.map((value) => {
            data.push(value.product_id.name)
        })
        switch (val.transaction_type) {
            case 'audio':
                return `${moment.utc(val.call_id.astrologer_duration * 1000).format('HH:mm:ss')}`
            case 'report':
                return `Report request from  ${val.consumer_id ? `${val.consumer_id.first_name} (${val.consumer_id.unique_name})` : 'N/A'} `
            case 'chat':
                return `${moment.utc(val.chat_id.chat_duration * 1000).format('HH:mm:ss')}`
            case 'video':
                return `${val?.call_id?.astrologer_duration ? moment.utc(val.call_id.astrologer_duration * 1000).format('HH:mm:ss') : ''}`
            case 'product':
                return `${data.length} ${data.length == 1 ? 'product' : 'products'} - ${data.join(', ')} `
            case 'wallet':
                return `Wallet transaction`
            case 'settlement':
                return 'Settlement transaction'
            case 'service':
                // return `${val?.service_req_id?.service_id.name} by ${val?.astrologer_id?.first_name}`
                return `${val?.service_req_id?.service_id?.name} ${val?.astrologer_id?.first_name ? `by ${val?.astrologer_id?.first_name}` : ''}`
            case 'tip':
                return `sending Guru Dakshina to ${val?.astrologer_id?.first_name}`

        }
    }

    handleClosePopover = () => {
        this.setState({ openDetail: '', anchorEl: '' })
    }
    render() {
        let { classes, Order } = this.props;
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
            count: this.props.total_count,
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
        let columns = ['Transaction ID', 'Customer Name', 'Astrologer Name', 'Type of service', 'Minutes Consumed', 'Date', 'Total Amount', 'Total Commission earned']
        let { data, openDetail, anchorEl, statsData } = this.state
        console.log('classes', statsData)
        // ,'','Details', 'Amount'
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="jr-card jr-card-full">
                            <div className={`jr-fillchart bg-primary jr-overlay-fillchart`}>
                                <div className="card-title mb-3">
                                    <h5 style={{ color: 'white', marginBottom: '0px' }}>Total Transactions</h5>
                                </div>
                                <ResponsiveContainer width="100%" height={75}>
                                    <AreaChart data={increamentData}
                                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                        <Area dataKey='pv' strokeWidth={0} stackId="2" stroke='#2e1487' fill='#2e1487'
                                            fillOpacity={1} />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="jr-fillchart-content">
                                    <div className="card-title mb-4">
                                        <h5 style={{ color: 'white', marginBottom: '0px' }}>Number of Transactions</h5>
                                    </div>
                                    <h2 className="mb-2 jr-fs-xl jr-font-weight-medium">{(statsData && statsData.count) ? (statsData.count).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : 0}</h2>
                                    <p className="mb-0 jr-fs-sm">
                                        <span
                                            className={`jr-font-weight-medium jr-fs-md jr-chart-up`}>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="jr-card jr-card-full">
                            <div className={`jr-fillchart bg-pink jr-overlay-fillchart`}>
                                <div className="card-title mb-3">
                                    <h5 style={{ color: 'white', marginBottom: '0px' }}>Total Amount</h5>
                                </div>
                                <ResponsiveContainer width="100%" height={75}>
                                    <AreaChart data={lineData}
                                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                        <Area dataKey='pv' strokeWidth={0} stackId="2" stroke='#ae1c4e' fill='#ae1c4e'
                                            fillOpacity={1} />
                                    </AreaChart>
                                </ResponsiveContainer>
                                <div className="jr-fillchart-content">
                                    <div className="card-title mb-4">
                                        <h5 style={{ color: 'white', marginBottom: '0px' }}>Total Amount</h5>
                                    </div>
                                    <h2 className="mb-2 jr-fs-xl jr-font-weight-medium">₹ {(statsData && statsData.total) ? (statsData.total).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 0}</h2>
                                    <p className="mb-0 jr-fs-sm">
                                        <span
                                            className={`jr-font-weight-medium jr-fs-md jr-chart-up`}>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.loading ? <DataLoader /> : this.dateTable('', data, columns, options)}

                <Popover
                    id={openDetail ? openDetail._id : ''}
                    open={openDetail ? true : false}
                    anchorEl={anchorEl}
                    onClose={this.handleClosePopover}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={'p-3'}>{this.getStatement(openDetail)}</Typography>
                </Popover>
            </div>
        );
    }
}

Transactions.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { transactions, loading, total_count } = auth
    return { transactions, loading, total_count }
}
export default connect(mapStateToProps, { listTransactions, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Transactions))