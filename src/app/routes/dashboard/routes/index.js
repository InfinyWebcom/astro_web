import React, { Component } from 'react';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

import { connect } from 'react-redux'
import { getGraphdata, getTopSellingProduct, getTopSellingServices, getTopAstrolgers } from 'actions/auth'
import ContainerHeader from "components/ContainerHeader/index";
import { Row, Col } from 'reactstrap';
import ChartCard from "./ChartCard";
import NewService from './NewServiceRequests'
import NewOrder from './NewOrderRequest'
import CallStats from './CallStats'
import NewReport from './NewReoprtList'
import MarketingTable from 'components/MarketingTable'
import NewCallRequests from './NewCallRequests'
import { Cell, Pie, PieChart } from 'recharts';
import Box from '@material-ui/core/Box';
import Axios from 'util/axiosRequest'
import MonthYearFilter from '../../../../components/Filter';
import IconButton from '@material-ui/core/IconButton';

const increamentData = [
    { name: 'Page A', pv: 200 },
    { name: 'Page B', pv: 1200 },
    { name: 'Page C', pv: 600 },
    { name: 'Page D', pv: 1600 },
    { name: 'Page D', pv: 1000 },
    { name: 'Page H', pv: 2260 },
    { name: 'Page K', pv: 800 },
];

const bitcoin = [
    { month: 'Jan', price: 200 },
    { month: 'Feb', price: 300 },
    { month: 'Mar', price: 550 },
    { month: 'Apr', price: 500 },
    { month: 'May', price: 700 },
    { month: 'Jun', price: 450 },
    { month: 'Jul', price: 770 },
    { month: 'Aug', price: 900 },
];

const ripple = [
    { month: 'Jan', price: 1500 },
    { month: '', price: 400 },
    { month: 'Feb', price: 2000 },
    { month: 'Mar', price: 1200 },
    { month: 'Apr', price: 2200 },
    { month: 'May', price: 2600 },
    { month: 'Jun', price: 4300 },
    { month: 'July', price: 2900 },
    { month: 'Aug', price: 3800 },
    { month: 'Sep', price: 1500 },
];

const litCoin = [
    { month: 'Jan', price: 1500 },
    { month: '', price: 400 },
    { month: 'Feb', price: 2000 },
    { month: 'Mar', price: 1200 },
    { month: 'Apr', price: 2200 },
    { month: 'May', price: 2600 },
    { month: 'Jun', price: 4300 },
    { month: 'July', price: 2900 },
    { month: 'Aug', price: 3800 },
    { month: 'Sep', price: 1500 },
];

const etherium = [
    { month: 'Jan', price: 450 },
    { month: 'Feb', price: 300 },
    { month: 'Mar', price: 1350 },
    { month: 'Apr', price: 275 },
    { month: 'May', price: 500 },
    { month: 'Jun', price: 250 },
    { month: 'Jul', price: 900 },
    { month: 'Aug', price: 550 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userStats: [],
            callStats: [],
            consumerCalls: [],
            astrologerCalls: [],
        }
    }

    componentDidMount() {
        this.props.getGraphdata({})
        this.props.getTopSellingProduct({}, this.props.history)
        this.props.getTopSellingServices({}, this.props.history)
        this.props.getTopAstrolgers({}, this.props.history)
        this.getNewStats();
    }

    getNewStats = async () => {
        let res = await Axios.axiosHelperFunc('post', 'admin/getNewStats', '')
        console.log('getNewStats :', res);
        this.setState({
            userStats: res.data.userStats,
            callStats: res.data.callStats,
            consumerCalls: res.data.consumerCalls,
            astrologerCalls: res.data.astrologerCalls
        })
    }

    handleApplyMonthYearOne = async (month, year) => {

        let res = await Axios.axiosHelperFunc('post', 'admin/getNewStats', { month, year })
        console.log('getNewStats :', res);
        this.setState({
            userStats: res.data.userStats,
            // callStats: res.data.callStats,
            // consumerCalls: res.data.consumerCalls,
            // astrologerCalls: res.data.astrologerCalls
        })

    };

    handleApplyMonthYearTwo = async (month, year) => {

        let res = await Axios.axiosHelperFunc('post', 'admin/getNewStats', { month, year })
        console.log('getNewStats :', res);
        this.setState({
            // userStats: res.data.userStats,
            callStats: res.data.callStats,
            // consumerCalls: res.data.consumerCalls,
            // astrologerCalls: res.data.astrologerCalls
        })

    };

    render() {

        let { countData, monthlyData } = this.props
        let marketingData = [
            {
                id: 1,
                name: 'Facebook Ads',
                desc: '63 Likes, 387 Shares',
                icon: 'facebook',
                color: 'bg-indigo lighten-1',
                budget: 570,
                growth: 20
            },

            {
                id: 2,
                name: 'Twitter Ads',
                desc: '43 Likes, 545 Shares',
                icon: 'twitter',
                color: 'bg-light-blue accent-2',
                budget: 811,
                growth: -5
            },

            {
                id: 3,
                name: 'Instagram',
                desc: '83 Follows, 210 Likes',
                icon: 'instagram',
                color: 'bg-pink',
                budget: 685,
                growth: 20
            },

        ];

        const { userStats, callStats, consumerCalls, astrologerCalls } = this.state;

        console.log('count data', countData);

        return (
            <div className="dasboard animated slideInUpTiny animation-duration-3">

                <Row>

                    <Col sm={6} xs={12} md={3} lg={3} xl={3}>
                        <ChartCard
                            prize={countData.audioCount ? (countData.audioCount) : 0}
                            title={countData.audioPerc ? (countData.audioPerc) : 0}
                            icon="bitcoin"
                            children={
                                <ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%" height={75}>

                                    <AreaChart data={bitcoin} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6200EE" stopOpacity={1} />
                                                <stop offset="95%" stopColor="#B819D2" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <Area dataKey="price" strokeWidth={0} stackId="2" stroke="#6200EE" fill="url(#color3)" fillOpacity={1} />
                                    </AreaChart>

                                </ResponsiveContainer>}
                            styleName={countData.audioPerc && countData.audioPerc > 0 ? "up" : 'down'} desc="Audio calls this month" />
                    </Col>
                    <Col sm={6} xs={12} md={3} lg={3} xl={3}>
                        <ChartCard prize={countData.videoCount ? countData.videoCount : 0} title={countData.videoPerc ? countData.videoPerc : 0} icon="bitcoin"
                            children={
                                <ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%" height={75}>

                                    <AreaChart data={ripple} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>

                                        <defs>
                                            <linearGradient id="color12" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#F39711" stopOpacity={1} />
                                                <stop offset="95%" stopColor="#fff" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="price"
                                            type="monotone"
                                            strokeWidth={2}
                                            stackId="2"
                                            stroke="#F39711"
                                            fill="url(#color12)"
                                            fillOpacity={1}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>}
                            styleName={countData.videoPerc && countData.videoPerc > 0 ? "up" : 'down'} desc="Video calls this month" />
                    </Col>
                    <Col sm={6} xs={12} md={3} lg={3} xl={3}>
                        <ChartCard prize={countData.chatCount ? (countData.chatCount) : 0} title={countData.chatPerc ? (countData.chatPerc) : 0} icon="bitcoin"
                            children={
                                <ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%" height={75}>
                                    <AreaChart data={etherium} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#1ABBDE" stopOpacity={1} />
                                                <stop offset="95%" stopColor="#09BCA7" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            dataKey="price"
                                            type="monotone"
                                            strokeWidth={0}
                                            stackId="2"
                                            stroke="#1ABBDE"
                                            fill="url(#color5)"
                                            fillOpacity={1}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>}
                            styleName={countData.chatPerc && countData.chatPerc > 0 ? "up" : 'down'} desc="Chat sessions this month" />
                    </Col>
                    <Col sm={6} xs={12} md={3} lg={3} xl={3}>
                        <ChartCard prize={countData.reportCount ? (countData.reportCount) : 0} title={countData.reportPerc ? (countData.reportPerc) : 0} icon="bitcoin"
                            children={
                                <ResponsiveContainer className="card-img-bottom overflow-hidden" width="100%"
                                    height={75}>

                                    <AreaChart data={litCoin} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="color10" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#19A6D2" stopOpacity={1} />
                                                <stop offset="95%" stopColor="#fff" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="price" strokeWidth={2} stroke="#19A6D2" fill="url(#color10)" fillOpacity={1} />
                                    </AreaChart>

                                </ResponsiveContainer>}
                            styleName={countData.reportPerc && countData.reportPerc > 0 ? "up" : 'down'} desc="Reports for this month" />
                    </Col>

                </Row>

                <Row>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div className={'jr-card jr-full-card p-4'}>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                <span>
                                    <h3 className="card-heading d-inline-block">User Statistics</h3>
                                </span>
                                <span  style={{ marginTop: '-12px' }}>
                                    <IconButton>
                                        <MonthYearFilter
                                            handleApply={this.handleApplyMonthYearOne}
                                        />
                                    </IconButton>
                                </span>
                            </div>

                            <ResponsiveContainer width='100%' height={240}>
                                <PieChart>
                                    <Pie dataKey="value" data={userStats} labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#6200EE">
                                        {userStats.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <Box display='flex' alignItems='center' flexWrap='wrap' justifyContent='center'>
                                {userStats.map((item, index) => (
                                    <Box key={index} mr={2} mb={1} display='flex' alignItems='center'>
                                        <Box
                                            mr={2}
                                            component='span'
                                            style={{
                                                backgroundColor: item.color,
                                                height: 10,
                                                width: 10,
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <Box component='span' fontSize={14} color='text.secondary'>
                                            {item.name} ({item.value})
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </div>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div className={'jr-card jr-full-card p-4'}>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}>
                                <span>
                                    <h3 className="card-heading d-inline-block">Call Statistics</h3>
                                </span>
                                <span  style={{ marginTop: '-12px' }}>
                                    <IconButton>
                                        <MonthYearFilter
                                            handleApply={this.handleApplyMonthYearTwo}
                                        />
                                    </IconButton>
                                </span>
                            </div>

                            <ResponsiveContainer width='100%' height={240}>
                                <PieChart>
                                    <Pie dataKey="value" data={callStats} labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#6200EE">
                                        {callStats.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <Box display='flex' alignItems='center' flexWrap='wrap' justifyContent='center'>
                                {callStats.map((item, index) => (
                                    <Box key={index} mr={2} mb={1} display='flex' alignItems='center'>
                                        <Box
                                            mr={2}
                                            component='span'
                                            style={{
                                                backgroundColor: item.color,
                                                height: 10,
                                                width: 10,
                                                borderRadius: '50%',
                                            }}
                                        />
                                        <Box component='span' fontSize={14} color='text.secondary'>
                                            {item.name} ({item.value})
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </div>
                    </Col>

                </Row>

                <Row>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <CallStats userType={'Astrologers'} data={astrologerCalls ? astrologerCalls : []} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <CallStats userType={'Consumers'} data={consumerCalls ? consumerCalls : []} />
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} className="h-50 order-lg-2">
                        <div className="jr-card jr-full-card ">
                            <div className="jr-card-header d-flex align-items-center">
                                <h3 className="card-heading mb-0">Top Selling Services
                                </h3>

                            </div>
                            <MarketingTable data={this.props.topSellingServices} desc='purchased this service' service={true} subCaption='Commission' />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} className="h-50 col-12 order-lg-2">
                        <div className="jr-card jr-full-card ">
                            <div className="jr-card-header d-flex align-items-center">
                                <h3 className="card-heading mb-0">Top Selling Products
                                </h3>

                            </div>
                            <MarketingTable data={this.props.topSellingProducts} product={true} desc={'purchased this product'} />
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} xl={4} className="h-50 col-12 order-lg-2">
                        <div className="jr-card jr-full-card ">
                            <div className="jr-card-header d-flex align-items-center">
                                <h3 className="card-heading mb-0">Top Earning Astrologers
                                </h3>

                            </div>
                            <MarketingTable data={this.props.topAstrologers} subCaption='Commission' />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <NewService />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <NewOrder history={this.props.history} />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <NewReport />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        {/* <NewCallRequests /> */}
                    </Col>
                </Row>

            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    const { loading, countData, monthlyData, topSellingServices, topSellingProducts, topAstrologers } = auth

    return { loading, countData, monthlyData, topSellingServices, topSellingProducts, topAstrologers }
}

export default connect(mapStateToProps, { getGraphdata, getTopSellingProduct, getTopSellingServices, getTopAstrolgers })(Dashboard)