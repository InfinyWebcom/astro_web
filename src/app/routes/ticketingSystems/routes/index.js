import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { getTicketing, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
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
        console.log('Cdm=====', AppConfig.months[this.state.month])
        this.props.getTicketing({ page: Number(this.state.page) + 1, perPage: this.state.perPage }, this.props.history)

    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.ticketingList !== this.props.ticketingList) {
            let temp = []
            this.props.ticketingList.map((val, i) => {
                temp.push([`${val.from_id ? textCapitalize(val.from_id.first_name) : "User"}`, val.from_id ? val.from_id.email : 'N/A', ` ${val.from_id ? val.from_id.mobile : 'N/A'}`, val.support_id, val.category, this.getStatus(val),
                <span id={val._id} key={i} className="jr-nonhover">{moment(val.createdAt).calendar()} </span>, this.getAction(val)])
            })
            this.setState({ data: temp })
        }
    }
    showPopover = (val) => {
        this.setState({ openDetail: val, message: 'Description' })
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
        this.props.getTicketing(data, this.props.history)
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
        return <ButtonGroup id={data} id2='test' buttonA={() => this.showPopover(data)} buttonB={this.buttonB} buttonC={this.buttonC} LabelA={'Details'} LabelB={data.support_status !== 'Resolved' ? 'Resolve' : ''} />
    }
    buttonB = (data) => {
        this.setState({ openDetail: data, message: 'Resolve Ticket' })
    }
    buttonA = (data) => {
        console.log('data===', data)
    }

    handleRequestClose = () => {
        this.setState({ open: false, user_id: '', ishidden: false })
    }

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.getTicketing({ page: Number(this.state.page) + 1, status: statusArray[value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

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
        this.props.getTicketing({ page: Number(this.state.page) + 1, status: statusArray[index], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
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
        this.props.getTicketing({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: this.state.tempMonth, year: this.state.tempYear }, this.props.history)
        this.setState({ month: this.state.tempMonth, year: this.state.tempYear, open: false })
    }
    handleChangeState = (e, key) => {
        this.setState({ [key]: e.target.value })
    }
    handleRequestClose = () => {
        this.setState({ openAlert: false })
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
        let columns = ['Consumer', 'Email', 'Phone', 'Ticket Id', 'Category', 'Status', 'Date', 'Actions']
        let { data, openDetail, anchorEl, message } = this.state
        console.log('classes===', classes)
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">
                {this.props.loading ? <DataLoader /> : this.dateTable('', data, columns, options)}
                <DialogAlert handleYes={message == 'Description' ? '' : this.resolveTicket} open={message ? true : false} close='close' handleClose={this.handleClosePopover} title={this.state.message}
                    description={message == 'Description' ? openDetail ? openDetail.description : 'N/A' : 'Are you sure you want to resolve this ticket?'} />



            </div>
        );
    }
}

Ticketing.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { ticketingList, loading, total_count } = auth
    return { ticketingList, loading, total_count }
}
export default connect(mapStateToProps, { getTicketing, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Ticketing))