import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { COLLAPSED_DRAWER, FIXED_DRAWER } from "constants/ActionTypes";
import MailNotification from "../../../../components/MailNotification";
import AppNotification from "../../../../components/AppNotification";
import CardHeader from "components/CardHeader/index";
import Button from '@material-ui/core/Button';
import { toggleCollapsedNav } from "actions/Setting";
import { listOrder, addPromotions, getUser, apiFailed, addEditAstrolgerSuccess, getOrderDetailsId } from 'actions/auth'
import AppConfig from 'constants/config'
import MonthYearFilter from 'components/MonthYearFilter'
import MonthYearFilter1 from 'components/MonthFilterForTrans'
import IntlMessages from "util/IntlMessages";
import { Row, Col, Input, FormFeedback, Label, FormGroup, InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import DialogAlert from 'components/Dialog'
import Axios from 'util/axiosRequest'
import { required } from 'constants/validations'
import AddReferals from 'components/AddReferals'
import ProcessOrder from 'components/ProcessOrder'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  MuiButtonOutlinedSecondary: {
    color: '#fff',
    border: '1px solid rgb(252 251 251 / 50%)',
    "&:hover": {
      color: '#fff',
      border: '1px solid rgb(252 251 251 / 50%)',
    }
  }
}));

const Index = (props) => {
  const classes = useStyles();
  let date = new Date()
  let data2 = props.location.pathname
  let url2 = props.location.search
  let json2 = url2 ? JSON.parse('{"' + decodeURIComponent(url2.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''
  console.log('json2', json2.month)
  const dispatch = useDispatch();
  const { drawerType, locale, navCollapsed, } = useSelector(({ settings }) => settings);
  const { monthData, yearData, user, ratings, orderDetails } = useSelector(({ auth }) => auth)
  const [langSwitcher, setLangSwitcher] = useState(false);
  const [open, changeOpen] = useState('')
  const [mailNotification, setMailNotification] = useState(false);
  const [appNotification, setAppNotification] = useState(false);
  const [apps, setApps] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [year, setYear] = useState(json2.year ? json2.year : yearData);
  const [month, setMonth] = useState(json2.month ? json2.month : monthData);
  const [tempYear, settempYear] = useState(json2.year ? json2.year : yearData);
  const [tempMonth, settempMonth] = useState(json2.month ? json2.month : monthData);
  const [type, setType] = useState('astrologer')
  const [description, setDescription] = useState('')
  const [isVisited, setVisited] = useState(false);
  const [openAlert, setAlert] = useState(false);
  const [openProcess, setProcess] = useState('')
  const [openRefferal, setRefferal] = useState(false)
  const [isSearch, showSearch] = useState(json2.searchText ? true : false)
  const [astroData, setAstroData] = useState('')
  const [tempAstrologer, setTempAtsrologer] = useState(json2.astrologerId ? json2.astrologerId : '');
  const [tempType, setTempType] = useState(json2.type ? json2.type : '');
  console.log('orderDetails================', data2,url2)

  useEffect(() => {
    console.log('json2 useEffect')
    setMonth(json2.month ? json2.month : monthData);
    setYear(json2.year ? json2.year : yearData)
    settempMonth(json2.month ? json2.month : monthData)
    settempYear(json2.year ? json2.year : yearData)
    setSearchText(json2.searchText ? json2.searchText : '')

  }, [data2]);

  useEffect(async() => {
      let dataForAstro = await Axios.axiosHelperFunc('get', 'admin/astrologerList', {})
      setAstroData(dataForAstro?.data?.data)
      console.log('dataForAstrodataForAstro', astroData);
  }, []);

  const onAppNotificationSelect = () => {
    setAppNotification(!appNotification)
  };

  const onMailNotificationSelect = () => {
    setMailNotification(!mailNotification)
  };

  const onLangSwitcherSelect = (event) => {
    setLangSwitcher(!langSwitcher);
  };

  const onAppsSelect = () => {
    setApps(!apps)
  };

  const onToggleCollapsedNav = (e) => {
    const val = !navCollapsed;
    dispatch(toggleCollapsedNav(val));
  };

  const Apps = () => {
    return (
      <ul className="jr-list jr-list-half">
        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/calendar/basic">
            <i className="zmdi zmdi-calendar zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.calendar.basic" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/to-do">
            <i className="zmdi zmdi-check-square zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.appModule.toDo" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/mail">
            <i className="zmdi zmdi-email zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.appModule.mail" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/chat">
            <i className="zmdi zmdi-comment zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.appModule.chat" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/app/contact">
            <i className="zmdi zmdi-account-box zmdi-hc-fw" />
            <span className="jr-list-text"><IntlMessages id="sidebar.appModule.contact" /></span>
          </Link>
        </li>

        <li className="jr-list-item">
          <Link className="jr-list-link" to="/">
            <i className="zmdi zmdi-plus-circle-o zmdi-hc-fw" />
            <span className="jr-list-text">Add New</span>
          </Link>
        </li>
      </ul>);
  };

  const addNewButton = () => {
    return <Button onClick={() => setRefferal(true)} variant="outlined" className={classes.MuiButtonOutlinedSecondary} color="secondary">
      + Add New
</Button>
  }
  const updateSearchText = (evt) => {
    setSearchText(evt.target.value);
  };

  const handleOpen = (e) => {
    changeOpen(e.currentTarget)
  }

  const getAction = (id) => {
    return <>
      <Button onClick={() => id ? handleClick(id) : setAlert(true)} variant="outlined" className={classes.MuiButtonOutlinedSecondary + ' d-none d-md-block'} color="secondary">
        + Add New
</Button>
      <span className='d-md-none  btn text-white' onClick={() => id ? handleClick(id) : setAlert(true)}><i className="zmdi zmdi-plus "></i>
      </span>
    </>
  }
  const getSearch = (id) => {
    return <div className='d-flex'>
      {!isSearch ? <span className='d-none d-md-block mr-4 btn text-white' onClick={() => showSearch(!isSearch)}><i className="zmdi zmdi-search zmdi-hc-lg"></i>
      </span> :
        <span className='d-none d-md-block mr-4 btn text-white' onClick={() => resetSearch()}><i className="zmdi zmdi-close zmdi-hc-lg"></i>
        </span>
      }
      {getAction(id)}
    </div>
  }
  const resetSearch = () => {
    showSearch(false);
    setSearchText('')
    changeOpen('')
    let url = props.location.search
    let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : {}
    json['month'] = tempMonth;
    json['year'] = tempYear;
    json['searchText'] = ''
    console.log('handleApply', tempMonth)
    let url1 = Object.keys(json).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(json[k])}`).join('&');
    props.history.replace(`${getHeaderData().url}?${url1}`)

  }

  const getProcessbutton = (data) => {
    return <>
      <Button onClick={() => setProcess(orderDetails)} variant="outlined" className={classes.MuiButtonOutlinedSecondary} color="secondary">
        Process
      </Button>
    </>
  }

  const getMarkDeliveredButton = (data) => {
    return <>
      <Button onClick={() => markDeliveredModal(orderDetails)} variant="outlined" className={classes.MuiButtonOutlinedSecondary} color="secondary">
        Mark Delivered
      </Button>
    </>
  }
  const [cancelOrderDialog, setCancelOrderDialog] = useState(false)
  const [loader, setLoader] = useState(false)
  const [orderInformation, setOrderInformation] = useState('')

  const markDeliveredModal = (orderDetails) => {
    setCancelOrderDialog(!cancelOrderDialog)
    setOrderInformation(orderDetails)
  }

  const [markDeliveredOtp, setmarkDeliveredOtp] = useState('')

  const confirmMarkDelivered = async () => {
    console.log('Testing :', orderInformation);

    let response = await Axios.axiosHelperFunc('post', 'productOrder/markOrderDelivered', { 'order_id': orderInformation.order_number, 'otp': markDeliveredOtp })

    if (response.data.error) {
      NotificationManager.error(response.data.title, null, 1500)
    }
    else {
      setmarkDeliveredOtp('')
      setOrderInformation('')
      setCancelOrderDialog(!cancelOrderDialog)
      dispatch(getOrderDetailsId({ order_id: orderDetails._id }, props.history))
      NotificationManager.success('Order marked as delivered', null, 1500)
    }
  }

  const handleClick = (id) => {
    props.history.push(id)
  }
  const buttonB = () => {

  }
  const buttonC = () => {

  }

  const getHeaderData = () => {
    let data = props.location.pathname

    let url = props.location.search
    let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : ''
    if (json) {
      json['month'] = tempMonth;
      json['year'] = tempYear;
      json['searchText'] = searchText;
    }

    let query = {}
    switch (true) {
      case data.includes('admin/astrologer/ratings-reviews/'):
        return { title: `Rating And Review For ${ratings ? ratings.astrologer_name : ''} (${ratings ? ratings.total_count : 0})` }
      case data.includes('financials/settlements/details'):
        return { title: `Settlement For ${user ? user.first_name : ''}`, button: getFilter(data), url: data }
      case data.includes('financials/settlements/lists'):
        return { title: 'Settlements' }
      case data.includes('consumers/details/'):
        return { title: 'Consumer Details' }
      case data.includes('consumers/lists'):
        return { title: 'Consumers', button: getSearch('/admin/consumers/add'), url: '/admin/consumers/lists', showSearch: true }
      case data.includes('broadcasts/lists'):
        return { title: 'Broadcasts', button: getAction() }
      case data.includes('orders/details/'):
        return { title: 'Order Details', button: orderDetails.current_status == 'New' ? getProcessbutton() : orderDetails.current_status == 'Processed' ? getMarkDeliveredButton() : '' }
      case data.includes('tod/addTip/'):
        return { title: 'Add Tip Of The Day' }
      case data.includes('tod/lists'):
        return { title: 'Tip Of The Day' }
      case data.includes('products/addProduct'):
        return { title: 'Add Product' }
      case data.includes('products/editProduct/'):
        return { title: 'Edit Product' }
      case data.includes('products/lists'):
        return { title: 'Products', button: getAction('/admin/astroshops/products/addProduct') }
      case data.includes('admin/referrals/lists'):
        return { title: 'Referrals', button: addNewButton() }
      case data.includes('services/editServices/'):
        return { title: 'Edit Service' }
      case data.includes('astroshops/services/lists'):
        return { title: 'Services', button: getAction('/admin/astroshops/services/addServices') }
      case data.includes('services/addServices'):
        return { title: 'Add Service' }
      case data.includes('financials/transactions/lists'):
        return { title: 'Transactions', button: getFilter(), url: '/admin/financials/transactions/lists', query: { page: json.page ? Number(json.page) + 1 : 1, month: tempMonth + 1, year: tempYear } }
      case data.includes('admin/astrologer/lists'):
        return { title: 'Astrologers', button: getSearch('/admin/astrologer/add'), url: '/admin/astrologer/lists', showSearch: true }
      case data.includes('/admin/referrals/details/'):
        return { title: `Referred By ${user ? user.first_name : ''}` }
      case data.includes('astrologer/add'):
        return { title: 'Add Astrologer' }
      case data.includes('astrologer/edit/'):
        return { title: 'Edit Astrologer' }
      case data.includes('/admin/call_requests/lists'):
        return { title: 'Call Requests' }
      case data.includes('astrologer/approve/'):
        return { title: 'Approve Astrologer' }
      case data.includes('astrologer/certificates'):
        return { title: 'Certificates' }
      case data.includes('/admin/ticketing-systems/lists'):
        return { title: 'Support Tickets' }
      case data.includes('/admin/astrologer/details'):
        return { title: 'Astrolger Details' }

      case data.includes('admin/orders/lists'):
        let statusArray = ['New', 'Processed', 'Others', 'Delivered', 'Cancelled']
        let statusName = statusArray[json.value ? json.value : 0];
        return {
          title: 'Orders',
          // button: getFilter(),
          button: statusName == 'New' || statusName == 'Processed' ? '' : getFilter(),
          url: '/admin/orders/lists',
          query: { page: json.page ? Number(json.page) + 1 : 1, status: statusArray[json.value ? json.value : 0], month: tempMonth + 1, year: tempYear }
        }

      case data.includes('admin/serviceRequests/lists'):
        let statusArray1 = ['New', 'Approved', 'Scheduled', 'Denied', 'Cancelled', 'Completed']
        let statusName1 = statusArray1[json.value ? json.value : 0];
        return {
          title: 'Service Requests',
          // button: getFilter(),
          button: statusName1 == 'New' || statusName1 == 'Approved' || statusName1 == 'Scheduled' ? '' : getFilter(),
          url: '/admin/serviceRequests/lists',
          query: { page: json.page ? Number(json.page) + 1 : 1, status: statusArray1[json.value ? json.value : 0], month: tempMonth + 1, year: tempYear }
        }

      case data.includes('admin/blogs/lists'):
        return { title: 'Blogs', button: getAction('/admin/blogs/add') }
      case data.includes('admin/blogs/edit'):
        return { title: 'Edit Blog', }
      case data.includes('admin/blogs/add'):
        return { title: 'Add Blog', }
      default:
        return { title: 'Dashboard' }
    }
  }
  const handleAddPromotions = async () => {
    if (!required(description) && isVisited) {
      dispatch(addPromotions({ description: description, user_type: type }, props.history))
      setAlert(false);
      setVisited(false);
      setType('astrologer')
      setDescription('')
    } else {
      setVisited(true)
    }

  }
  const handleApply = () => {
    setMonth(tempMonth)
    setYear(tempYear)

    changeOpen('')
    let url = props.location.search
    let json = url ? JSON.parse('{"' + decodeURIComponent(url.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"").replace(/%(?![0-9][0-9a-fA-F]+)/g, '%25')) + '"}') : {}
    json['month'] = tempMonth;
    json['year'] = tempYear;
    json['searchText'] = searchText
    json['type'] = tempType ? tempType : ''
    json['astrologerId'] = tempAstrologer ? tempAstrologer : ''
    console.log('handleApply', tempMonth)
    let url1 = Object.keys(json).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(json[k])}`).join('&');
    props.history.replace(`${getHeaderData().url}?${url1}`)
    // dispatch(getHeaderData().type(getHeaderData().query, props.history))

  }
  const handleClose = () => {
    changeOpen('');
    settempYear(year);
    settempMonth(month);
  }

  const handleResetFilter = () => {
    const date = new Date();
    console.log('handleAppsdly :', year,month)
    changeOpen('');
    settempYear(date.getFullYear());
    setYear(date.getFullYear())
    settempMonth(date.getMonth());
    setMonth(date.getMonth())
    setTempAtsrologer('');
    setTempType('');
    setSearchText('')
    if(data2 && data2 == '/admin/financials/transactions/lists'){
      props.history.replace(`/admin/financials/transactions/lists`)
    }
  }

  const handleClosePop = () => {
    changeOpen('');
  }

  const handleChangeState = (e, key) => {
    if (key == 'tempMonth') {
      console.log('handleApply==', e.target.value)
      settempMonth(e.target.value)
    } else if(key == 'tempAstrologer'){
      setTempAtsrologer(e.target.value)
    } else if(key == 'tempType'){
      setTempType(e.target.value)
    } else if(key == 'searchText'){
      setSearchText(e.target.value)
    } else {
      settempYear(e.target.value)
    }
  }

  const getFilter = () => {
    return <div onClick={(e) => handleOpen(e)} type='button' id='simple-popover' className='d-flex'><h3 id='anchorPosition' className='mt-2 mr-3 text-white'>{AppConfig.months[month]}, {year}</h3><i className="zmdi zmdi-filter-list zmdi-hc-2x"></i>
    </div>
  }
  // const getSecondary = ()=>{
  //   switch(true){
  //     case
  //   }
  // }

  const getData = () => {
    return (
      <Row>
        <Col className='col-12'>
          <FormGroup>
            <Label>Select User</Label>
            <Input className='form-control form-control-lg' type={'select'} onChange={(e) => setType(e.target.value)} value={type}>
              <option key={1} value={'astrologer'}>Astrologer</option>
              <option key={2} value={'consumer'}>Consumer</option>
            </Input>
          </FormGroup>

        </Col>
        <Col className='col-12'>
          <FormGroup>
            <Label>Description</Label>
            <Input onFocus={() => setVisited(true)} invalid={(required(description) ? true : false) && isVisited} className='form-control form-control-lg' type={'textarea'} onChange={(e) => setDescription(e.target.value)} value={description} />
            <FormFeedback>{required(description)}</FormFeedback>
          </FormGroup>

        </Col>
      </Row>
    )
  }

  const handleRequestClose = () => {
    setAlert(false)
    setVisited(false);
    setType('astrolger');
    setDescription('')
    setProcess('')
  }

  const handleProcessOrder = async () => {
    setProcess('')
    let data = await Axios.axiosHelperFunc('post', 'productOrder/changeOrderStatus', { order_id: orderDetails._id })
    if (data.data && data.data.error == false) {
      setProcess('')
      dispatch(addEditAstrolgerSuccess(data.data.title))
      dispatch(getOrderDetailsId({ order_id: orderDetails._id }, props.history))

    } else if (data.data && data.error == true) {
      dispatch(apiFailed(data.data.title))
    }
  }

  const changeOrderStatus = async (args) => {

    handleRequestClose()
    console.log('inside changeOrderStatus', args)
    setProcess('')

    let data = await Axios.axiosHelperFunc('post', 'productOrder/changeOrderStatus', {
      order_id: orderDetails._id,
      total_amount: args.total_amount,
      invoice_number: args.invoice_number,
      length: args.length,
      breadth: args.breadth,
      height: args.height,
      weight: args.weight
    })

    if (data.data && data.data.error == false) {
      setProcess('')
      dispatch(addEditAstrolgerSuccess(data.data.title))
      dispatch(getOrderDetailsId({ order_id: orderDetails._id }, props.history))

    }
    else if (data.data && data.error == true) {
      dispatch(apiFailed(data.data.title))
    }

  }

  const drawerStyle = drawerType.includes(FIXED_DRAWER) ? "d-block d-xl-none" : drawerType.includes(COLLAPSED_DRAWER) ? "d-block" : "d-none";

  const generateDeliveredOtp = async () => {

    let data = await Axios.axiosHelperFunc('post', 'productOrder/generateDeliveredOtp', {})
    console.log('GenerateDeliveredOtp', data);

  }

  return (
    <AppBar className="app-main-header">
      <Toolbar className="app-toolbar" disableGutters={false}>

        <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
          onClick={onToggleCollapsedNav}>
          <span className="menu-icon" />
        </IconButton>

        <ul className="d-none d-md-block  header-notifications list-inline mr-2 mt-2">
          <li className="list-inline-item text-white">
            <h2 className='title text-capitalize'>{getHeaderData().title}</h2>
          </li>
        </ul>

        <ul className="d-md-none  header-notifications list-inline mr-2 mt-2">
          <li className="list-inline-item text-white">
            <h4 className='title text-capitalize'>{getHeaderData().title}</h4>
          </li>
        </ul>

        {isSearch && getHeaderData().showSearch && <ul className="d-none d-md-block  header-notifications list-inline ml-auto w-50" style={{ transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
          <InputGroup>
            <Input placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <InputGroupAddon addonType="append">
              <Button variant="outlined" className={classes.MuiButtonOutlinedSecondary} onClick={handleApply} color="secondary">
                Search
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </ul>}

        {getHeaderData().showSearch && <ul className="d-md-none  header-notifications list-inline ml-auto w-100" style={{ transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
          <li className="d-flex list-inline-item">
            <InputGroup>
              <Input placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <InputGroupAddon addonType="append">

                <span className='btn text-white' onClick={() => handleApply}><i className="zmdi zmdi-search"></i>
                </span>
              </InputGroupAddon>
            </InputGroup>

            {getHeaderData().button}
          </li>
        </ul>}

        <ul className=" d-none d-md-block header-notifications list-inline ml-auto">
          <li className="list-inline-item">
            {getHeaderData().button}
          </li>
        </ul>

        <div className="ellipse-shape" />
        {openRefferal && <AddReferals openRefferal={openRefferal} handleClose={setRefferal} />}

        { data2 && data2.includes('/admin/financials/transactions/lists') ?
          <MonthYearFilter1
            anchorEl={open}
            open={open}
            handleClose={handleClose}
            handleResetFilter={handleResetFilter}
            handleApply={handleApply}
            handleChange={handleChangeState}
            month={tempMonth}
            year={tempYear}
            astrologer={tempAstrologer}
            type={tempType}
            searchText={searchText}
            astroData={astroData}
            handleClosePop={handleClosePop}
          /> : 
          <MonthYearFilter
            anchorEl={open}
            open={open}
            handleClose={handleClose}
            handleApply={handleApply}
            handleChange={handleChangeState}
            month={tempMonth}
            year={tempYear}
          />
        }

        {/* <DialogAlert
          open={openAlert || openProcess}
          handleClose={handleRequestClose}
          handleYes={openProcess ? handleProcessOrder : handleAddPromotions}
          title={openProcess ? 'Process Order' : openAlert ? `Add Promotion` : 'Title'}
          description={openProcess ? "Are you sure you want to process this order?" : openAlert ? getData() : 'Description'}
          dataFive={orderDetails}
        /> */}

        <DialogAlert
          open={openAlert}
          handleClose={handleRequestClose}
          handleYes={openProcess ? handleProcessOrder : handleAddPromotions}
          title={openProcess ? 'Process Order' : openAlert ? `Add Promotion` : 'Title'}
          description={openProcess ? "Are you sure you want to process this order?" : openAlert ? getData() : 'Description'}
          dataFive={orderDetails}
        />

        <ProcessOrder
          open={openProcess}
          close='close'
          handleClose={handleRequestClose}
          handleYes={changeOrderStatus}
          title={openProcess ? 'Process Order' : openAlert ? `Add Promotion` : 'Title'}
          description={openProcess ? "Are you sure you want to process this order?" : openAlert ? getData() : 'Description'}
          order={{
            product: { total_amount: openProcess.total_amount },
          }}
        />

        <Dialog open={cancelOrderDialog} onClose={markDeliveredModal} fullWidth={true} maxWidth={'sm'}>
          <DialogTitle>
            {'Mark Order Delivered'}
            {loader ?
              <div className="loader-view">
                <CircularProgress />
              </div> : null}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Do you want to mark this order as delivered?`}
            </DialogContentText>

            <Row>
              <Col xs={5} sm={5} md={5} xl={5} lg={5}>
                <TextField size="small" variant='outlined' placeholder='Enter OTP' onChange={(e) => setmarkDeliveredOtp(e.target.value)} />
              </Col>
              <Col xs={4} sm={4} md={4} xl={4} lg={4}>
                <Button className="btn btn-primary jr-btn jr-btn-lg" size='medium' onClick={generateDeliveredOtp}>Generate OTP</Button>
              </Col>
            </Row>

          </DialogContent>
          <DialogActions>
            <Button onClick={markDeliveredModal} color='secondary'>No</Button>
            <Button onClick={confirmMarkDelivered} color='primary'>Yes</Button>
          </DialogActions>
        </Dialog>

      </Toolbar>
    </AppBar>
  );
};


export default withRouter(Index);
