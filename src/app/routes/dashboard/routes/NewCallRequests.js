import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCallRequests, addEditAstrolgerSuccess, apiFailed } from 'actions/auth'
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
import ScheduleCall from 'components/ScheduleCall'
class NewOrderRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            perPage: 5,
            astrologers: []
        }
    }
    componentDidMount = async () => {
        this.props.getCallRequests({ request_status: 'Requested' }, this.props.history)
        let data = await Axios.axiosHelperFunc('post', 'admin/getUsersList', {})
        if (data.data && data.data.error == false) {
            this.setState({ astrologers: data.data.data, astrolger: data.data.data.length > 0 ? data.data.data[0]._id : '' })
        }

    }
    newTab = (data) => {
        window.open(`${AppConfig.imageUrl}${data.report_url}.jpg`, '_blank');

    }
    getAction = (data) => {
        return <span type='button' key={data._id} onClick={(e) => this.setState({ selectedData: data, open: e.currentTarget })}><i className='zmdi zmdi-more-vert zmdi-hc-2x'></i></span>
    }
    getStatus = (data,) => {
        const statusData = data.report_status;
        return <>
            <div className='d-flex align-items-center'>
                {<div className='ml-2 d-none d-md-block'>
                    <span className='mb-0 mt-1 ' type='button' key={data._id} onClick={(e) => this.setState({ selectedData: data._id, open: e.currentTarget })}><i className='mb-0 zmdi zmdi-more-vert zmdi-hc-2x'></i></span>
                </div>}
                <div id={`simple-${data._id}`} key={data._id} type='button' onClick={(e) => this.setState({ selectedData: data._id, open: e.currentTarget })} className={`badge d-md-none jr-hover mb-0 text-white text-uppercase  badge-primary `}>
                    Actions
                    </div>
            </div>


        </>
    }
    handleSelect = (value) => {
        this.setState({ open: false, openAlert: true, message: value })
    }
    getUrl = (data, data1) => {
        switch (data) {
            case "Deny":
                return { url: 'callRequest/denyCallRequest', request_id: this.state.selectedData }
            case "Schedule":
                return { url: 'callRequest/scheduleCallRequest', request_id: this.state.selectedData, call_time: moment(data1.call_time).format(), astrologer_id: data1.astrologer_id }
            case "Complete":
                return { url: "callRequest/completeCallRequest", request_id: this.state.selectedData, call_rate: data1.call_rate, call_duration: data1.call_duration, request_status: 'Requested' }
            case "Settle":
                return { url: "callRequest/completeCallRequest", request_id: this.state.selectedData, request_status: 'Settled' }
        }
    }

    changeStatus = async (data1) => {
        this.setState({ openAlert: false, loading: true })
        let data = await Axios.axiosHelperFunc('post', this.getUrl(this.state.message, data1).url, this.getUrl(this.state.message, data1))
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.componentDidMount()

        } else {
            this.props.apiFailed(data.data.title)
        }
        this.setState({ loading: false })
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
        let { callRequests } = this.props
        callRequests.map((val) => {
            data2.push({ desc: `${textCapitalize(val.name)} has requested for call  ${moment(val.preferred_time).format('DD/MM/YYYY')} at ${moment(val.preferred_time).format('LT')} `, action: this.getStatus(val), time: moment(val.createdAt).fromNow(), image: '', rgbColor: '' })

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
        const { selectedData, open, openAlert, astrologers } = this.state
        console.log('selectedData', selectedData)
        return (
            <>
                <ListData title='New Call Requests' dailyFeedData={data2} />
                {this.state.message == 'Deny' && <DialogAlert open={this.state.openAlert} handleClose={this.handleRequestClose} handleYes={this.changeStatus} title={`${this.state.message} Call`} description={`Are you sure you want to ${this.state.message == 'Schedule' ? 'approve' : 'deny'} this call?`} />}
                {this.state.message == 'Schedule' && <ScheduleCall open={openAlert} astrologers={astrologers} handleClose={this.handleRequestClose} handleYes={this.changeStatus} />}
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

                            <ListItemText primary="Accept" onClick={() => this.handleSelect('Schedule')} />
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
    let { callRequests } = auth;
    return { callRequests }
}
export default connect(mapStateToProps, { getCallRequests, addEditAstrolgerSuccess, apiFailed })(NewOrderRequest)