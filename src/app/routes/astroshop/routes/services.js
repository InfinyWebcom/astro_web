import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { connect } from 'react-redux'
import { listServices, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Button from '@material-ui/core/Button';
import Axios from 'util/axiosRequest'
import ButtonGroup from 'components/buttonGroup';
import MUIDataTable from "components/DataTable";
import DialogAlert from 'components/Dialog'
import DataLoader from 'components/DataLoader';
import { textCapitalize } from 'util/helper'
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

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
    }
});
class Services extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            open: false,
            service_id: '',
            ishidden: false,
            data: [],
            page: 0,
            perPage: 20,
            loading: false
        }
    }
    componentDidMount = async () => {
        this.props.listServices({ page: Number(this.state.page) + 1 }, this.props.history)
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.services !== this.props.services) {
            let temp = []
            this.props.services.map((val, i) => {
                temp.push([`${textCapitalize(val.name)}`, `₹ ${Number(val.rate).toFixed(2)}`, this.getAction(val)])
            })
            this.setState({ data: temp })
        }
    }
    changePage = (page) => {
        let pages = page + 1
        let data = {
            page: pages,
            perPage: this.state.perPage,
            filter: '',
            searchText: this.state.searchedText
        }
        this.props.listServices(data, this.props.history)
        this.setState({ page })

    };

    handleClick = () => {
        this.props.history.push('/admin/astroshops/services/addServices')
    }
    getAction = (data) => {
        return <ButtonGroup id={data._id} buttonA={this.buttonA} buttonB={this.buttonB} buttonC={this.buttonC} LabelA={'Edit'} LabelB='Delete' LabelC={data.is_hidden == true ? 'Unhide' : 'Hide'} />
    }
    buttonA = (id) => {
        this.props.history.push(`/admin/astroshops/services/editServices/${id}`)
    }
    buttonB = (id) => {
        this.setState({ open: true, service_id: id, message: 'Delete' })
    }
    buttonC = (id) => {
        let index = this.props.services.findIndex((val) => val._id == id)
        this.setState({ open: true, service_id: id, message: this.props.services[index].is_hidden == true ? 'Unhide' : 'Hide' })
    }
    handleRequestClose = () => {
        this.setState({ open: false, ishidden: false })
    }
    deleteAstro = async () => {
        this.setState({ loading: true })
        this.handleRequestClose()
        let data = await Axios.axiosHelperFunc('post', this.state.message == 'Delete' ? 'service/deleteService' : 'service/hideService', { service_id: this.state.service_id })
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.props.listServices({}, this.props.history)

        } else if (data.data && data.error == true) {
            this.props.apiFailed(data.data.title)
            this.props.listServices({}, this.props.history)
        }
        this.setState({ loading: false })
    }
    render() {
        let { classes, services } = this.props;
        console.log('services', services)
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
            server: true,
            selectableRowsOnClick: false,
            selectableRows: 'none',
            fixedHeader: true,
            count: this.props.total_count,
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
        let columns = ["Name", "Cost", "Actions"]
        let { data } = this.state
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">

                {this.props.loading || this.state.loading ? <DataLoader /> : <MUIDataTable
                    title=''
                    data={data}
                    columns={columns}
                    options={options}
                />}
                <DialogAlert open={this.state.open} handleClose={this.handleRequestClose} handleYes={this.deleteAstro} title={`${this.state.message} Service`} description={`Are you sure you want to ${this.state.message == 'Delete' ? 'delete' : this.state.message == 'Hide' ? 'hide' : 'unhide'} this service?`} />
            </div>
        );
    }
}

Services.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { services, loading, total_count } = auth
    return { services, loading, total_count }
}
export default connect(mapStateToProps, { listServices, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Services))