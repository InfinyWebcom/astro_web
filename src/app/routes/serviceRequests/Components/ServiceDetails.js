import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import { Col, Row } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import moment from 'moment'
import { Chip } from '@material-ui/core';
import AppConfig from 'constants/config'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontFamily: 'Morebi Rounded',
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));

const ViewBooking = ({ selectedData, viewServiceDialog, handleView }) => {

  const classes = useStyles();

  return (
    <Dialog onClose={handleView} open={viewServiceDialog} className={classes.dialogRoot} fullWidth={true} maxWidth={'sm'}>

      <DialogTitle>
        Service Details
      </DialogTitle>

      <DialogContent dividers>

        <DialogContentText>
          <Row className='mt-2'>
            <Col xs={6} sm={6} md={6} xl={6} lg={6}>
              <b>Name:</b> {selectedData?.consumer_id?.first_name}
            </Col>
          {/* </Row> */}
          {/* <Row className='mt-2'> */}
            <Col xs={6} sm={6} md={6} xl={6} lg={6}>
              <b>Phone:</b> {selectedData?.consumer_id?.mobile}
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col xs={6} sm={6} md={6} xl={6} lg={6}>
              <b>Block No.:</b> {selectedData?.user_address?.block_number}
            </Col>
          {/* </Row>
          <Row className='mt-2'> */}
            <Col xs={6} sm={6} md={6} xl={6} lg={6}>
              <b>Building Name:</b> {selectedData?.user_address?.building_name}
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col xs={6} sm={6} md={6} xl={6} lg={6}>
              <b>Street Address:</b> {selectedData?.user_address?.street_address}
            </Col>
          {/* </Row>
          <Row className='mt-2'> */}
            <Col xs={6} sm={6} md={6} xl={6} lg={6}>
              <b>Pincode:</b> {selectedData?.user_address?.pincode}
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col xs={6} sm={6} md={6} xl={6} lg={6}>
              <b>City:</b> {selectedData?.user_address?.user_city}
            </Col>
          {/* </Row>
          <Row className='mt-2'> */}
            <Col xs={6} sm={6} md={6} xl={6} lg={6}>
              <b>State:</b> {selectedData?.user_address?.user_state}
            </Col>
          </Row>
        </DialogContentText>

      </DialogContent>
      <DialogActions className='pr-4'>
        <Button onClick={handleView} color='secondary' variant='outlined'>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewBooking;