import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNewService, addEditAstrolgerSuccess, apiFailed } from 'actions/auth'
import DataTable from 'components/Table'
import moment from 'moment';
import { Row, Col, FormGroup, FormFeedback, Input, Label } from 'reactstrap'
import { number } from 'constants/validations'
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Axios from 'util/axiosRequest';
import DialogAlert from 'components/Dialog'
import ListData from 'components/DailyFeed'
import { textCapitalize } from 'util/helper'
class NewServiceRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            perPage: 5,
            open: '',
            selectedData: '',
            commission: ''
        }
    }
    componentDidMount = async () => {
        this.props.getNewService({}, this.props.history)
        let data = await Axios.axiosHelperFunc('post', 'admin/getUsersList', {})
        console.log('data==', data.data.data)
        if (data.data && data.data.error == false) {
            this.setState({ astrologers: data.data.data, astrolger: data.data.data.length > 0 ? data.data.data[0]._id : '' })
        }
    }
    getAction = (data) => {
        return <span type='button' key={data._id} onClick={(e) => this.setState({ selectedData: data, cost: data.rate, tempCost: data.rate, open: e.currentTarget, commission: data?.commission ? data.commission : 0 })}><i className='zmdi zmdi-more-vert zmdi-hc-2x'></i></span>
    }
    handleClose = () => {
        this.setState({ open: '', selectedData: '' })
    }
    handleSelect = (value) => {
        this.setState({ open: false, openAlert: true, message: value })
    }
    handleRequestClose = () => {
        this.setState({ openAlert: false })
    }
    getDescription = () => {
        console.log('getDescription', number(this.state.cost))
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
    selectAstro = (e) => {
        this.setState({ astrolger: e.target.value })
    }
    changeCost = (e) => {
        let newCommission = ((Number(this.state.commissionPer) / 100) * Number(e.target.value)).toFixed(2);
        this.setState({ cost: e.target.value, commission: newCommission })
    }
    changeReportStatus = async () => {
        if ((this.state.message == 'Accept' && !number(this.state.cost) && !(Number(this.state.cost) < Number(this.state.tempCost))) || this.state.message == 'Deny') {
            let data = await Axios.axiosHelperFunc('post', 'serviceRequest/acceptDenyRequest', { request_id: this.state.selectedData._id, rate: this.state.cost, commission: this.state.commission, service_status: this.state.message == 'Accept' ? 'Approved' : 'Denied', astrologer_id: this.state.message == 'Accept' ? this.state.astrolger : '' })
            if (data.data && data.data.error == false) {
                this.props.getNewService({}, this.props.history)
                this.props.addEditAstrolgerSuccess(data.data.title)
                this.handleRequestClose()
            } else if (data.data && data.error == true) {
                this.props.apiFailed(data.data.title)
                // this.props.serviceRequestList({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
            }
        }

    }
    render() {
        let columns = ['Consumer Name', 'Service Name', 'Service Cost', 'Date', 'Action']
        let data = []
        let data2 = []
        const { selectedData, open } = this.state
        const { newServices } = this.props
        newServices.map((val) => {
            data2.push({ desc: `${textCapitalize(val.consumer_id.first_name)} has paid ₹ ${val.rate} and requested for ${val.service_id.name} on ${moment(val.service_time).format('DD/MM/YYYY')}`, action: this.getAction(val), time: moment(val.service_time).fromNow(), diff: moment(val.service_time).diff(moment()), service: true, image: val.consumer_id.profile_url, rgbColor: val.consumer_id.backGroundColor })
            // data.push([val.consumer_id ? textCapitalize(val.consumer_id.first_name) : 'N/A', val.service_id.name, `₹ ${val.rate}`, moment(val.service_time).calendar(), this.getAction(val)])
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

        return (
            <>
                <ListData dailyFeedData={data2} title='New Service Requests' />
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

                            <ListItemText primary="Accept" onClick={() => this.handleSelect('Accept')} />
                        </ListItem>
                        <ListItem button>

                            <ListItemText primary="Deny" onClick={() => this.handleSelect('Deny')} />
                        </ListItem>
                    </List>
                </Popover>
                <DialogAlert open={this.state.openAlert} handleClose={this.handleRequestClose} handleYes={this.changeReportStatus} title={`${this.state.message} Service`} description={this.state.message === 'Accept' ? this.getDescription() : `Are you sure you want to ${this.state.message == 'Accept' ? 'accept' : this.state.message == 'Deny' ? 'deny' : 'deny'} this service ?`} />

            </>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    let { newServices } = auth
    return { newServices }
}
export default connect(mapStateToProps, { getNewService, addEditAstrolgerSuccess, apiFailed })(NewServiceRequest)