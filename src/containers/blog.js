import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Axios from 'util/axiosRequest'
import AppConfig from 'constants/config'
import ContentLoader from 'react-content-loader'
import moment from 'moment'
import CustomScrollbars from 'util/CustomScrollbars';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            loading: false
        }
    }
    componentDidMount = async () => {
        this.setState({ loading: true })
        let data = await Axios.axiosHelperFunc('post', 'blog/find_by_id', { Id: this.props.match.params.id })
        if (data.data && data.data.error == false) {
            this.setState({ data: data.data.data })
        }
        this.setState({ loading: true })
    }
    BlogItem = props => (
        <ContentLoader viewBox="0 0 500 280" height={280} width='100%' {...props}>
            <rect x="3" y="3" rx="10" ry="10" width="80%" height="180" />
            <rect x="6" y="190" rx="0" ry="0" width="75%" height="20" />
            <rect x="4" y="215" rx="0" ry="0" width="75%" height="20" />
            <rect x="4" y="242" rx="0" ry="0" width="75%" height="20" />
        </ContentLoader>
    )
    render() {
        const { data, loading } = this.state
        console.log('dartaaa', data)
        return (
            <React.Fragment>
                <CustomScrollbars className="module-list-scroll scrollbar" autoHeightMin={`calc(100vh - 120px)`} style={{ backgroundColor: 'white' }}>
                    <div className="whiteBackground" style={{ overflowX: 'hidden', wordWrap: 'break-word' }}>

                        <Row>
                            <Col sm={12} xs={12} md={12} lg={12} xl={12}>
                                <Row className='mx-auto justify-content-center w-100'>
                                    <Col sm={12} xs={12} md={12} lg={12} xl={12} className=''>
                                        <h2 className='font-weight-bold mt-3'>{data.name}</h2>
                                        <h5 className='mb-3 text-primary'>{moment(data.createdAt).format('ll')}</h5>
                                        <div className='w-100 mb-5' style={{ backgroundImage: `url(${AppConfig.imageUrl}${data.image}_medium.jpg)`, height: '133px', borderRadius: '11px', backgroundSize: 'contain' }}></div>
                                        <div dangerouslySetInnerHTML={{ __html: data.content }} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>
                </CustomScrollbars>
            </React.Fragment>
        );
    }
}

export default Blog;