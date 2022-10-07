import React, { Component } from 'react';
import MUIDatatable from 'components/DataTable'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import { Col, Row } from 'reactstrap'
import { connect } from 'react-redux';
import moment from 'moment'
import { withStyles } from "@material-ui/core/styles";
import ButtonGroup from 'components/buttonGroup';
import { astroSettlements, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Axios from 'util/axiosRequest';
import DialogAlert from 'components/Dialog'
import Checkbox from '@material-ui/core/Checkbox';
import DataLoader from 'components/DataLoader'
import Slide from '@material-ui/core/Slide';
import ExpansionPanel from 'components/ExpansionPanel'
import './index.css'
const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 700,
        MuiTableCellRoot: {
            fontSize: '1.02rem'
        }
    },
    MuiTableRowRoot: {
        fontSize: '1.02rem !important'
    },
    row: {

        backgroundColor: 'rgba(0, 0, 0, 0.04)'

    },
    appBar: {
        backgroundColor: '#fff',
        borderBottom: "2px solid"
    },
    MuiPaperRounded: {
        borderRadius: 0
    },

});
class Settlemets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 0,
            perPage: 20,
            transId: [],
            amount: 0,
            open: false,
            loading: false
        }
    }

    componentDidMount = async () => {
        this.props.astroSettlements({ page: Number(this.state.page) + 1, astrologer_id: this.props.Id, month: (this.props.month) + 1, year: this.props.year }, this.props.history)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if ((prevProps.astroSettlementsList !== this.props.astroSettlementsList)) {
            let temp = []
            this.props.astroSettlementsList.map((val, i) => {
                temp.push([`${val.is_settle == 0 ? 'Open Transactions' : `₹ ${val.data.transaction_amt} settled on ${moment(val.data.payment_date).format('DD/MM/YYYY')} `}`, '', '', '', '', val.is_settle == 0 ? this.getAction(val) : ' ', { data: val.trans }])
            })
            this.setState({ data: temp })
        }
    }

    getAction = (data) => {
        return <Button disabled={this.state.transId.length == 0} onClick={() => this.buttonA()} variant="outlined" color="primary">
            Settle
        </Button>
    }

    buttonA = () => {
        this.setState({ open: true })
    }

    changePage = (page) => {
        let pages = page + 1

        this.props.handlePage(page)
        this.props.astroSettlements({ page: Number(this.state.page) + 1, astrologer_id: this.props.Id, month: this.props.month, year: this.props.year }, this.props.history)


    };

    handleChange = (data) => {
        let temp = [...this.state.transId]
        let tempAmount = this.state.amount
        let index = temp.findIndex(val => val == data._id)
        if (index > -1) {
            temp.splice(index, 1)
            tempAmount = tempAmount - data.transaction_amt
        } else {
            tempAmount = tempAmount + data.transaction_amt
            temp.push(data._id)
        }
        this.setState({ transId: temp, amount: tempAmount })
    }

    getTimeData = (val) => {
        let data = val.call_id ? val.call_id.astrologer_duration : val.chat_id ? val.chat_id.chat_duration : val.video_id ? val.video_id.astrologer_duration : 0
        let time = moment.duration(data, 'seconds')
        return `(${time.hours() > 0 ? time.hours() + ' hours' : ''} ${time.minutes() > 0 ? time.minutes() + ' minutes' : ''} ${time.seconds() + ' seconds'})`
    }

    renderExpandableRow = (rowData, isCheckBox) => {
        let { classes } = this.props
        const { data } = this.state
        let { transId } = this.state

        return rowData.map((val, i) => {
            return < >
                <Col sm={9} xs={9} md={10} lg={10} xl={10} className='d-flex align-items-center'>
                    <p>{isCheckBox ? <Checkbox
                        checked={transId.findIndex(value => value == val._id) > -1 ? true : false}
                        onChange={() => this.handleChange(val)}
                        color='primary'
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> : ''}<b className='text-capitalize'>{val.transaction_type !== 'service' ? val.transaction_type : val.service_req_id.service_id.name}</b> <b>{val.transaction_type == 'audio' || val.transaction_type == 'video' ? 'call' : ''}</b>{val.transaction_type == 'tip' ? ' from ' : (val.transaction_type == 'report' || val.transaction_type == 'service') ?  ' for ' : ' with '}<b className='text-capitalize'>{val.consumer_id.first_name}</b> <b>{`${moment(val.createdAt).calendar()}  `}</b>{(val.transaction_type !== 'report' && val.transaction_type !== 'service' && val.transaction_type !== 'tip') ? (this.getTimeData(val)) : ''}</p>
                </Col>
                <Col sm={3} xs={3} md={2} lg={2} xl={2} className='d-flex justify-content-end align-items-center' >
                    <p className='text-success'><b className>₹{(parseFloat(val.transaction_amt)).toFixed(2)}</b></p>
                </Col>
            </>
            return <TableRow key={i}  >
                <TableCell colSpan={5} align="left" >{< > {isCheckBox ? <Checkbox
                    checked={transId.findIndex(value => value == val._id) > -1 ? true : false}
                    onChange={() => this.handleChange(val)}
                    color='primary'
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /> : ''}<b className='text-capitalize'>{val.transaction_type}</b> <b>{val.transaction_type == 'audio' || val.transaction_type == 'video' ? 'call' : ''}</b>{val.transaction_type == 'report' ? ' for ' : ' with '}<b className='text-capitalize'>{val.consumer_id.first_name}</b> on <b>{`${moment(val.createdAt).calendar()}  `}</b>{val.transaction_type !== 'report' ? (this.getTimeData(val)) : ''}</>}</TableCell>
                <TableCell align="center" className='text-success'></TableCell>
                <TableCell align="right" className='text-success'><b>₹{(parseFloat(val.transaction_amt)).toFixed(2)}</b></TableCell>

            </TableRow>

        })

    }
    
    handleRequestClose = () => {
        this.setState({ open: false })
    }

    settleAmount = async () => {
        this.setState({ loading: true, open: false })
        let data = await Axios.axiosHelperFunc('post', 'settlement/createSettlement', { astrologer_id: this.props.Id, transaction_ids: this.state.transId, transaction_amt: this.state.amount })
        if (data.data && data.data.error == false) {
            this.setState({ transId: [], amount: 0, open: false })
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.componentDidMount()
        } else {
            this.props.apiFailed(data.data.title)
        }
        this.setState({ loading: false })
    }

    render() {
        let data = []
        let data2 = []
        this.props.astroSettlementsList.map((val, i) => {
            data2.push({
                name: `${val.is_settle == 0 ? 'Open Transactions' : `₹ ${val.data.transaction_amt} settled on ${moment(val.data.payment_date).format('DD/MM/YYYY')}`}`,
                button: val.is_settle == 0 ? this.getAction(val) : '', subData: this.renderExpandableRow(val.trans, val.is_settle == 0 ? true : false)
            })
            data.push([`${val.is_settle == 0 ? 'Open Transactions' : `₹ ${val.data.transaction_amt} settled on ${moment(val.data.payment_date).format('DD/MM/YYYY')}`}`, '', '', '', '', val.is_settle == 0 ? this.getAction(val) : ' ', { data: val.trans }])
        })
        console.log('Order data', this.state.data)
        console.log('val', this.props.astroSettlementsList)
        const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            viewColumns: false,
            selectableRows: false,
            // resizableColumns:true,
            page: this.props.page,
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
            expandableRows: true,
            fixedHeader: true,
            rowsExpanded: [0],
            viewColumns: false,
            search: false,
            rowsPerPage: this.state.perPage,
            renderExpandableRow: (rowData, rowMeta) => {
                console.log('rowData, rowMeta', rowData, rowMeta)
                return this.renderExpandableRow(rowData, rowMeta)
            },
            onTableChange: (action, tableState) => {
                console.log('action=', action, tableState)
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page);
                        break;

                }
            },
        }
        let columns = [' ', ' ', ' ', '', '', '']
        console.log('amount===', this.state.amount)
        let { classes } = this.props
        console.log('classess', classes.td)
        return (
            <div className='settleDetails'>
                {this.props.loading || this.state.loading ? <DataLoader /> : <ExpansionPanel data={data2} />}

                <DialogAlert open={this.state.open} handleClose={this.handleRequestClose} handleYes={this.settleAmount} title={`Settlement`} description={`Are you sure you want to settle for ₹ ${Number(this.state.amount).toFixed(2)} ${this.state.transId.length > 1 ? 'for ' + this.state.transId.length + ' transactions ' : ''} ?`} />
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { astroSettlementsList, loading, total_count } = auth;
    return { astroSettlementsList, loading, total_count }
}

export default connect(mapStateToProps, { astroSettlements, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Settlemets))