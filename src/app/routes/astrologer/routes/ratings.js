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
import { getRatings, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
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
        this.state = {
            open: false, rating_id: '', data: [],
            page: 0,
            perPage: 20,
        }
    }
    componentDidMount = async () => {
        this.props.getRatings({ user_id: this.props.match.params.id, page: Number(this.state.page) + 1, perPage: this.state.perPage }, this.props.history)
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.ratings !== this.props.ratings) {
            let temp = []
            this.props.ratings && this.props.ratings.data.map((val, i) => {
                temp.push([`${val.from_id ? textCapitalize(val.from_id.first_name) : 'N/A'} `, this.getStars(val.rating_value), val.description, this.getAction(val._id)])
            })
            this.setState({ data: temp })
        }
    }
    getStars = (rating) => {
        let data = new Array(parseInt(rating)).fill(" ");
        console.log('data======', data)
        return <div className='d-inline'>
            {
                data.map((val, i) => <i key={i} className="zmdi zmdi-star text-warning"></i>)
            }
        </div>
    }
    changePage = (page) => {
        let pages = page + 1
        let data = {
            user_id: this.props.match.params.id,
            page: pages,
            perPage: this.state.perPage,
            filter: '',
            searchText: this.state.searchedText
        }
        this.props.getRatings(data, this.props.history)
        this.setState({ page })

    };
    handleClick = () => {
        this.props.history.push('/admin/astrologer/add')
    }
    getAction = (id) => {
        return <ButtonGroup key={id} id={id} buttonA={this.buttonA} buttonB={this.buttonB} buttonC={this.buttonC} LabelA={'Delete'} LabelB='' LabelC='' LabelD='' buttonD={this.buttonD} />
    }
    buttonA = (id) => {
        this.setState({ open: true, rating_id: id })
    }
    buttonB = (id) => {

    }
    buttonC = (id) => {
    }
    buttonD = (id) => {
    }
    handleRequestClose = () => {
        this.setState({ open: false, rating_id: '' })
    }
    deleteAstro = async () => {
        let data = await Axios.axiosHelperFunc('post', 'admin/deleteRating', { rating_id: this.state.rating_id })
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.componentDidMount()
            this.handleRequestClose()
        } else if (data.data && data.error == true) {
            this.props.apiFailed(data.data.title)
            this.componentDidMount()
        }
    }
    render() {
        let { classes, ratings } = this.props;
        console.log('astr===', ratings)
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
            search: false,
            count: ratings.total_count ? ratings.total_count : 0,
            onTableChange: (action, tableState) => {
                console.log('action=', action, tableState)
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page);
                        break;

                }
            },
        }
        let columns = ["Consumer", "Rating", "Review", "Action"]
        let { data } = this.state

        return (
            <div className="parent animated slideInUpTiny animation-duration-3">

                <MUIDataTable
                    title=''
                    data={data}
                    columns={columns}
                    options={options}
                />
                <DialogAlert open={this.state.open} handleClose={this.handleRequestClose} handleYes={this.deleteAstro} title={'Delete Rating'} description='Are you sure you want to delete this rating?' />

            </div>
        );
    }
}
Astrolger.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { ratings, loading } = auth
    return { ratings, loading }
}
export default connect(mapStateToProps, { getRatings, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Astrolger))