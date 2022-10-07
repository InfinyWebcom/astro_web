import React from 'react';
import Button from '@material-ui/core/Button';

const getColor = (status) => {
    switch (status) {
        case 'New':
            return 'primary'
        case 'Processed':
            return 'warning'
        case 'Delivered':
            return 'success'
        case 'Cancelled':
            return 'danger'
        default:
            return 'info'
    }
}
const ContactCard = ({ title, data = '' }) => {
    console.log('user card====', data)

    return (
        <div className="jr-card p-0 h-75 ">
            {title && <div className="jr-card-header card-img-top mb-0 p-4 bg-grey lighten-4">
                <h3 className="card-heading">Our Office</h3>
                <p className="sub-heading">
                    Fusce eget dolor id justo luctus commodo
                    vel pharetra nisi. Donec velit libero
        </p>
            </div>}

            <div className="card-body">
                {data ? <ul className="contact-list list-unstyled">
                    <li className="media">
                        {data.icon1 ? <i className={`zmdi ${data.icon1} zmdi-hc-fw zmdi-hc-lg text-primary align-self-center`} /> : <span className='align-self-center pr-2'>{`${data.title1}: `}</span>}
                        <span className="media-body">
                            {data.data1}
                        </span>
                    </li>
                    <li className="media">
                        {data.icon2 ? <i className={`zmdi ${data.icon2} zmdi-hc-fw zmdi-hc-lg text-primary align-self-center`} /> : <span className='align-self-center pr-2'>{`${data.title2}: `}</span>}
                        <span className="media-body">
                            {data.isProduct ? <span className={`jr-link badge text-white text-uppercase bg-${getColor(data.data2)}`}>{data.data2}</span>
                                : data.data2}
                        </span>
                    </li>
                    <li className="media">
                        {data.icon3 ? <i className={`zmdi ${data.icon3} zmdi-hc-fw zmdi-hc-lg text-primary align-self-center`} /> : <span className='align-self-center pr-2'>{`${data.title3}: `}</span>}
                        <span className="media-body">
                            {` ${data.data3}`}
                        </span>
                    </li>

                </ul> : <p>No data found</p>}


            </div>
        </div>
    );
};

export default ContactCard;
