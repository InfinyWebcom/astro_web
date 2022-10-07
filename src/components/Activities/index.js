import React, { Component } from "react";

import Widget from "components/Widget";

import TaskItem from "./TaskItem";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Col, Row } from 'reactstrap';
import moment from 'moment';
import Axios from 'util/axiosRequest';
import DialogAlert from 'components/Dialog'
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

import './index.css'

const myTaskList = [
    {
        id: 1,
        title: 'Make the home page dynamic',
        completed: false,
        date: moment().format('DD-MM-YYYY'),
        user: {
            projectName: 'Chatbull',
            avatar: "https://via.placeholder.com/260x260"
        },
        dueDate: 'Today',
        tags: [1, 2]
    }, {
        id: 2,
        title: 'Design wireframes based on the requirements',
        completed: false,
        date: moment().format('DD-MM-YYYY'),
        user: {
            projectName: 'Flexile',
            avatar: "https://via.placeholder.com/208x208"
        },
        dueDate: 'Today',
        tags: [2, 4]
    }, {
        id: 3,
        title: 'Need to define microinteraction on click of signin button',
        completed: false,
        date: moment().format('DD-MM-YYYY'),
        user: {
            projectName: 'Jumbo',
            avatar: "https://via.placeholder.com/150x150"
        },
        dueDate: '21 July',
        tags: [1, 2, 3]
    }, {
        id: 4,
        title: 'New page need to be designed for property listing',
        completed: false,
        date: moment().format('DD-MM-YYYY'),
        user: {
            projectName: 'Flexile',
            avatar: "https://via.placeholder.com/208x208"
        },
        dueDate: '23 July',
        tags: [2, 3, 4]
    }, {
        id: 5,
        title: 'Design wireframes based on the requirements',
        completed: false,
        date: moment().format('DD-MM-YYYY'),
        user: {
            projectName: 'Flexile',
            avatar: "https://via.placeholder.com/150x150"
        },
        dueDate: '1 Aug',
        tags: [2, 4]
    }];
const styles = theme => ({

    responsiveScroll: {
        overflowX: 'auto',
        overflow: 'auto',
        height: '100%',
        maxHeight: '380px',
        minHeight: '380px'
    },
});

class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            tasks: [],
            open: false,
            selectedData: '',
            loader: false,
            tab_status: true
        }
    }

    componentDidMount = async (value) => {
        let temp = value !== undefined ? value : this.state.value
        console.log('testing componentDidMount state value :-', this.state.value, ' and temp:-', temp, ' and value:-', value)
        if (temp < 2) {
            this.setState({ loader: true, tab_status: true });
            let data = await Axios.axiosHelperFunc('post', 'call/callListing', { [this.props.userType]: this.props.user_id, call_audio_video: temp == 0 ? 'audio' : 'video' })
            if (data.data && data.data.error == false) {
                if (temp == value || temp == this.state.value) {
                    this.setState({ tasks: data.data.data ? data.data.data : [] })
                    this.setState({ loader: false, tab_status: false });
                }
            }
            else if (data.data && data.data.error == true) {
                this.setState({ loader: false, tab_status: false });
            }
            console.log('testing CDM API RES :-', data, 'state value :-', this.state.value, ' and temp:-', temp, ' and value:-', value);
        }
    }

    handleChange = (event, value) => {
        console.log('handle change called', value);
        this.setState({ tasks: [] })
        if (value < 2) {
            this.setState({ value: value })
            console.log('testing here 1');
            this.forOther(value)
        }
        else if (value == 3) {
            console.log('testing here 2');
            this.setState({ value: value })
            this.forReportListing(value)
        }
        else {
            console.log('testing here 3');
            this.setState({ value: value })
            this.forChatRate(value)
        }
    };

    forChatRate = async (value) => {
        let temp = value ? value : this.state.value
        console.log('testing forChatRate state value :-', this.state.value, ' and temp:-', temp, ' and value:-', value)

        this.setState({ loader: true, tab_status: true });
        let data = await Axios.axiosHelperFunc('post', temp == 2 ? 'chat/chatListing' : 'admin/getReportList', { [this.props.userType]: this.props.user_id, call_audio_video: temp == 0 ? 'audio' : 'video' })
        if (data.data && data.data.error == false) {
            if (temp == this.state.value) {
                this.setState({ tasks: data.data.data })
                this.setState({ loader: false, tab_status: false });
            }
        }
        else if (data.data && data.data.error == true) {
            this.setState({ loader: false, tab_status: false });
        }
        console.log('testing forChatRate API RES :-', data, 'state value :-', this.state.value, ' and temp:-', temp, ' and value:-', value);

    }

    forReportListing = async (value) => {
        let temp = value ? value : this.state.value
        console.log('testing forReportListing state value :-', this.state.value, ' and temp:-', temp, ' and value:-', value)

        this.setState({ loader: true, tab_status: true });
        let data = await Axios.axiosHelperFunc('post', 'admin/getReportList', { [this.props.userType]: this.props.user_id })
        if (data.data && data.data.error == false) {
            if (temp == this.state.value) {
                this.setState({ tasks: data.data.data })
                this.setState({ loader: false, tab_status: false });
            }
        }
        else if (data.data && data.data.error == true) {
            this.setState({ loader: false, tab_status: false });
        }
        console.log('testing forReportListing API RES :-', data, 'state value :-', this.state.value, ' and temp:-', temp, ' and value:-', value);
    }

    forOther = async (value) => {
        let temp = value !== undefined ? value : this.state.value
        console.log('testing forOther state value :-', this.state.value, ' and temp:-', temp, ' and value:-', value)

        if (temp < 2) {
            this.setState({ loader: true, tab_status: true });
            let data = await Axios.axiosHelperFunc('post', 'call/callListing', { [this.props.userType]: this.props.user_id, call_audio_video: temp == 0 ? 'audio' : 'video' })
            if (data.data && data.data.error == false) {
                if (temp == this.state.value) {
                    this.setState({ tasks: data.data.data ? data.data.data : [] })
                    this.setState({ loader: false, tab_status: false });
                }
            }
            else if (data.data && data.data.error == true) {
                this.setState({ loader: false, tab_status: false });
            }
            console.log('testing forOther API RES :-', data, 'state value :-', this.state.value, ' and temp:-', temp, ' and value:-', value);
        }
    }

    onChange = (data, index) => {
        // setTaskList(taskList.map(task => {
        //     if (task.id === data.id) {
        //         task.completed = !data.completed;
        //     }
        //     return task;
        // }))
    };

    openPopOver = (data) => {
        if (data.report_status == 'Uploaded') {
            this.setState({ open: true, selectedData: data })
        }

    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleSelect = (value) => {
        this.setState({ open: false, openAlert: true, message: value })
    }

    handleRequestClose = () => {
        this.setState({ openAlert: false })
    }

    acceptReject = async () => {
        let data = await Axios.axiosHelperFunc('post', 'admin/changeReportStatus', { report_id: this.state.selectedData._id, report_status: this.state.message == 'Approve' ? 'Approved' : 'Rejected' })
        if (data.data && data.data.error == false) {
            this.setState({ openAlert: false })
            this.forChatRate()
        }
    }

    render() {
        const { value, loader, tab_status } = this.state
        const { classes } = this.props
        return (
            <Widget>

                <Row>
                    <Col sm={4} xs={4} md={4} lg={2} xl={2} className='d-none d-sm-block'>
                        <div className="d-flex flex-row">
                            <h4 className=""> Activities</h4>
                        </div>
                    </Col>

                    <Col sm={8} xs={12} md={8} lg={10} xl={10} className='d-flex justify-content-end'>
                        <div className="jr-tabs-classic">
                            <Tabs className="jr-tabs-up Jr-Tabs" variant="scrollable" value={value} onChange={this.handleChange} centered>
                                <Tab disabled={false} className="jr-tabs-label" label="Audio Calls" />
                                <Tab disabled={false} className="jr-tabs-label" label="Video Calls" />
                                <Tab disabled={false} className="jr-tabs-label" label="Chats" />
                                <Tab disabled={false} className="jr-tabs-label" label="Reports" />
                            </Tabs>
                        </div>
                    </Col>

                    <Col sm={12} xs={12} md={12} lg={12} xl={12} className='mt-4'>
                        <div className={"jr-tabs-classic"}>
                            <div className={"jr-tabs-content jr-task-list " + this.state.tasks && this.state.tasks.length > 5 ? classes.responsiveScroll : ''}>
                                {
                                    this.state.tasks.length > 0 ?
                                        <>
                                            {value === 0 && this.state.tasks.map((task, index) => <TaskItem userType={this.props.userType} key={index} data={task} onChange={this.onChange} value={this.state.value} report={false} />)}
                                            {value === 1 && this.state.tasks.map((task, index) => <TaskItem userType={this.props.userType} key={index} data={task} onChange={this.onChange} value={this.state.value} report={false} />)}
                                            {value === 2 && this.state.tasks.map((task, index) => <TaskItem userType={this.props.userType} key={index} data={task} onChange={this.onChange} value={this.state.value} report={false} />)}
                                            {
                                                value === 3 && this.state.tasks.map((task, index) =>
                                                    <TaskItem
                                                        userType={this.props.userType}
                                                        key={index}
                                                        data={task}
                                                        onChange={this.onChange}
                                                        value={this.state.value}
                                                        report={true}
                                                        open={this.state.open}
                                                        openPopOver={this.openPopOver}
                                                        handleClose={this.handleClose}
                                                        handleSelect={this.handleSelect}
                                                    />)
                                            }

                                        </>
                                        :
                                        loader == true ?
                                            null
                                            :
                                            <div className='d-flex justify-content-center mt-1'><h4>No records found</h4></div>
                                }

                                {
                                    loader == true ?
                                        <div className="loader-view">
                                            <CircularProgress />
                                        </div>
                                        :
                                        null
                                }

                            </div>
                        </div>
                    </Col>

                </Row>

                <DialogAlert open={this.state.openAlert} handleClose={this.handleRequestClose} handleYes={this.acceptReject} title={`${this.state.message} Report`} description={`Are you sure you want to ${this.state.message == 'Approve' ? 'approve' : 'reject'} this report?`} />
            </Widget>
        );
    }

}
export default withStyles(styles)(TaskList);
