import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AppConfig from 'constants/config'

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
const UserDetailCell = ({ data }) => {
    const { _id, name, detail, image, about, color, product_id, title, description, offerPrice, rate, quantity } = data;
    console.log('getColor===', getColor())
    return (
        <tr
            tabIndex={-1}
            key={_id}>
            <td className="border-bottom border-top-0 w-75">
                <div className="user-profile d-flex flex-row align-items-center">
                    <Avatar
                        src={product_id ? `${AppConfig.imageUrl}${product_id.image_url}.jpg` : ''} alt={product_id ? product_id.name : ''}
                        className="user-avatar mr-2"
                    />
                    <div className="user-detail">
                        <h5 className="user-name text-capitalize">{product_id ? product_id.name : ''}</h5>
                        <p className="user-description">{`${product_id ? product_id.description : ''}`}</p>
                    </div>
                </div>
            </td>
            <td className=" border-bottom border-top-0 ">
                <h5 className="user-name text-capitalize">{`x ${quantity}`}</h5>
            </td>


            <td className="text-right border-bottom border-top-0">
                <h5 className="user-name text-capitalize text-success font-weight-bold">{`₹ ${rate}`}</h5>
            </td>
        </tr>

    );
};

export default UserDetailCell;
