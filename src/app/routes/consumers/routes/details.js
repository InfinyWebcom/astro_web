import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import { Row, Col } from 'reactstrap'
import ProfileCard from 'components/profileCard'
import Activities from 'components/Activities'
import IconWithTextCard from 'components/IconWithTextCard'
import Axios from 'util/axiosRequest'

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailCards: [
                {
                    cardColor: 'success',
                    imageIcon: require('assets/images/dashboard/phone.png'),
                    title: 0,
                    subTitle: 'Audio Calls'
                }, {
                    cardColor: 'info',
                    imageIcon: require('assets/images/dashboard/video-camera.png'),
                    title: 0,
                    subTitle: 'Video Calls',
                    // disable: true
                }, {
                    cardColor: 'pink accent-2',
                    imageIcon: require('assets/images/dashboard/message.png'),
                    title: 0,
                    subTitle: 'Chats',
                    // disable: true
                }, {
                    cardColor: 'warning',
                    imageIcon: require('assets/images/dashboard/swastika.png'),
                    title: 0,
                    subTitle: 'Reports'
                },
            ],
            userType: props.match.url.includes('/admin/astrologer/details/') ? 'astrologer_id' : 'consumer_id'

        }
    }
    componentDidMount = async () => {
        let data = await Axios.axiosHelperFunc('post', 'admin/getConsultCount', { [this.state.userType]: this.props.match.params.id })
        if (data.data && data.data.error == false) {
            let { audioCount, chatCount, reportCount, videoCount } = data.data
            let temp = [...this.state.detailCards];
            temp[0].title = audioCount ? audioCount : 0;
            temp[1].title = videoCount ? videoCount : 0;
            temp[2].title = chatCount ? chatCount : 0;
            temp[3].title = reportCount ? reportCount : 0
            this.setState({ detailCards: temp })
        }
    }
    render() {
        const { detailCards } = this.state

        return (
            <div className="parent animated slideInUpTiny animation-duration-3">

                <Row>
                    <Col xs={12} sm={12} md={4} lg={3} xl={3}>
                        <ProfileCard styleName="pb-4" userType={this.state.userType} headerStyle="bg-gradient-primary" user_id={this.props.match.params.id} />
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={9} xl={9}>
                        <Row className=' row'>
                            {detailCards.map((data, index) => <div key={index} className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                                <IconWithTextCard data={data} />
                            </div>)
                            }
                        </Row>
                        <Row  >
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Activities user_id={this.props.match.params.id} userType={this.state.userType} />
                            </Col>
                        </Row>
                    </Col>

                </Row>

            </div>
        );
    }
}

export default Details;