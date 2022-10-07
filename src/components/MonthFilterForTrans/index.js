import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import AppConfig from 'constants/config'
import { Button } from '@material-ui/core';
import { textCapitalize } from 'util/helper'
import { Row, Col, Input, Label, FormGroup } from 'reactstrap';

const MonthYear1 = ({ open, anchorEl = true, handleClose, handleChange, handleApply, month, year, astrologer, type, searchText, astroData, handleClosePop, handleResetFilter }) => {
    let years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
    let typeArr = ['chat', 'report', 'audio', 'video', 'product', 'service', 'wallet', 'tip', 'deposit', 'settlement'];
    console.log('asdagsrgs', astrologer, type, searchText)
    return <Popover
        id={'simple-popover'}
        open={open ? true : false}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}

    >
        <div className='p-4' style={{ minWidth: 400 }}>
            <Row>
                <Col sm={12} xs={12} md={12} lg={12} xl={12}>
                    <FormGroup>
                        <Label>Search</Label>
                        <Input type='text' value={searchText} onChange={(e) => handleChange(e, 'searchText')} placeholder="Search"/>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6} xs={6} md={6} lg={6} xl={6}>
                    <FormGroup>
                        <Label>Astrologer</Label>
                        <Input type='select' value={astrologer} onChange={(e) => handleChange(e, 'tempAstrologer')}>
                            <option value="" >Select Astrologer</option>
                            {
                                astroData && astroData.map((val, i) => <option value={val._id} key={val._id}>{textCapitalize(val.first_name)}</option>)
                            }
                        </Input>
                    </FormGroup>
                </Col>
                <Col sm={6} xs={6} md={6} lg={6} xl={6}>
                    <FormGroup>
                        <Label>Type</Label>
                        <Input type='select' value={type} onChange={(e) => handleChange(e, 'tempType')}>
                            <option value="" >Select Type</option>
                            {
                                typeArr.map((val, i) => <option value={val} key={val}>{textCapitalize(val)}</option>)
                            }
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6} xs={6} md={6} lg={6} xl={6}>
                    <FormGroup>
                        <Label>Month</Label>
                        <Input type='select' value={month} onChange={(e) => handleChange(e, 'tempMonth')}>
                            {
                                AppConfig.months.map((val, i) => <option value={i} key={val}>{val}</option>)
                            }
                        </Input>
                    </FormGroup>
                </Col>
                <Col sm={6} xs={6} md={6} lg={6} xl={6}>
                    <FormGroup>
                        <Label>Year</Label>
                        <Input type='select' value={year} onChange={(e) => handleChange(e, 'tempYear')}>
                            {
                                years.map((val, i) => <option value={val} key={val}>{val}</option>)
                            }
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <div>
                <Button onClick={handleResetFilter} className='jr jr-btn jr-btn-lg' color='secondary' variant='contained'>Reset</Button>
                <Button onClick={handleApply} className='jr jr-btn jr-btn-lg' color='primary' variant='contained'>Apply</Button>
            </div>

            
        </div>
    </Popover>
}

export default MonthYear1