import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import AppConfig from 'constants/config'
import { FormGroup, Label, Input, Row, Col } from 'reactstrap'
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FilterListIcon from '@material-ui/icons/FilterList';

const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const date = new Date();

const MonthYearFilter = ({ handleApply, forOrdersPage }) => {

  const [popoverState, setPopoverState] = useState(null);
  
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [service, setService] = useState('Both');

  const handlePopOver = (event) => {
    setPopoverState(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setPopoverState(null);
  };

  const handleChangeMonthYearService = (e, type) => {
    if (type === 'month') {
      setMonth(e.target.value);
    } else if (type === 'year') {
      setYear(e.target.value);
    } else if (type === 'service') {
      setService(e.target.value)
    }
  }

  const handleApplyMonthYear = () => {
    handleApply(parseInt(month) + 1, year, service);
    setPopoverState(null);
  }

  const open = Boolean(popoverState);




  return (
    <>
      <FilterListIcon onClick={handlePopOver} />
      <Box>
        <Popover
          id={'simple-popover'}
          open={open}
          anchorEl={popoverState}
          onClose={handlePopOverClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}>

          <div className='p-4' style={{ minWidth: 400 }}>

            <Row>
              <Col sm={12} xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label>Month</Label>
                  <Input type='select' value={month} onChange={(e) => handleChangeMonthYearService(e, 'month')}>
                    {
                      AppConfig.months.map((val, i) => <option value={i} key={val}>{val}</option>)
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} xs={12} md={6} lg={6} xl={6}>
                <FormGroup>
                  <Label>Year</Label>
                  <Input type='select' value={year} onChange={(e) => handleChangeMonthYearService(e, 'year')}>
                    {
                      years.map((val, i) => <option value={val} key={val}>{val}</option>)
                    }
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              {forOrdersPage &&
                <Col>
                  <FormGroup>
                    <Label>Service</Label>
                    <Input type='select' value={service} onChange={(e) => handleChangeMonthYearService(e, 'service')}>
                      <option value={'both'}>Both</option>
                      <option value={'dm'}>Direct Message</option>
                      <option value={'video'}>Recorded Video</option>
                    </Input>
                  </FormGroup>
                </Col>}
            </Row>

            <Row>
              <Col>
                <Button onClick={handlePopOverClose} className='mr-3' variant='outlined'>Close</Button>
                <Button onClick={handleApplyMonthYear} color='primary' variant='contained'>Apply</Button>
              </Col>
            </Row>


          </div >


        </Popover>
      </Box>
    </>
  )
}

export default MonthYearFilter