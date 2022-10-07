import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { connect } from 'react-redux'
import { listPromotions, apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import Button from '@material-ui/core/Button';
import Axios from 'util/axiosRequest'
import { required } from 'constants/validations'
import ButtonGroup from 'components/buttonGroup';
import MUIDataTable from "components/DataTable";
import DialogAlert from 'components/Dialog'
import { Row, Col, Input, FormGroup, FormFeedback, Label } from 'reactstrap'
import moment from 'moment'
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
class Promotions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            open: false,
            type: 'all',
            description: '',
            data: [],
            page: 0,
            perPage: 20,
            isVisited: false
        }
    }
    componentDidMount = async () => {
        this.props.listPromotions({ page: Number(this.state.page) + 1, perPage: this.state.perPage }, this.props.history)
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.promotions !== this.props.promotions) {
            let temp = []
            this.props.promotions.map((val, i) => {
                temp.push([`${textCapitalize(val.user_type)}`, val.description, moment(val.createdAt).calendar()])
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
        this.props.listPromotions(data, this.props.history)
        this.setState({ page })

    };

    handleClick = () => {
        this.setState({ open: true })
    }

    handleRequestClose = () => {
        this.setState({ open: false, type: 'all', description: '', isVisited: false })
    }
    deleteAstro = async () => {
        if (!required(this.state.description) && this.state.isVisited) {
            this.setState({ loading: true })
            this.handleRequestClose()
            let data = await Axios.axiosHelperFunc('post', 'admin/addPromotion', { description: this.state.description, user_type: this.state.type })
            if (data.data && data.data.error == false) {
                this.props.addEditAstrolgerSuccess(data.data.title)
                this.props.listPromotions({}, this.props.history)

            } else if (data.data && data.error == true) {
                this.props.apiFailed(data.data.title)
                this.props.listPromotions({ page: Number(Number(this.state.page)) + 1, perPage: this.state.perPage }, this.props.history)
            }
            this.setState({ loading: false })
        } else {
            this.handleFocus()
        }

    }
    handleChange = (e, key) => {
        this.setState({ [key]: e.target.value })
    }
    handleFocus = () => {
        this.setState({ isVisited: true })
    }
    getData = () => {
        return (
            <Row>
                <Col className='col-12'>
                    <FormGroup>
                        <Label>Select User Type</Label>
                        <Input className='form-control form-control-lg' type={'select'} onChange={(e) => this.handleChange(e, 'type')} value={this.state.type}>
                            <option key={1} value={'all'}>All</option>
                            <option key={2} value={'astrologer'}>Astrologer</option>
                            <option key={3} value={'consumer'}>Consumer</option>
                        </Input>
                    </FormGroup>

                </Col>
                <Col className='col-12'>
                    <FormGroup>
                        <Label>Message</Label>
                        <Input onFocus={this.handleFocus} invalid={(required(this.state.description) ? true : false) && this.state.isVisited} className='form-control form-control-lg' type={'textarea'} onChange={(e) => this.handleChange(e, 'description')} value={this.state.description} />
                        <FormFeedback>{required(this.state.description)}</FormFeedback>
                    </FormGroup>

                </Col>
            </Row>
        )
    }
    render() {
        let { classes, Promotions, total_count } = this.props;
        console.log('Promotions====', total_count)
        const options = {
            filterType: 'dropdown',
            responsive: 'scroll',
            viewColumns: false,
            selectableRows: false,
            // resizableColumns:true,
            count: this.props.total_count,
            page: Number(this.state.page),
            perPage: this.state.perPage,
            rowsPerPage: this.state.perPage,
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
            pagination: true,
            onTableChange: (action, tableState) => {
                console.log('action=', action, tableState)
                switch (action) {
                    case 'changePage':
                        this.changePage(tableState.page);
                        break;

                }
            },
        }
        let columns = ["User Type", "Message", "Date"]
        let { data } = this.state
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">

                {this.props.loading || this.state.loading ? <DataLoader /> : <MUIDataTable
                    title=''
                    data={data}
                    columns={columns}
                    options={options}
                />}
                <DialogAlert open={this.state.open} handleClose={this.handleRequestClose} handleYes={this.deleteAstro} title={`Add Promotion`} description={this.getData()} />
            </div>
        );
    }
}

Promotions.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { promotions, loading, total_count } = auth
    return { promotions, loading, total_count }
}
export default connect(mapStateToProps, { listPromotions, addEditAstrolgerSuccess, apiFailed })(withStyles(styles)(Promotions))