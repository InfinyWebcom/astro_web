import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getNewReport, addEditAstrolgerSuccess, apiFailed } from 'actions/auth'
import DataTable from 'components/Table'
import moment from 'moment'
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Axios from 'util/axiosRequest';
import DialogAlert from 'components/Dialog'
import ListData from 'components/DailyFeed'
import AppConfig from 'constants/config'
import { textCapitalize } from 'util/helper'
class NewOrderRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            perPage: 5
        }
    }
    componentDidMount() {
        this.props.getNewReport({ newReport: true }, this.props.history)
    }
    newTab = (data) => {
        let url = data.report_url.includes('.pdf') ? data.report_url : `${data.report_url}.jpg`
        window.open(`${AppConfig.imageUrl}${url}`, '_blank');

    }
    getAction = (data) => {
        return <span type='button' key={data._id} onClick={(e) => this.setState({ selectedData: data, open: e.currentTarget })}><i className='zmdi zmdi-more-vert zmdi-hc-2x'></i></span>
    }
    getStatus = (data,) => {
        const statusData = data.report_status;
        return <>
            <div className='d-flex align-items-center'>

                {statusData != 'Ordered' && <div id={`simple-${data._id}`} type='button' onClick={() => this.newTab(data)} className={`badge jr-hover mb-0 text-white text-uppercase ml-2 badge-info `}>
                    View
                    </div>}
                <div className='align-self-center'>

                    <div id={`simple-${data._id}`} className={`badge jr-hover mb-0 text-white text-uppercase badge-${this.getColor(statusData)} `}>
                        {statusData}
                    </div>
                </div>

                {statusData == 'Uploaded' && <div className='ml-2'>
                    <span className='mb-0 mt-1' type='button' key={data._id} onClick={(e) => this.setState({ selectedData: data, open: e.currentTarget })}><i className='mb-0 zmdi zmdi-more-vert zmdi-hc-2x'></i></span>
                </div>}
            </div>


        </>
    }
    getColor = (data) => {
        switch (data) {
            case 'Ordered':
                return 'danger';
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
    handleSelect = (value) => {
        this.setState({ open: false, openAlert: true, message: value })
    }
    acceptReject = async () => {
        this.setState({ openAlert: false })
        let data = await Axios.axiosHelperFunc('post', 'admin/changeReportStatus', { report_id: this.state.selectedData._id, report_status: this.state.message == 'Accept' ? 'Approved' : 'Rejected' })
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)

            this.componentDidMount()
        } else {
            this.props.apiFailed(data.data.title)
        }
    }
    handleRequestClose = () => {
        this.setState({ openAlert: false })
    }
    handleClose = () => {
        this.setState({ open: '', selectedData: '' })
    }
    render() {
        let columns = ['Consumer Name', 'Astrolger Name', 'Date', 'Status']
        let data = []
        let data2 = []
        let { newReports } = this.props
        newReports.map((val, i) => {
            console.log('val============ test', val, i)
            data2.push({ desc: `${textCapitalize(val.consumer_id.first_name)} has ordered for report from ${val.astrologer_id ? val.astrologer_id.first_name : 'N/A'} `, action: this.getStatus(val), time: moment(val.createdAt).fromNow(), image: val.astrologer_id.profile_url, rgbColor: val.astrologer_id.backGroundColor })

            // data.push([val.consumer_id ? val.consumer_id.first_name : 'N/A', val.astrologer_id ? val.astrologer_id.first_name : 'N/A', moment(val.createdAt).calendar(), this.getStatus(val)])
        })
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
            serverSide: true,
            count: this.props.consumerTotal,
            server: true,
            selectableRowsOnClick: false,
            selectableRows: 'none',
            expandableRows: false,
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
        const { selectedData, open } = this.state
        return (
            <>
                <ListData title='New Report Orders' dailyFeedData={data2} />
                <DialogAlert open={this.state.openAlert} handleClose={this.handleRequestClose} handleYes={this.acceptReject} title={`${this.state.message} Report`} description={`Are you sure you want to ${this.state.message == 'Accept' ? 'accept' : 'deny'} this report?`} />

                <Popover
                    id={selectedData ? selectedData._id : ''}
                    open={open ? true : false}

                    anchorEl={open}
                    // anchorReference={`simple-${_id}`}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}


                >
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>

                            <ListItemText primary="Approve" onClick={() => this.handleSelect('Accept')} />
                        </ListItem>
                        <ListItem button>

                            <ListItemText primary="Deny" onClick={() => this.handleSelect('Deny')} />
                        </ListItem>
                    </List>
                </Popover>
            </>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    let { newReports } = auth;
    return { newReports }
}
export default connect(mapStateToProps, { getNewReport, addEditAstrolgerSuccess, apiFailed })(NewOrderRequest)