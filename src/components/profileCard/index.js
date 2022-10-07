import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Axios from 'util/axiosRequest'
import { connect } from 'react-redux'
import { apiFailed, addEditAstrolgerSuccess } from 'actions/auth'
import DialogAlert from 'components/Dialog'
import { textCapitalize } from 'util/helper'
import AppConfig from 'constants/config'
import moment from 'moment';

class UserProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    componentDidMount = async () => {
        console.log('profileCard', 58745)
        let data = await Axios.axiosHelperFunc('post', 'admin/getUserDetails', { user_id: this.props.user_id })
        if (data.data && data.data.error == false) {
            this.setState({ user: data.data.data })
        }

    }
    handleRequestClose = () => {
        this.setState({ openAlert: false })
    }
    buttonB = (data) => {
        this.setState({ openAlert: true, user_id: this.state.user._id, message: this.state.user.is_blocked ? 'Unblock' : 'Block', })
    }
    blockUnblock = async () => {

        let data = await Axios.axiosHelperFunc('post', 'admin/blockUser', { user_id: this.state.user_id })
        if (data.data && data.data.error == false) {
            this.props.addEditAstrolgerSuccess(data.data.title)
            this.componentDidMount()
            this.handleRequestClose()
        } else if (data.data && data.error == true) {
            this.props.apiFailed(data.data.title)
            // this.props.listConsumers({ page: Number(this.state.page) + 1,  }, this.props.history)
        }


    }
    render() {
        let { headerStyle } = this.props
        let { user } = this.state
        let { user_address } = user
        return (
            <div className="jr-card text-center">
                <div className={`jr-card-header-color ${headerStyle}`}>

                    <img className="rounded-circle size-90 avatar-shadow mb-3 mt-3"
                        src={user.profile_url ? `${AppConfig.imageUrl}${user.profile_url}_small.jpg` : "https://via.placeholder.com/150x150"} alt="Team Member" />

                    <div className="jr-card-hd-content">
                        <h5 className="mb-0 text-white text-capitalize">{user.first_name ? textCapitalize(user.first_name) : 'N/A'}</h5>
                        {user.astro_sign && <p className="jr-fs-sm mb-0 text-grey text-lighten-2">{user.astro_sign ? textCapitalize(user.astro_sign.name) : "N/A"}</p>}
                    </div>
                    {this.props.userType == 'consumer_id' && <Fab onClick={this.buttonB} className={`jr-badge-up bg-${user.is_blocked ? 'success' : 'danger'}`}><i className={`zmdi ${user.is_blocked ? 'zmdi-lock-open' : 'zmdi-lock-outline'}`} /></Fab>}
                </div>
                <div className="jr-card-body pt-2">
                    {user.date_of_birth && <p className="card-text"><i className="zmdi zmdi zmdi-cake zmdi-hc-fw zmdi-hc-sm  align-self-center" /> {moment(user.date_of_birth).format('lll')}</p>}
                    <p className="card-text"><i className="zmdi zmdi-phone zmdi-hc-fw zmdi-hc-sm  align-self-center" /> {user.mobile ? user.mobile : 'N/A'}</p>

                    {user_address &&
                        <p className="card-text">
                            <i className="zmdi zmdi-pin zmdi-hc-fw zmdi-hc-sm  align-self-center" />
                            {
                            user_address.block_number || user_address.building_name || user_address.street_address || user_address.user_city || user_address.pincode || user_address.user_state  ? `${user_address.block_number}, ${user_address.building_name}, ${user_address.street_address}, ${user_address.user_city}-${user_address.pincode}, ${user_address.user_state}` : 'N/A'
                            } 
                       </p>}
                    {user.birth_place && <p className="card-text"><i className="zmdi zmdi-pin zmdi-hc-fw zmdi-hc-sm  align-self-center" /> {user.birth_place}</p>}
                </div>
                <DialogAlert open={this.state.openAlert} handleClose={this.handleRequestClose} handleYes={this.blockUnblock} title={`${this.state.message} Consumer`} description={`Are you sure you want to ${this.state.message == 'Block' ? 'block' : 'unblock'} this consumer?`} />
            </div>
        )
    }
}

export default connect(null, { addEditAstrolgerSuccess, apiFailed })(UserProfileCard)

