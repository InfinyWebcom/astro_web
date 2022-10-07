import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNewOrder, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Axios from 'util/axiosRequest'
import ButtonGroup from 'components/buttonGroup';
import Button from '@material-ui/core/Button';
import DataTable from 'components/Table'
import moment from 'moment'
import DialogAlert from 'components/Dialog'
import ListData from 'components/DailyFeed'
class NewOrderRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            perPage: 5
        }
    }
    componentDidMount() {
        this.props.getNewOrder({}, this.props.history)
    }
    getAction = (data) => {
        return <div id={`simple-${data._id}`} onClick={() => this.buttonA(data)} type='button' className={`badge jr-hover mb-0 text-white text-uppercase ml-2 badge-success `}>
            Details
        </div>
        return <Button variant='contained' className="jr-btn bg-md bg-success text-white text-uppercase mt-2" onClick={() => this.buttonA(data)}>Details</Button>
        return <ButtonGroup id={data} buttonA={this.buttonA} buttonB={this.buttonB} buttonC={this.buttonA} LabelA={''} LabelB='' LabelC={data.current_status == 'New' ? 'Details' : ''} />
    }
    buttonA = (data) => {
        this.props.history.push(`/admin/orders/details/${data._id}`)
    }
    buttonB = (data) => {
        this.setState({ openAlert: true, order_id: data._id, product: data, message: 'Track' })
    }
    buttonC = (data) => {
        this.setState({ openAlert: true, order_id: data._id, product: data, message: 'Process' })
    }
    handleRequestClose = () => {
        this.setState({ openAlert: false, ishidden: false })
    }
    changeStatus = async () => {
        this.setState({ loading: true })
        this.handleRequestClose()
        let data = await Axios.axiosHelperFunc('post', 'productOrder/changeOrderStatus', { order_id: this.state.order_id })
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.componentDidMount()
        } else if (data.data && data.error == true) {
            this.props.apiFailed(data.data.title)
        }
        this.setState({ loading: false })
    }
    render() {
        let columns = ['Consumer Name', 'Cost', 'Date', 'Actions']
        let data = []
        let data2 = []
        let { newOrders } = this.props
        newOrders.map((val) => {
            data2.push({ desc: `${val.user_id.first_name} has orderd ${val.products.length} ${val.products.length > 1 ? 'products' : 'product'} for ₹ ${Number(val.total_amount).toFixed(2)} `, action: this.getAction(val), time: moment(val.createdAt).fromNow(), image: val.user_id.profile_url, rgbColor: val.user_id.backGroundColor })

            // data.push([val.user_id ? val.user_id.first_name : 'N/A', `₹ ${val.total_amount}`, moment(val.createdAt).calendar(), this.getAction(val)])
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
                <ListData dailyFeedData={data2} title='New Orders' />
                <DialogAlert open={this.state.openAlert} close='close' handleClose={this.handleRequestClose} handleYes={this.state.message == 'Track' ? '' : this.changeStatus} title={`${this.state.message} Order`} description={this.state.message == 'Track' ? this.getTimeLine() : 'Are you sure you want to process this order?'} />


            </>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    let { newOrders } = auth
    return { newOrders }
}
export default connect(mapStateToProps, { getNewOrder, apiFailed, addEditAstrolgerSuccess })(NewOrderRequest)