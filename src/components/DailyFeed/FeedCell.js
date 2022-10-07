import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AppConfig from 'constants/config'
import helperFunction from 'constants/helperFunction'

const FeedCell = ({ feed }) => {
    const { id, desc, time, action, image, isSocial, service, diff, rgbColor } = feed;
    console.log('helperFunction===============', helperFunction.getGradient(rgbColor), image, desc)
    return (
        <div className='user-profile-border'>
            <div key={id} className={`media user-profile  ${service ? diff > 2 ? 'borderWarningLeft' : 'borderDangerLeft' : ''}`}>
                <Avatar
                    alt={desc}
                    style={{ background: !image ? '#d90368' : '' }}

                    src={`${AppConfig.imageUrl}${image}_small.jpg`}
                    className="user-avatar"
                />
                <div className='d-md-none'>
                    <div className="media-body align-self-center lineHeight">
                        <h5 className="mb-0 jr-fs-13">{desc}</h5>
                        <span className="meta-date-light jr-fs-sm">{time} </span>
                        {isSocial &&
                            <div className="mt-2 btn-group-mins">
                                <span className="btn jr-btn-xs btn-primary jr-link"><i
                                    className="zmdi zmdi-thumb-up mr-1" />&nbsp;Like</span>
                                <span className="btn jr-btn-xs btn-info jr-link"><i
                                    className="zmdi zmdi-share mr-1" />&nbsp;Share</span>
                            </div>
                        }
                    </div>
                    <div className="ml-1 d-none d-md-block text-blue-grey text-lighten-2 jr-fs-sm align-self-center">{action}</div>
                    <div className="ml-1 media-body align-self-center  d-md-none text-blue-grey text-lighten-2  align-self-center">{action}</div>

                </div>
                <div className="media-body d-none d-md-block align-self-center lineHeight">
                    <h5 className="mb-0 jr-fs-13">{desc}</h5>
                    <span className="meta-date-light jr-fs-sm">{time} </span>
                    {isSocial &&
                        <div className="mt-2 btn-group-mins">
                            <span className="btn jr-btn-xs btn-primary jr-link"><i
                                className="zmdi zmdi-thumb-up mr-1" />&nbsp;Like</span>
                            <span className="btn jr-btn-xs btn-info jr-link"><i
                                className="zmdi zmdi-share mr-1" />&nbsp;Share</span>
                        </div>
                    }
                </div>
                <div className="ml-1 d-none d-md-block text-blue-grey text-lighten-2 jr-fs-sm align-self-center">{action}</div>
            </div>
        </div>

    );
};

export default FeedCell;
