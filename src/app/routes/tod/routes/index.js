import React, { Component } from 'react';
import ContainerHeader from "components/ContainerHeader/index";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import CardBox from 'components/CardBox'
import { connect } from 'react-redux'
import { listTotd } from 'actions/auth'
const localizer = momentLocalizer(moment)
class List extends Component {
    constructor(props) {
        super(props);
        let url = props.location.search
        let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''
        let date = new Date()
        console.log('TOD props', date.getMonth())
        this.state = {
            myEventsList: [],
            month: json ? json.month : date.getMonth(),
            year: json ? json.year : date.getFullYear()
        }
    }
    openEvent = (data) => {
        const { start, end } = data
        if (moment(start).format('YYYY-MM-DD') >= moment().add(1, 'days').format('YYYY-MM-DD')) {
            this.props.history.push(`/admin/tod/addTip/${moment(start).format('YYYY-MM-DD')}`)
        }

    }
    componentDidMount() {
        let date = new Date()
        let month = date.getMonth();
        let year = date.getFullYear()
        this.props.listTotd({ month: month, year }, this.props.history)
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.totdList !== this.props.totdList) {
            let myEventsList = []
            this.props.totdList.map((val) => {
                let count = [].concat(...val.tip).filter(val => val.description).length
                if (count > 0) {
                    myEventsList.push({
                        title: `Tip added ${count}/12`,
                        start: moment(val.tip_date).format('YYYY-MM-DD'),
                        end: moment(val.tip_date).format('YYYY-MM-DD')
                    })
                }

            })
            let days = new Date(this.state.year, Number(this.state.month) + 1, 0).getDate();
            for (let i = 1; i <= days; i++) {
                if (new Date() < new Date(`${this.state.year}-${Number(this.state.month) + 1}-${i}`))
                    myEventsList.push({
                        title: <div className='noBackGround'><i className='zmdi zmdi-plus-circle'></i> Add</div>,
                        start: moment(`${this.state.year}-${Number(this.state.month) + 1}-${i}`).format('YYYY-MM-DD'),
                        end: moment(`${this.state.year}-${Number(this.state.month) + 1}-${i}`).format('YYYY-MM-DD')
                    })
            }
            this.setState({ myEventsList: myEventsList })
        }
    }
    handleView = (viewInfo) => {
        console.log('viewInfo', viewInfo)
        let date = new Date(viewInfo)
        let month = date.getMonth();
        let year = date.getFullYear()

        this.props.listTotd({ month, year }, this.props.history)
        this.setState({ month: month, year })

    }
    render() {
        let { myEventsList } = this.state
        return (
            <div className="parent animated slideInUpTiny animation-duration-3">

                <CardBox styleName="col-12" heading={''}
                    headerOutside>
                    <div>
                        <Calendar
                            min={moment().add(1, 'days').format('YYYY-MM-DD')}
                            popup
                            localizer={localizer}
                            events={myEventsList}
                            selectable={true}
                            allDayAccessor={true}
                            startAccessor="start"
                            endAccessor="end"
                            view='month'
                            defaultView='month'
                            views={['month']}
                            onSelecting={slotInfo => this.openEvent(slotInfo)}
                            onSelectEvent={slotInfo => this.openEvent(slotInfo)}
                            onSelectSlot={slotInfo => this.openEvent(slotInfo)}
                            onNavigate={viewInfo => this.handleView(viewInfo)}
                        // getNow={viewInfo => this.handleView(viewInfo)}
                        />
                    </div>
                </CardBox>
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    let { totdList } = auth
    return { totdList }
}
export default connect(mapStateToProps, { listTotd })(List)
