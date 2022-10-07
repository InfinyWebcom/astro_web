import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import Axios from 'util/axiosRequest'
import { Row, Col } from 'reactstrap';
import IconWithTextCard from 'components/IconWithTextCard'
import ChartCard from 'components/ChartCard'
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import Table from 'components/Settlement'
import MonthYearFilter from 'components/MonthYearFilter';
import moment from 'moment'
import { connect } from 'react-redux';
import { astroSettlements, getGraphdata, getUser } from 'actions/auth'
import AppConfig from 'constants/config'
import DataLoader from 'components/DataLoader'

const increamentData = [
    { name: 'Page A', pv: 200 },


];
class SetllementDetails extends Component {
    constructor(props) {
        super(props);
        let date = new Date()
        let url = props.location.search
        let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''

        this.state = {
            detailCards: '',
            page: json.page ? Number(json.page) : 0,
            perPage: 20,
            value: json.value ? Number(json.value) : 0,
            month: json.month ? Number(json.month) : date.getMonth(),
            year: json.year ? Number(json.year) : date.getFullYear(),
            tempMonth: json.tempMonth ? Number(json.month) : date.getMonth(),
            tempYear: json.tempYear ? Number(json.year) : date.getFullYear(),
        }
    }
    componentDidMount = async (noUser, month = this.state.month, year = this.state.year) => {
        console.log('Cdm=====', AppConfig.months[this.state.month])
        this.props.getGraphdata({ astrologer_id: this.props.match.params.id, month: Number(month) + 1, year: year }, this.props.history)
        this.props.getUser({ user_id: this.props.match.params.id }, this.props.history)


    }
    handleChangeState = (e, key) => {
        this.setState({ [key]: e.target.value })
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ tempMonth: this.state.month, tempYear: this.state.year, open: false })
    }
    handlePage = (page) => {
        this.setState({ page: page })
    }
    handleApply = () => {
        let noUser = true
        this.componentDidMount(noUser, this.state.tempMonth, this.state.tempYear)
        this.props.astroSettlements({ page: Number(this.state.page) + 1, astrologer_id: this.props.match.params.id, month: Number(this.state.tempMonth) + 1, year: this.state.tempYear }, this.props.history)
        this.setState({ month: this.state.tempMonth, year: this.state.tempYear, open: false, page: 0 })
    }
    render() {
        const { detailCards, astrolger } = this.state
        const { countData, monthlyData } = this.props
        console.log('this.props.match', this.props.match.params)
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">

                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Row>
                            <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                <ChartCard chartProperties={{
                                    title: 'Audio Call Earnings',
                                    prize: `₹ ${countData.audioAmount ? (countData.audioAmount) : 0}`,
                                    icon: 'stats',
                                    bgColor: 'indigo',

                                    desc: ' Audio Calls',
                                    percent: countData.audioCount ? ((Number(countData.audioCount)).toFixed(2)) : 0,
                                }}
                                    children={<ResponsiveContainer width="100%" height={75}>
                                        <AreaChart data={monthlyData}
                                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Area dataKey='pv' strokeWidth={0} stackId="2" stroke='#273894' fill="#273894"
                                                fillOpacity={1} />
                                        </AreaChart>
                                    </ResponsiveContainer>}
                                />
                            </Col>
                            <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                <ChartCard chartProperties={{
                                    title: 'Video Call Earnings',
                                    prize: `₹ ${countData.videoAmount ? ((Number(countData.videoAmount)).toFixed(2)) : 0}`,
                                    icon: 'stats',
                                    bgColor: 'pink accent-2',

                                    desc: ' Video Calls',
                                    percent: countData.videoCount ? (countData.videoCount) : 0,
                                }}
                                    children={<ResponsiveContainer width="100%" height={75}>
                                        <AreaChart data={monthlyData}
                                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Area dataKey='videoCount' type='monotone' strokeWidth={0} stackId="2" stroke='#da2361'
                                                fill='#da2361'
                                                fillOpacity={1} />
                                        </AreaChart>
                                    </ResponsiveContainer>}
                                />
                            </Col>
                            <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                <ChartCard chartProperties={{
                                    title: 'Chat Earnings',
                                    prize: `₹ ${countData.chatAmount ? ((Number(countData.chatAmount)).toFixed(2)) : 0}`,
                                    icon: 'stats',
                                    bgColor: 'info',

                                    desc: ' Chats',
                                    percent: countData.chatCount ? (countData.chatCount) : 0,
                                }}
                                    children={<ResponsiveContainer width="100%" height={75}>
                                        <AreaChart data={monthlyData}
                                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Area dataKey='chatCount' strokeWidth={0} stackId="2" stroke='#0c8e9f' fill='#0c8e9f'
                                                fillOpacity={1} />
                                        </AreaChart>
                                    </ResponsiveContainer>}
                                />
                            </Col>
                            <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                <ChartCard chartProperties={{
                                    title: 'Report Earnings',
                                    prize: `₹ ${countData.reportAmount ? ((Number(countData.reportAmount)).toFixed(2)) : 0}`,
                                    icon: 'stats',
                                    bgColor: 'success',

                                    desc: ' Reports',
                                    percent: countData.reportCount ? countData.reportCount : 0,
                                }}
                                    children={<ResponsiveContainer width="100%" height={75}>
                                        <AreaChart data={monthlyData}
                                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Area dataKey='reportCount' strokeWidth={0} stackId="2" stroke='#3a983e' fill='#3a983e'
                                                fillOpacity={1} />
                                        </AreaChart>
                                    </ResponsiveContainer>}
                                />
                            </Col>
                            <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                <ChartCard chartProperties={{
                                    title: 'Service Earnings',
                                    prize: `₹ ${countData.requestAmount ? (Number(countData.requestAmount).toFixed(2)) : 0}`,
                                    icon: 'stats',
                                    bgColor: 'warning',

                                    desc: ' Service',
                                    percent: countData.requestCount ? (countData.requestCount) : 0,
                                }}
                                    children={<ResponsiveContainer width="100%" height={75}>
                                        <AreaChart data={monthlyData}
                                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Area dataKey='requestCount' strokeWidth={0} stackId="2" stroke='#3a983e' fill='#fd7e14'
                                                fillOpacity={1} />
                                        </AreaChart>
                                    </ResponsiveContainer>}
                                />
                            </Col>
                            <Col sm={6} xs={12} md={2} lg={2} xl={2}>
                                <ChartCard chartProperties={{
                                    title: 'Total Earnings',
                                    prize: `₹ ${countData.total_amount ? (Number(countData.total_amount).toFixed(2)) : 0}`,
                                    icon: 'stats',
                                    bgColor: 'info',

                                    desc: ' Total',
                                    percent: countData.total_count ? (countData.total_count) : 0,
                                }}
                                    children={<ResponsiveContainer width="100%" height={75}>
                                        <AreaChart data={monthlyData}
                                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Area dataKey='total_count' strokeWidth={0} stackId="2" stroke='#3a983e' fill='#17a2b8'
                                                fillOpacity={1} />
                                        </AreaChart>
                                    </ResponsiveContainer>}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Table Id={this.props.match.params.id} page={Number(this.state.page)} handlePage={this.handlePage} month={this.state.month} year={this.state.year} />
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { loading, countData, monthlyData } = auth

    return { loading, countData, monthlyData }
}
export default connect(mapStateToProps, { astroSettlements, getGraphdata, getUser })(SetllementDetails)