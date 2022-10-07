import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CardBox from "components/CardBox/index";
import { connect } from 'react-redux'
import { getastrologerList, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Button from '@material-ui/core/Button';
import Axios from 'util/axiosRequest'
import ButtonGroup from 'components/buttonGroup'
import MUIDataTable from "components/DataTable";
import DialogAlert from 'components/Dialog'
import DataLoader from 'components/DataLoader'
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
class Astrolger extends Component {
    constructor(props) {
        super(props);
        let url = props.location.search
        let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''

        this.state = {
            open: false, user_id: '', data: [],
            page: json ? json.page ? json.page : 0 : 0,
            perPage: 20,
            searchText: json ? json.searchText : '',
            loading: false
        }
    }
    componentDidMount = async () => {
        this.props.getastrologerList({ page: Number(Number(this.state.page)) + 1, perPage: this.state.perPage, searchText: this.state.searchText })
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.astrolgers !== this.props.astrolgers) {
            let temp = []
            this.props.astrolgers.map((val, i) => {
                temp.push([`${textCapitalize(val.first_name)} `, val.email, val.mobile, `${val.avg_rating ? val.avg_rating : 0}/5`, this.getAction(val)])
            })
            this.setState({ data: temp })
        }
    }
    changePage = (page) => {
        let pages = Number(page) + 1
        let data = {
            page: pages,
            perPage: this.state.perPage,
            filter: '',
            searchText: this.state.searchedText
        }
        let obj = { page: page }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.history.replace('/admin/astrologer/lists?' + url)
        this.props.getastrologerList(data, this.props.history)
        this.setState({ page, perPage: 20 })

    };
    handleClick = () => {
        this.props.history.push('/admin/astrologer/add')
    }
    getAction = (val) => {
        return <ButtonGroup key={val._id} id={val._id} LabelE='Details' buttonE={this.buttonE} buttonA={val.approval_status == 'pending' ? this.approveAstro : this.buttonA} buttonB={this.buttonB} buttonC={this.buttonC} LabelA={val.approval_status == 'pending' ? 'Approve' : 'Edit'} LabelB='Delete' LabelC='Certificates' LabelD='Ratings' buttonD={this.buttonD} />
    }
    buttonE = (id) => {
        this.props.history.push(`/admin/astrologer/details/${id}`)
    }
    buttonA = (id) => {
        this.props.history.push(`/admin/astrologer/edit/${id}`)
    }
    approveAstro = (id) => {
        this.props.history.push(`/admin/astrologer/approve/${id}`)
    }
    buttonB = (id) => {
        this.setState({ open: true, user_id: id })
    }
    buttonC = (id) => {
        this.props.history.push(`/admin/astrologer/certificates/${id}`)
    }
    buttonD = (id) => {
        this.props.history.push(`/admin/astrologer/ratings-reviews/${id}`)
    }
    handleRequestClose = () => {
        this.setState({ open: false, })
    }
    deleteAstro = async () => {
        this.setState({ loading: true })
        this.handleRequestClose()
        let data = await Axios.axiosHelperFunc('post', 'admin/deleteUser', { user_id: this.state.user_id })

        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.props.getastrologerList({ page: Number(Number(this.state.page)) + 1, perPage: this.state.perPage })
            this.setState({ loading: false })

        } else if (data.data && data.error == true) {
            this.props.apiFailed(data.data.title)
            this.setState({ loading: false })
        }
    }
    render() {
        let { classes, astrolgers } = this.props;
        console.log('astr', astrolgers)
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
            rowsPerPage: this.state.perPage,
            selectableRowsOnClick: false,
            selectableRows: 'none',
            fixedHeader: true,
            search: false,
            count: this.props.total_count,
            onTableChange: (action, tableState) => {
                console.log('action=', action, tableState)
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page);
                        break;

                }
            },
        }
        let columns = ["Name", 'Email', "Phone", "Rating", "Actions"]
        let { data } = this.state

        return (
            <div className="parent animated slideInUpTiny animation-duration-3">


                {(this.props.loading || this.state.loading) ? <DataLoader /> : <MUIDataTable
                    title=''
                    data={data}
                    columns={columns}
                    options={options}
                />}
                <DialogAlert open={this.state.open} handleClose={this.handleRequestClose} handleYes={this.deleteAstro} title={'Delete Astrologer'} description='Are you sure you want to delete this astrologer?' />

            </div>
        );
    }
}
Astrolger.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { astrolgers, loading, total_count } = auth
    return { astrolgers, loading, total_count }
}
export default connect(mapStateToProps, { getastrologerList, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Astrolger))