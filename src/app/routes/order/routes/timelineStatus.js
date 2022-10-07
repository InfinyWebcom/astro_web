import React from 'react';
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar';
const WithIconTimeLineItem = ({ styleName, color, timeLine, children }) => {
    const { date, status, description } = timeLine;
    return (
        <div className="media social-list-line">
            <Avatar className={`${color} z-index-20 size-40 align-item-self mr-3`}>
                {children}
            </Avatar>
            <div className="media-body">
                <h5 className="mb-1"
                    style={{
                        color: color == 'bg-primary' ? '#361e86' : 
                        color == 'bg-danger'  ? '#dc3545' : 
                        color == 'bg-info'    ? '#17a2b8' : 
                        color == 'bg-warning' ? '#ffc107' : 
                        color == 'ng-success' ? '#28a745' : ''
                    }}
                > {status === "New" ?
                    "Placed"
                    :
                    status
                    }</h5>
                <p className="mb-0">{description}</p>
                <span className="meta-date meta-date-light">{moment(date).format('DD MMM, YYYY')}</span>
            </div>
        </div>

    )
};
export default WithIconTimeLineItem;