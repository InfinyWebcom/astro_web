import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from 'components/Card';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        overflow: 'auto',
        height: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

const ExpansionComponent = (props) => {
    const { classes, data } = props;
    console.log('expansion panel', data)
    return (
        <Card>
            <div className={classes.root}>
                {
                    data.length > 0 ? data.map((val, i) => <>
                        <ExpansionPanel key={i} defaultExpanded={val.name.includes('Open Transactions')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <div className='w-100 row'>
                                    <div className=' col-sm-12 col-xs-12 col-md-9 col-lg-9 col-xl-9'>
                                        <h4>{val.name} </h4>
                                    </div>
                                    <div className='  justify-content-end col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 d-none d-sm-block'>

                                        <div className='d-flex justify-content-end'>
                                            {val.button}
                                        </div>


                                    </div>
                                    <div className='d-sm-none justify-content-end col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                                        <div className=''>
                                            {val.button}
                                        </div>

                                    </div>
                                </div>
                            </ExpansionPanelSummary>

                            {
                                val.subData.length > 0 ? val.subData.map((value, index) => <ExpansionPanelDetails key={index}> {value}</ExpansionPanelDetails>)
                                    :
                                    <div className='d-flex justify-content-center'><h3>No records found</h3></div>
                            }

                        </ExpansionPanel></>)
                        : <div className='d-flex justify-content-center'><h3>No records found</h3></div>
                }
            </div>
        </Card>
    );
}

ExpansionComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpansionComponent);