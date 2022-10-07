import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from 'react-redux'
import { getastrologerList } from 'actions/auth'

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
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

let id = 0;



class CustomizedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static getDerivedStateFromProps(props, state) {
        console.log('cdm')
        // props.getastrologerList({})
    }
    render() {
        const { classes } = this.props;
        const data = []
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Name</CustomTableCell>
                            <CustomTableCell align="right">Chat Sessions</CustomTableCell>
                            <CustomTableCell align="right">Audio Calls</CustomTableCell>
                            <CustomTableCell align="right">Overall Rating</CustomTableCell>
                            <CustomTableCell align="right">Actions</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(n => {
                            return (
                                <TableRow className={classes.row} key={n.id}>
                                    <CustomTableCell>{n.name}</CustomTableCell>
                                    <CustomTableCell align="right">{n.calories}</CustomTableCell>
                                    <CustomTableCell align="right">{n.fat}</CustomTableCell>
                                    <CustomTableCell align="right">{n.carbs}</CustomTableCell>
                                    <CustomTableCell align="right">{n.protein}</CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}


CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth }) => {
    let { astrolgers } = auth
    return { astrolgers }
}
export default connect(mapStateToProps, { getastrologerList })(withStyles(styles)(CustomizedTable))
