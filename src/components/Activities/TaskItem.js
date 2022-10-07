import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap'
import AppConfig from 'constants/config'
import helperFunction from 'constants/helperFunction'
const taskStatus = [
    {
        id: 1,
        title: 'Critical',
        color: 'danger'
    }, {
        id: 2,
        title: 'High',
        color: 'warning'
    }, {
        id: 3,
        title: 'Normal',
        color: 'success'
    }, {
        id: 4,
        title: 'Low',
        color: 'dark'
    }
];
const getColor = (data) => {
    switch (data) {
        case 'Ordered':
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
const newTab = (data) => {
    console.log('newTab', data)

    let url = data.report_url.includes('.pdf') ? data.report_url : `${data.report_url}.jpg`
    window.open(`${AppConfig.imageUrl}${url}`, '_blank');

}
const getStatus = (data, props) => {
    const statusData = data.report_status;
    console.log('statusData', statusData)
    return <>
        {statusData != 'Ordered' && <span onClick={() => newTab(data)} id={`simple-${data._id}`} className={`badge jr-hover mb-0 text-white badge-info`}>
            View
        </span>}
        <span onClick={() => props.openPopOver(data)} id={`simple-${data._id}`} className={`badge jr-hover mb-0 text-white badge-${getColor(statusData)}`}>
            {statusData}
        </span>

    </>
};
const getTextSatus = (data, props) => {
    const statusData = data.report_status;
    return <>
        <span onClick={() => props.openPopOver(data)} id={`simple-${data._id}`} className={`badge jr-hover mb-0 text-white badge-${getColor(statusData)}`}>
            {statusData}
        </span>

    </>
}
const getHoursCost = (data) => {
    let { astrologer_duration, call_rate, chat_rate, _id } = data
    let rates = call_rate ? call_rate : chat_rate
    return <div>
        <h5 className="text-truncate jr-task-item-title mb-1 text-capitalize">{astrologer_duration} minutes</h5>
        <p key={_id} className="text-grey jr-fs-sm mb-0">{rates ? ' ₹' + rates : 'N/A'}</p>
    </div>
}
const getRport = () => {

}
class TicketItem extends Component {
    getTimeData = (val, index) => {
        let data = index == 2 ? val.chat_duration : val.astrologer_duration
        let time = moment.duration(data, 'seconds')
        console.log('getTime', time.minutes(), data, val)
        return moment.duration(data, 'seconds') > 0 ? ` ${time.hours() > 0 ? time.hours() + ' hours' : ''} ${time.minutes() > 0 ? time.minutes() + ' minutes' : ''} ${time.seconds() + ' seconds'}` : ''
    }
    getDescription = () => {
        let data = this.props.data
        console.log('getDescription:', data.call_rate, data.call_rate ? data.call_rate : data.chat_rate, this.props.userType)
        switch (this.props.value) {
            case 0:
            case 1:
            case 2:
                return <>{data[this.props.userType == 'consumer_id' ? 'astrologer_id' : 'consumer_id'].first_name} {this.getTimeData(data, this.props.value) ? ',' : ''}   <span className='h6'>{this.getTimeData(data, this.props.value)}</span></>
            case 3:
                return ` ${data[this.props.userType == 'consumer_id' ? 'astrologer_id' : 'consumer_id'].first_name}`
        }
    }

    render() {
        const { _id, title, avatar, date, status, start_date, createdAt, astrologer_id, value } = this.props.data;
        console.log('calendaer==========', helperFunction.getGradient(this.props.data[this.props.userType == 'consumer_id' ? 'astrologer_id' : 'consumer_id'].backGroundColor), this.props.data[this.props.userType == 'consumer_id' ? 'astrologer_id' : 'consumer_id'].profile_url)
        
        console.log('better :-', this.props.data);
        
        
        return (
            <div key={"TicketItem" + _id} className="media jr-task-list-item flex-nowrap">
                {/* <Avatar className="mr-3 size-36" src={avatar} />*/}

                <div className={`media-body jr-task-item-content smFullWidth ${'fullWidth'}`}>
                    <ListItem button className='w-100 justify-content-between' >
                        <div className={this.props.value == 3 ? "jr-task-item-content-left d-inline-flex smFullWidth" : 'd-inline-flex smFullWidth'} >
                            <Avatar
                                style={{ background: !this.props.data[this.props.userType == 'consumer_id' ? 'astrologer_id' : 'consumer_id'].profile_url ? '#d90368' : '' }}
                                src={`${AppConfig.imageUrl}${this.props.data[this.props.userType == 'consumer_id' ? 'astrologer_id' : 'consumer_id'].profile_url}.jpg`} alt={this.props.data[this.props.userType == 'consumer_id' ? 'astrologer_id' : 'consumer_id'].first_name}
                                className="user-avatar"
                            />

                            <div className="user-detail ml-1 w-100">
                                {
                                    this.props.value !== 3 &&
                                    <h5 className="d-md-none jr-task-item-title mb-1 text-capitalize mw-100">
                                        {this.getDescription()}
                                    </h5>
                                }

                                <h5 className="d-none d-md-block jr-task-item-title mb-1 text-capitalize mw-100">
                                    {this.getDescription()}
                                </h5>

                                {
                                    this.props.value == 3 &&
                                    <div className='d-inline d-md-none'>
                                        <div className='d-inline-flex align-items-center w-100 justify-content-between'>
                                            <span className="d-md-none jr-task-item-title mb-1 text-capitalize">{this.getDescription()}</span>
                                            <span className="d-md-none jr-task-item-title mb-1 text-capitalize font-weight-bold text-success">₹ {this.props.data.client_report_rate}</span>
                                        </div>
                                    </div>
                                }

                                <p className="user-description">
                                    {`${moment(this.props.data.createdAt).format('DD/MM/YYYY')} ${moment(this.props.data.createdAt).format('LT')}`}
                                </p>

                                {
                                    this.props.value !== 3 &&
                                    <div className='d-md-none d-inline-flex align-items-center w-100 justify-content-between'>
                                        {<span className={`d-md-none jr-task-item-title mb-1 text-capitalize font-weight-bold ${this.props.data.astrologer_duration > 0 ? ' text-success' : ' text-danger'}`}>{this.props.data.astrologer_duration > 0 ? `₹ ${(Number(this.props.value == 2 ? this.props.data.chat_rate : this.props.data.call_rate)).toFixed(2)}` : `missed call`}</span>}
                                        {/* {this.props.data.report_status != 'Ordered' && <span onClick={() => newTab(this.props.data)} className="jr-nonhover d-md-none"><i className={`zmdi zmdi-eye zmdi-hc-2x text-warning mr-0  `} /></span>} */}
                                    </div>
                                }

                                {
                                    this.props.value == 3 &&
                                    <div className='d-inline-flex align-items-center w-100 '>
                                        {
                                            this.props.value == 3 &&
                                            <span className="d-md-none jr-task-item-title mb-1 text-capitalize mr-2">
                                                {getTextSatus(this.props.data, this.props)}
                                            </span>
                                        }
                                        {this.props.data.report_status != 'Ordered' && <span className="d-md-none jr-task-item-title mb-1 text-capitalize ">
                                            <span onClick={() => newTab(this.props.data)} id={`simple-${this.props.data._id}`} className={`badge jr-hover mb-0 text-white badge-info`}>
                                                View
        </span>
                                        </span>}
                                    </div>
                                }
                            </div>

                        </div>

                        {
                            this.props.value !== 3 &&
                            <div className='d-none d-md-block align-self-start'>
                                <div className={`user-detail  d-flex jr-task-item-content-right text-capitalize font-weight-bold ${this.props.data.astrologer_duration || this.props.data.chat_duration > 0 ? ' text-success' : ' text-danger'}`}>
                                    {this.props.data.astrologer_duration || this.props.data.chat_duration > 0 ? `₹ ${(Number(this.props.value == 2 ? this.props.data.chat_rate : this.props.data.call_rate)).toFixed(2)}` : this.props.value == 2 ? `missed` : `missed call`}
                                </div>
                            </div>
                        }

                        {
                            this.props.value == 3 &&
                            <div className='d-none d-md-block align-self-start'>
                                <div className="d-flex jr-task-item-content-right mb-1 font-weight-bold text-success">
                                    {`₹ ${this.props.data.client_report_rate}`}
                                </div>
                                <div className="d-flex jr-task-item-content-right">
                                    {this.props.report == true ? getStatus(this.props.data, this.props) : getHoursCost(this.props.data)}
                                </div>
                            </div>
                        }
                    </ListItem>
                </div>

                <Popover
                    id={`simple-${_id}`}
                    open={this.props.open}

                    anchorEl={`simple-${_id}`}
                    // anchorReference={`simple-${_id}`}
                    onClose={this.props.handleClose}
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

                            <ListItemText primary="Approve" onClick={() => this.props.handleSelect('Approve')} />
                        </ListItem>
                        <ListItem button>

                            <ListItemText primary="Reject" onClick={() => this.props.handleSelect('Reject')} />
                        </ListItem>
                    </List>
                </Popover>
            </div >
        )
    }

};

export default TicketItem;
