import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { getRefferedUsers, apiFailed, addEditAstrolgerSuccess, getUser } from 'actions/auth'
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
import DialogAlert from 'components/Dialog'
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
class Ticketing extends Component {
    constructor(props) {
        super(props);
        let date = new Date()
        this.state = {
            message: '',
            open: false,
            user_id: '',
            ishidden: false,
            data: [],
            page: 0,
            perPage: 20,
            value: 0,
            month: date.getMonth(),
            year: date.getFullYear(),
            tempMonth: date.getMonth(),
            tempYear: date.getFullYear(),
            openAlert: false,
            astrologers: [],
            astrolger: '',
            cost: '',
            openDetail: '',
            anchorEl: ''
        }
    }
    componentDidMount = async () => {
        this.props.getUser({ user_id: this.props.match.params.id }, this.props.history)
        this.props.getRefferedUsers({ referror_id: this.props.match.params.id, page: Number(this.state.page) + 1, perPage: this.state.perPage }, this.props.history)

    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.refferedUsser !== this.props.refferedUsser) {
            let temp = []
            this.props.refferedUsser.data.map((val, i) => {
                temp.push([`${textCapitalize(val.used_by_id.first_name)}`, val.used_by_id ? val.used_by_id.email : 'N/A', ` ${val.used_by_id ? val.used_by_id.mobile : 'N/A'}`, val.used_by_id ? textCapitalize(val.used_by_id.user_type) : 'N/A', moment(val.used_by_id ? val.used_by_id.createdAt : '').format('YYYY-MM-DD'), val.first_transaction.client_transaction_amt ? <span id={val._id} key={i} onClick={(e) => this.showPopover(e, val)} className="jr-nonhover">{`₹ ${val.first_transaction.client_transaction_amt}`} <i className='zmdi zmdi-info text-success'></i></span> : 'N/A'])
            })
            this.setState({ data: temp })
        }
    }
    showPopover = (e, val) => {
        this.setState({ openDetail: val, message: 'Description', anchorEl: e.currentTarget })
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
        this.props.getRefferedUsers(data, this.props.history)
        this.setState({ page })

    };
    getStatus = (data) => {
        const statusData = data.support_status;
        return <>
            <span id={`simple-${data._id}`} className={`badge jr-hover mb-0 text-white text-capitalize badge-${statusData == 'Resolved' ? 'success' : 'danger'}`}>
                {statusData}
            </span>

        </>
    };
    getAction = (data) => {
        return <ButtonGroup id={data} id2='test' buttonA={() => this.buttonA(data)} buttonB={this.buttonB} buttonC={this.buttonC} LabelA={'Details'} LabelB={data.support_status !== 'Resolved' ? 'Resolve' : ''} />
    }
    buttonB = (data) => {
        this.setState({ openDetail: data, message: 'Resolve Ticket' })
    }
    buttonA = (data) => {
        this.props.history.push(`/admin/referrals/${data._id}`)
    }

    handleRequestClose = () => {
        this.setState({ open: false, user_id: '', ishidden: false })
    }

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.getRefferedUsers({ referror_id: this.props.match.params.id, page: Number(this.state.page) + 1, status: statusArray[value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

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

    handleChangeIndex = index => {
        this.setState({ value: index });
        this.props.getRefferedUsers({ referror_id: this.props.match.params.id, page: Number(this.state.page) + 1, status: statusArray[index], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
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
        this.props.getRefferedUsers({ referror_id: this.props.match.params.id, page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: this.state.tempMonth, year: this.state.tempYear }, this.props.history)
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
        val.transaction_type === 'product' && val.product_order_id && this.state.openDetail.products.map((value) => {
            data.push(value.product_id.name)
        })
        switch (val.transaction_type) {
            case 'audio':
                return `Made transaction for Audio Call  for ${moment.utc(val.call_id.astrologer_duration * 1000).format('HH:mm:ss')}`
            case 'report':
                return `Made transaction for Report request  `
            case 'chat':
                return `Made transaction for Chat session  for ${moment.utc(val.chat_id.chat_duration * 1000).format('HH:mm:ss')}`
            case 'video':
                return `Made transaction for Video Call   for ${moment.utc(val.call_id.astrologer_duration * 1000).format('HH:mm:ss')}`
            case 'product':
                return `${data.length} ${data.length > 1 ? 'products' : 'product'} - ${data.join(', ')} purchased`
            default:
                return ` Made transaction for ${val.service_req_id ? val.service_req_id.service_id.name : ''} `
        }
    }
    resolveTicket = async () => {
        this.setState({ message: '', loading: true })
        let data = await Axios.axiosHelperFunc('post', 'admin/resolveTicket', { ticket_id: this.state.openDetail._id })
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.componentDidMount()

        } else {
            this.props.apiFailed(data.data.title)
        }
        this.setState({ loading: false })
    }

    handleClosePopover = () => {
        this.setState({ openDetail: '', anchorEl: '', message: '' })
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
            count: this.props.refferedUsser ? this.props.refferedUsser.total_count : 0,
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
        let columns = ['User', 'Email', 'Phone', 'User Type', 'Date', 'First Transaction']
        let { data, openDetail, anchorEl, message } = this.state
        console.log('openDetail===', openDetail)
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">
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
                    <Typography className={'p-3'}>{this.getStatement(openDetail ? openDetail.first_transaction : '')}</Typography>
                </Popover>


            </div>
        );
    }
}

Ticketing.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { refferedUsser, loading, total_count } = auth
    return { refferedUsser, loading, total_count }
}
export default connect(mapStateToProps, { getRefferedUsers, addEditAstrolgerSuccess, apiFailed, getUser })(withStyles(styles)(Ticketing))