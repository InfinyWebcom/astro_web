import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import AppConfig from 'constants/config'
import { FormGroup, Label, Input, Row, Col } from 'reactstrap'
import { Button } from '@material-ui/core';


const MonthYear = ({ open, anchorEl = true, handleClose, handleChange, handleApply, month, year }) => {
    let years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    console.log('years==', years)
    return <Popover
        id={'simple-popover'}
        open={open ? true : false}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}

    >
        <Row className='p-4' style={{ minWidth: 400 }}>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                    <Label>Month</Label>
                    <Input type='select' value={month} onChange={(e) => handleChange(e, 'tempMonth')}>
                        {
                            AppConfig.months.map((val, i) => <option value={i} key={val}>{val}</option>)
                        }
                    </Input>
                </FormGroup>
            </Col>
            <Col sm={12} xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                    <Label>Year</Label>
                    <Input type='select' value={year} onChange={(e) => handleChange(e, 'tempYear')}>
                        {
                            years.map((val, i) => <option value={val} key={val}>{val}</option>)
                        }
                    </Input>
                </FormGroup>
            </Col>
            <Col>
                <Button onClick={handleClose} className='jr jr-btn jr-btn-lg' color='secondary' variant='contained'>Close</Button>
                <Button onClick={handleApply} className='jr jr-btn jr-btn-lg' color='primary' variant='contained'>Apply</Button>
            </Col>


        </Row>
    </Popover>
}

export default MonthYear