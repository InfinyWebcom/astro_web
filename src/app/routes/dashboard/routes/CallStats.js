import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Col, Row } from 'reactstrap';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import NewOrder from './NewOrderRequest'
import ListData from '../Components/DailyFeed'
import moment from 'moment'

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <Box
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={0}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    rightAlign: {
        marginLeft: 'auto',
        borderRadius: '5px',
    },
    tabs: {
        '& button': {
          minWidth: 70
        },
        marginLeft: 'auto',
        borderRadius: '5px',
      }
}));

export default function CallStats({ userType, data }) {

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let data100 = [];
    data && data.map(each => {
        if (each.count >= 100 && each.count < 200) {
            data100.push(
                {
                    name: each.user.first_name,
                    username: each.user.email,
                    count: each.count,
                    image: each.user.profile_url,
                    rgbColor: ''
                }
            )
        }
    })

    let data200 = [];

    data && data.map(each => {
        if (each.count >= 200 && each.count < 500) {
            data200.push(
                {
                    name: each.user.first_name,
                    username: each.user.email,
                    count: each.count,
                    image: each.user.profile_url,
                    rgbColor: ''
                }
            )
        }
    })

    let data500 = [];

    data && data.map(each => {
        if (each.count >= 500) {
            data500.push(
                {
                    name: each.user.first_name,
                    username: each.user.email,
                    count: each.count,
                    image: each.user.profile_url,
                    rgbColor: ''
                }
            )
        }
    })

    return (
        <div className='jr-card p-0' style={{ borderRadius: '5px' }}>

            <AppBar position='static' color='default' elevation={0} className={classes.rightAlign}>
                <Tabs
                    indicatorColor='primary'
                    textColor='#ff0101'
                    value={value} onChange={handleChange} className={classes.tabs}>
                    <Tab label='100+' {...a11yProps(0)} />
                    <Tab label='200+' {...a11yProps(1)} />
                    <Tab label='500+' {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <ListData dailyFeedData={data100} title={userType + ' with 100 - 200 Calls'} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <ListData dailyFeedData={data200} title={userType + ' with 200 - 500 Calls'} />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <ListData dailyFeedData={data500} title={userType + ' with 500+ Calls'} />
            </TabPanel>

        </div>
    );
}
