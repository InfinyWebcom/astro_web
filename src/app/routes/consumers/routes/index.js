import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { listConsumers, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Axios from 'util/axiosRequest'
import ButtonGroup from 'components/buttonGroup';
import MUIDataTable from "components/DataTable";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppConfig from 'constants/config'
import MonthYearFilter from 'components/MonthYearFilter';
import moment from 'moment';
import DialogAlert from 'components/Dialog'
import { Row, Col, Input, FormGroup, FormFeedback, Label } from 'reactstrap'
import { number } from 'constants/validations'
import DataLoader from 'components/DataLoader'
import { textCapitalize } from 'util/helper'
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
    appBar: {
        backgroundColor: '#fff',
        borderBottom: "2px solid"
    },
    MuiPaperRounded: {
        borderRadius: 0
    }
});
const statusArray = ['New', 'Approved', 'Scheduled', 'Denied', 'Cancelled']
class SeviceRequest extends Component {
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
            loading: false,
            
            searchText: json ? json.searchText : '',
        }
    }
    componentDidMount = async () => {
        this.props.listConsumers({ page: Number(this.state.page) + 1, perPage: this.state.perPage, searchText: this.state.searchText }, this.props.history)
        let data = await Axios.axiosHelperFunc('post', 'admin/getUsersList', {})
        console.log('data==', data.data.data)
        if (data.data && data.data.error == false) {
            this.setState({ astrologers: data.data.data, astrolger: data.data.data.length > 0 ? data.data.data[0]._id : '' })
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.consumers !== this.props.consumers) {
            let temp = []
            this.props.consumers.map((val, i) => {
                temp.push([`${textCapitalize(val.first_name)}`, val.email, val.mobile,moment(val.createdAt).format("DD/MM/YYYY"), this.getAction(val)])
            })
            // .format("MMM Do YYYY, hh:mm A")
            this.setState({ data: temp })
        }
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
        this.props.listConsumers(data, this.props.history)
        this.setState({ page })

    };

    getAction = (data) => {
        return <ButtonGroup id={data} buttonA={this.buttonA} buttonB={this.buttonB} buttonC={this.buttonB} LabelA={'Details'} LabelB={data.is_blocked ? '' : 'Block'} LabelC={data.is_blocked ? 'Unblock' : ''} />
    }
    buttonA = (data) => {
        console.log('data===', data)
        this.props.history.push(`/admin/consumers/details/${data._id}`)
    }
    buttonB = (data) => {
        this.setState({ openAlert: true, user_id: data._id, message: data.is_blocked ? 'Unblock' : 'Block', })
    }
    buttonC = (id) => {
        let index = this.props.Order.findIndex((val) => val._id == id)
        this.setState({ open: true, user_id: id, message: this.props.Order[index].is_hidden == true ? 'Unhide' : 'Hide' })
    }
    handleRequestClose = () => {
        this.setState({ open: false, ishidden: false })
    }
    blockUnblock = async () => {
        this.setState({ loading: true })
        this.handleRequestClose()
        let data = await Axios.axiosHelperFunc('post', 'admin/blockUser', { user_id: this.state.user_id })
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.props.listConsumers({ page: Number(this.state.page) + 1, }, this.props.history)

        } else if (data.data && data.error == true) {
            this.props.apiFailed(data.data.title)
            // this.props.listConsumers({ page: Number(this.state.page) + 1,  }, this.props.history)
        }
        this.setState({ loading: false })


    }
    handleChange = (event, value) => {
        this.setState({ value });
        this.props.listConsumers({ page: Number(this.state.page) + 1, status: statusArray[value], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)

    };

    handleChangeIndex = index => {
        this.setState({ value: index });
        this.props.listConsumers({ page: Number(this.state.page) + 1, status: statusArray[index], month: Number(this.state.month) + 1, year: this.state.year }, this.props.history)
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
    handleApply = () => {
        this.props.listConsumers({ page: Number(this.state.page) + 1, status: statusArray[this.state.value], month: this.state.tempMonth, year: this.state.tempYear }, this.props.history)
        this.setState({ month: this.state.tempMonth, year: this.state.tempYear, open: false })
    }
    handleChangeState = (e, key) => {
        this.setState({ [key]: e.target.value })
    }
    handleRequestClose = () => {
        this.setState({ openAlert: false })
    }

    selectAstro = (e) => {
        this.setState({ astrolger: e.target.value })
    }
    changeCost = (e) => {
        this.setState({ cost: e.target.value })
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
                        <Input invalid={number(this.state.cost) ? true : false} className='form-control form-control-lg' type={'number'} onChange={(e) => this.changeCost(e)} value={this.state.cost} />
                        <FormFeedback>{number(this.state.cost)}</FormFeedback>
                    </FormGroup>

                </Col>
            </Row>
        )
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
            serverSide: true,
            count: this.props.consumerTotal,
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
        let columns = ['Name', 'Email', 'Mobile', 'Registered On', 'Actions']
        let { data } = this.state
        console.log('classes===', classes)
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">

                <MonthYearFilter open={this.state.open} handleClose={this.handleClose} handleApply={this.handleApply} handleChange={this.handleChangeState} month={this.state.tempMonth} year={this.state.tempYear} />
                {this.props.loading || this.state.loading ? <DataLoader /> : this.dateTable('', data, columns, options)}

                <DialogAlert open={this.state.openAlert} handleClose={this.handleRequestClose} handleYes={this.blockUnblock} title={`${this.state.message} Consumer`} description={`Are you sure you want to ${this.state.message == 'Block' ? 'block' : 'unblock'} this consumer?`} />

            </div>
        );
    }
}

SeviceRequest.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { consumers, loading, consumerTotal } = auth
    return { consumers, loading, consumerTotal }
}
export default connect(mapStateToProps, { listConsumers, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(SeviceRequest))