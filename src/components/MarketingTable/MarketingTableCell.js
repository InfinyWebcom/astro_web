import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AppConfig from 'constants/config'
import { textCapitalize } from 'util/helper'
import { withRouter } from 'react-router-dom'

const getUserDetail = (data) => {
    let temp = `Audio:${data.audioCount}, Video:${data.videoCount}, Chat:${data.chatCount}, Report: ${data.reportCount}`
    return temp
}

const MarketingTableCell = ({ data, desc2, subCaption, history }) => {
    const { id, name, desc, icon, color, budget, growth, image_url, total_count, total_amount, astrologer_id, commision } = data;
    const iconName = commision > 0 ? "up" : "down";
    const statusStyle = commision > 0 ? " text-success" : "text-danger";
    return (
        <tr
            tabIndex={-1}
            key={id}
        >
            <td>
                <div className="user-profile py-2 d-flex flex-row align-items-center">
                    <Avatar className={`size-40 align-self-start mr-3 ${color}`} src={`${AppConfig.imageUrl}${astrologer_id ? astrologer_id.profile_url : image_url}_small.jpg`} />

                    <div className="user-detail">
                        <h5 className="user-name" onClick={() => astrologer_id ? history.push(`/admin/astrologer/details/${astrologer_id._id}`) : ''}>{astrologer_id ? textCapitalize(astrologer_id.first_name) : name} </h5>
                        <span className="text-light-grey jr-fs-sm">{astrologer_id ? '' : `${total_count} ${total_count > 1 ? 'times' : 'time'} `}</span>
                    </div>
                </div>
            </td>
            <td>
                <h5 className="mb-0">₹{Number(total_amount).toFixed(2)}</h5>
                <span className="text-light-grey jr-fs-sm">Earned</span>
            </td>
            {subCaption && <td className="text-right">
                <div className={`${statusStyle}`}>
                    <i className={`zmdi zmdi-trending-${iconName}`} /> {commision ? Number(commision).toFixed(2) : 0}</div>
                <div className="text-light-grey jr-fs-sm text-capitalize">{subCaption}</div>
            </td>}
        </tr>

    );
};

export default withRouter(MarketingTableCell);
