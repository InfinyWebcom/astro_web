import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AppConfig from 'constants/config'
import helperFunction from 'constants/helperFunction'

const FeedCell = ({ feed }) => {

    const { id, name, username, count, image, isSocial, service, diff, rgbColor } = feed;

    return (
        <div className='user-profile-border'>
            <div key={id} className={`media user-profile  ${service ? diff > 2 ? 'borderWarningLeft' : 'borderDangerLeft' : ''}`}>

                <Avatar
                    alt={name}
                    style={{ background: !image ? '#d90368' : '' }}

                    src={`${AppConfig.imageUrl}${image}_small.jpg`}
                    className="user-avatar"
                />

                <div className='d-md-none'>
                    <div className="media-body align-self-center lineHeight">
                        <h5 className="mb-0 jr-fs-13">{name}</h5>
                        <span className="meta-date-light jr-fs-sm">{username}</span>
                    </div>
                    <div className="ml-1 d-none d-md-block jr-fs-sm align-self-center">
                        <h5>{count} calls</h5>
                    </div>
                    <div className="ml-1 media-body align-self-center d-md-none align-self-center">
                    <h5>{count} calls</h5>
                    </div>
                </div>

                <div className="media-body d-none d-md-block align-self-center lineHeight">
                    <h5 className="mb-0 jr-fs-13">{name}</h5>
                    <span className="meta-date-light jr-fs-sm">{username} </span>
                </div>

                <div className="ml-1 d-none d-md-block jr-fs-sm align-self-center">
                <h5>{count} calls</h5>
                </div>

            </div>
        </div>

    );
};

export default FeedCell;
