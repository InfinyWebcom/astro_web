import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar'
import { useDispatch } from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IntlMessages from 'util/IntlMessages';

const UserInfo = (props) => {

  const dispatch = useDispatch();

  const [anchorE1, setAnchorE1] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = event => {
    setOpen(true);
    setAnchorE1(event.currentTarget);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('token')
    props.history.push('/signin')
  }
  return (
    <div className="user-profile d-flex flex-row align-items-center">

      <Avatar
        alt='Astro Wize'
        style={{ background: '#d90368' }}
        className="user-avatar"
        src=''
      >
        A
        </Avatar>
      <div className="user-detail">
        <h4 className="user-name d-flex" onClick={handleClick}><span className='text-truncate'>Admin</span> <i
          className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
        </h4>
      </div>
      <Menu className="user-info"
        id="simple-menu"
        anchorEl={anchorE1}
        open={open}
        onClose={handleRequestClose}
        PaperProps={{
          style: {
            minWidth: 120,
            paddingTop: 0,
            paddingBottom: 0
          }
        }}
      >

        <MenuItem onClick={() => handleLogout()}>
          <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />

          <IntlMessages id="popup.logout" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfo;


