import React, { Component } from 'react';
import Card from 'components/Card';
import { Row } from 'reactstrap';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const CustomTableCell = withStyles(theme => ({

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
        minWidth: 500
    },
    responsiveScroll: {
        overflowX: 'auto',
        overflow: 'auto',
        height: '100%',
        maxHeight: '310px',
    },
    responsiveScrollMaxHeight: {
        overflowX: 'auto',
        overflow: 'auto',
        height: '100%',
        maxHeight: '310px',
    },
    responsiveScrollFullHeight: {
        height: '100%',
        maxHeight: '310px',
    },
    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    }
});
class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { title, columns, data, classes } = this.props
        return (
            <div>
                <Card title={title}>
                    <Row className={classes.responsiveScroll}>
                        <Table className={classes.table} aria-label="customized table">
                            {columns.length > 0 && <TableHead>
                                <TableRow>
                                    {
                                        columns.map((val, i) => <CustomTableCell key={i}>{val}</CustomTableCell>)
                                    }

                                </TableRow>
                            </TableHead>}
                            <TableBody >
                                {data ? data.map((row, i) => (
                                    <TableRow key={i}>
                                        {
                                            row.map((val, j) => <CustomTableCell key={j} component="th" scope="row">
                                                {val}
                                            </CustomTableCell>)
                                        }

                                    </TableRow>
                                ))
                                    :
                                    <TableRow key={0}>
                                        <CustomTableCell align="right"><h3>No data found</h3></CustomTableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Row>

                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(TableComponent);