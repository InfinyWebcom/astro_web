import { all, call, fork, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
    LOGIN,
    GET_ASTROLOGERS,
    ADDEDIT_ASTROLOGERS,
    ADDEDIT_SERVICES,
    LIST_SERVICES,
    LIST_PRODUCTS,
    ADD_PRODUCTS,
    LIST_TOTD,
    ORDER_LIST,
    SERVICE_REQUEST_LIST,
    GET_NEW_ORDER_COUNT,
    LIST_PROMOTIONS,
    LIST_CONSUMERS,
    LIST_SETTLEMENTS,
    LIST_SETTLEMENTS_ASTRO,
    LIST_TRANSACTIONS,
    GET_GRAPH_DATA,
    GET_NEW_ORDER,
    GET_NEW_SERVICE,
    GET_NEW_REPORT,
    GET_RATINGS,
    GET_TICKETING,
    ADD_PROMOTIONS,
    GET_USER,
    GET_TOP_SELLING_SERVICES,
    GET_TOP_EARNING_ASTROLOGERS,
    GET_TOP_SELLING_PRODUCTS,
    GET_ORDER_DETAILS_ID, GET_REFFERED_USERS, GET_REFERRALS, GET_CALL_REQUESTS, GET_BLOGS
} from '../constants/ActionTypes'

import {
    loginSuccess,
    apiFailed,
    getastrologerListSuccess,
    addEditAstrolgerSuccess,
    apiSuccess,
    listServicesSuccess,
    listProductsSuccess,
    listTotdSuccess,
    listOrderSuccess,
    serviceRequestListSuccess,
    getOrderCountSuccess,
    listPromotionsSuccess,
    listConsumersSuccess,
    listSettlementsSuccess,
    astroSettlementsSuccess,
    listTransactionsSuccess,
    getGraphdataSuccess,
    getNewOrderSuccess,
    getNewServiceSuccess,
    getNewReportSuccess,
    getRatingsSuccess,
    getTicketingSuccess,
    listPromotions,
    getUserSuccess,
    getTopSellingServicesSuccess,
    getTopSellingProductSuccess,
    getTopAstrologerSuccess,
    getOrderDetailsIdSuccess, getRefferedUsersSuccess, getRefferalsSuccess, getCallRequestsSuccess, getBlogsListSuccess
} from '../actions/auth'
import Axios from 'util/axiosRequest'


function* loginFunction({ payload }) {
    console.log('data', payload)
    const { history, data } = payload
    try {
        console.log('login function', data)
        const signInResponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/login', data)
        if (signInResponse.data.error === true) {
            yield put(apiFailed(signInResponse.data.title))
        } else {

            localStorage.setItem('token', signInResponse.data.token)
            yield put(loginSuccess(signInResponse.data))
            history.push('/admin/dashboard')


        }
    } catch (error) {

    }
}
export function* loginDispatcher() {
    yield takeLatest(LOGIN, loginFunction)
}

function* getAstrolgersFunction({ payload }) {
    let { data, history } = payload
    console.log('data======', payload)
    try {
        const getAstrolgerResponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getAstrologerList', payload)
        if (getAstrolgerResponse.data.error === true) {
            yield put(apiFailed(getAstrolgerResponse.data.title))
        } else {
            yield put(getastrologerListSuccess(getAstrolgerResponse.data))
        }
    } catch (error) {
        throw error
    }
}
export function* getAstrolgersDispatcher() {
    yield takeEvery(GET_ASTROLOGERS, getAstrolgersFunction)
}
function* addEditAstroFunction({ payload }) {
    try {
        let { data, history } = payload
        const addAstrolReponse = yield call(Axios.axiosHelperFunc, 'post', data.url, data)
        if (addAstrolReponse.data.error === true) {
            yield put(apiFailed(addAstrolReponse.data.title))
        } else {
            if (data.url.includes('admin/createAstrologer')) {
                history.push('/admin/astrologer/lists')
            }

            yield put(addEditAstrolgerSuccess(addAstrolReponse.data.title))
        }
    } catch (error) {

    }
}
export function* addEditAstroDispatch() {
    yield takeEvery(ADDEDIT_ASTROLOGERS, addEditAstroFunction)
}

function* addEditServicesFunction({ payload }) {
    try {
        let { data, history } = payload
        const addEditServiceResponse = yield call(Axios.axiosHelperFunc, 'post', data.url, data)
        if (addEditServiceResponse.data.error === true) {
            yield put(apiFailed(addEditServiceResponse.data.title))
        } else {
            history.push('/admin/astroshops/services')
            yield put(apiSuccess(addEditServiceResponse.data.title))
        }
    } catch (error) {

    }
}
export function* addEditServicesDispatcher() {
    yield takeEvery(ADDEDIT_SERVICES, addEditServicesFunction)
}

function* listServicesFunction({ payload }) {
    try {
        let { data, history } = payload
        const listSrviceReponse = yield call(Axios.axiosHelperFunc, 'post', 'service/getServicesList', data)
        if (listSrviceReponse.data.error === true) {
            yield put(apiFailed(listSrviceReponse.data.title))
        } else {
            yield put(listServicesSuccess(listSrviceReponse.data))
        }
    } catch (error) {

    }
}
export function* listServicesDispatcher() {
    yield takeEvery(LIST_SERVICES, listServicesFunction)
}

function* listProductsFunction({ payload }) {
    try {
        let { data, history } = payload
        const lsitProductsResponse = yield call(Axios.axiosHelperFunc, 'post', 'product/getProductsList', data)
        if (lsitProductsResponse.data.error === true) {
            yield put(apiFailed(lsitProductsResponse.data.title))
        } else {
            yield put(listProductsSuccess(lsitProductsResponse.data))
        }
    } catch (error) {

    }
}
export function* listProductsDispatcher() {
    yield takeEvery(LIST_PRODUCTS, listProductsFunction)
}
function* addEditProductsFunction({ payload }) {
    try {
        let { data, history } = payload
        const addEditResponse = yield call(Axios.axiosHelperFunc, 'post', data.url, data)
        if (addEditResponse.data.error === true) {
            yield put(apiFailed(addEditResponse.data.title))
        } else {
            history.push('/admin/astroshops/products')
            yield put(apiSuccess(addEditResponse.data.title))
        }
    } catch (error) {

    }
}
export function* addEditProductsDispatcher() {
    yield takeEvery(ADD_PRODUCTS, addEditProductsFunction)
}

function* listTotdFunction({ payload }) {
    try {
        let { data, history } = payload
        const listTotdReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getAllTips', data)
        if (listTotdReponse.data.error === true) {
            yield put(apiFailed(listTotdReponse.data.title))
        } else {
            yield put(listTotdSuccess(listTotdReponse.data))
        }
    } catch (error) {

    }
}
export function* listTotdDispatcher() {
    yield takeEvery(LIST_TOTD, listTotdFunction)
}

function* orderListFunction({ payload }) {
    try {
        let { data, history } = payload
        const listOrderResponse = yield call(Axios.axiosHelperFunc, 'post', 'productOrder/orderListing', data)
        if (listOrderResponse.data.error === true) {
            yield put(apiFailed(listOrderResponse.data.title))
        } else {
            yield put(listOrderSuccess(listOrderResponse.data))
        }
    } catch (error) {

    }
}
export function* orderListDispatcher() {
    yield takeEvery(ORDER_LIST, orderListFunction)
}

function* serviceRequestFunction({ payload }) {
    try {
        let { data, history } = payload
        const listServiceRequestResponse = yield call(Axios.axiosHelperFunc, 'post', 'serviceRequest/serviceRequestListing', data)
        if (listServiceRequestResponse.data.error === true) {
            yield put(apiFailed(listServiceRequestResponse.data.title))
        } else {
            yield put(serviceRequestListSuccess(listServiceRequestResponse.data))
        }
    } catch (error) {

    }
}
export function* serviceRequestDispatcher() {
    yield takeEvery(SERVICE_REQUEST_LIST, serviceRequestFunction)
}

function* getOrderCountFunction({ payload }) {
    try {
        let { data, history } = payload
        const getOrderCountResponse = yield call(Axios.axiosHelperFunc, 'post', 'productOrder/getNewOrderCOunt', data)
        if (getOrderCountResponse.data.error === true) {
            yield put(apiFailed(getOrderCountResponse.data.title))
        } else {
            yield put(getOrderCountSuccess(getOrderCountResponse.data.total_count))
        }
    } catch (error) {

    }
}
export function* getOrderContDispatcher() {
    yield takeEvery(GET_NEW_ORDER_COUNT, getOrderCountFunction)
}

function* promotionsFunction({ payload }) {
    try {
        let { data, history } = payload
        const listPromtionResponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getPromotionList', data)
        if (listPromtionResponse.data.error === true) {
            yield put(apiFailed(listPromtionResponse.data.title))
        } else {
            yield put(listPromotionsSuccess(listPromtionResponse.data))
        }
    } catch (error) {

    }
}
export function* listPromotionDispatcher() {
    yield takeEvery(LIST_PROMOTIONS, promotionsFunction)
}
function* consumerFunction({ payload }) {
    try {
        let { data, history } = payload
        const consumerListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getConsumerList', data)
        if (consumerListReponse.data.error === true) {
            yield put(apiFailed(consumerListReponse.data.title))
        } else {
            yield put(listConsumersSuccess(consumerListReponse.data))
        }
    } catch (error) {

    }
}
export function* listConsumerDispatcher() {
    yield takeEvery(LIST_CONSUMERS, consumerFunction)
}

function* settlementsFunction({ payload }) {
    try {
        let { data, history } = payload
        const settlementsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'settlement/getSettlementAstrologers', data)
        if (settlementsListReponse.data.error === true) {
            yield put(apiFailed(settlementsListReponse.data.title))
        } else {
            yield put(listSettlementsSuccess(settlementsListReponse.data))
        }
    } catch (error) {

    }
}
export function* listsettlementsDispatcher() {
    yield takeEvery(LIST_SETTLEMENTS, settlementsFunction)
}

function* astroSettleMentsFunction({ payload }) {
    try {
        let { data, history } = payload
        const astroSettleMentsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'settlement/getSettlementsList', data)
        if (astroSettleMentsListReponse.data.error === true) {
            yield put(apiFailed(astroSettleMentsListReponse.data.title))
        } else {
            yield put(astroSettlementsSuccess(astroSettleMentsListReponse.data))
        }
    } catch (error) {

    }
}
export function* listastroSettleMentsDispatcher() {
    yield takeEvery(LIST_SETTLEMENTS_ASTRO, astroSettleMentsFunction)
}

function* listTransactionsFunction({ payload }) {
    try {
        let { data, history } = payload
        const listTransactionsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'transaction/transactionsListing', data)
        if (listTransactionsListReponse.data.error === true) {
            yield put(apiFailed(listTransactionsListReponse.data.title))
        } else {
            yield put(listTransactionsSuccess(listTransactionsListReponse.data))
        }
    } catch (error) {

    }
}
export function* listlistTransactionsDispatcher() {
    yield takeEvery(LIST_TRANSACTIONS, listTransactionsFunction)
}

function* getGraphDataFunction({ payload }) {
    try {
        let { data, history } = payload
        const getGraphDataListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getAllConsultData', data)
        if (getGraphDataListReponse.data.error === true) {
            yield put(apiFailed(getGraphDataListReponse.data.title))
        } else {
            yield put(getGraphdataSuccess(getGraphDataListReponse.data))
        }
    } catch (error) {

    }
}
export function* listgetGraphDataDispatcher() {
    yield takeEvery(GET_GRAPH_DATA, getGraphDataFunction)
}

function* getNewOrderFunction({ payload }) {
    try {
        let { data, history } = payload
        const getNewOrderListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getNewOrdersList', data)
        if (getNewOrderListReponse.data.error === true) {
            yield put(apiFailed(getNewOrderListReponse.data.title))
        } else {
            yield put(getNewOrderSuccess(getNewOrderListReponse.data))
        }
    } catch (error) {

    }
}
export function* getNewOrderDispatcher() {
    yield takeEvery(GET_NEW_ORDER, getNewOrderFunction)
}

function* getNewServicesFunction({ payload }) {
    try {
        let { data, history } = payload
        const getNewServicesListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getNewServiceRequests', data)
        if (getNewServicesListReponse.data.error === true) {
            yield put(apiFailed(getNewServicesListReponse.data.title))
        } else {
            yield put(getNewServiceSuccess(getNewServicesListReponse.data))
        }
    } catch (error) {

    }
}
export function* getNewServicesDispatcher() {
    yield takeEvery(GET_NEW_SERVICE, getNewServicesFunction)
}

function* getNewReportsFunction({ payload }) {
    try {
        let { data, history } = payload
        const getNewReportsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getNewReportList', data)
        if (getNewReportsListReponse.data.error === true) {
            yield put(apiFailed(getNewReportsListReponse.data.title))
        } else {
            yield put(getNewReportSuccess(getNewReportsListReponse.data))
        }
    } catch (error) {

    }
}
export function* getNewReportsDispatcher() {
    yield takeEvery(GET_NEW_REPORT, getNewReportsFunction)
}

function* getRatingsFunction({ payload }) {
    try {
        let { data, history } = payload
        const getRatingsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getUserRatings', data)
        if (getRatingsListReponse.data.error === true) {
            yield put(apiFailed(getRatingsListReponse.data.title))
        } else {
            yield put(getRatingsSuccess(getRatingsListReponse.data))
        }
    } catch (error) {

    }
}
export function* getRatingsDispatcher() {
    yield takeEvery(GET_RATINGS, getRatingsFunction)
}

function* getTicketingFunction({ payload }) {
    try {
        let { data, history } = payload
        const getTicketingListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getSupportList', data)
        if (getTicketingListReponse.data.error === true) {
            yield put(apiFailed(getTicketingListReponse.data.title))
        } else {
            yield put(getTicketingSuccess(getTicketingListReponse.data))
        }
    } catch (error) {

    }
}
export function* getTicketingDispatcher() {
    yield takeEvery(GET_TICKETING, getTicketingFunction)
}
function* addFPromotionsFunction({ payload }) {
    try {
        let { data, history } = payload
        const addLPromotionsistReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/addPromotion', data)
        if (addLPromotionsistReponse.data.error === true) {
            yield put(apiFailed(addLPromotionsistReponse.data.title))
        } else {
            yield put(apiSuccess(addLPromotionsistReponse.data.title))
            delete data.user_type
            yield put(listPromotions(data, history))
        }
    } catch (error) {

    }
}
export function* addDPromotionsispatcher() {
    yield takeEvery(ADD_PROMOTIONS, addFPromotionsFunction)
}

function* getUserFunction({ payload }) {
    try {
        let { data, history } = payload
        const getUserListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getUserDetails', data)
        if (getUserListReponse.data.error === true) {
            yield put(apiFailed(getUserListReponse.data.title))
        } else {
            yield put(getUserSuccess(getUserListReponse.data))
        }
    } catch (error) {

    }
}
export function* getUserDispatcher() {
    yield takeEvery(GET_USER, getUserFunction)
}

function* getTopSellingServicesFunction({ payload }) {
    try {
        let { data, history } = payload
        const getTopSellingServicesListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getTopSellingServices', data)
        if (getTopSellingServicesListReponse.data.error === true) {
            yield put(apiFailed(getTopSellingServicesListReponse.data.title))
        } else {
            yield put(getTopSellingServicesSuccess(getTopSellingServicesListReponse.data))
        }
    } catch (error) {

    }
}
export function* getTopSellingServicesDispatcher() {
    yield takeEvery(GET_TOP_SELLING_SERVICES, getTopSellingServicesFunction)
}
function* getTopSelingProductsFunction({ payload }) {
    try {
        let { data, history } = payload
        const getTopSelingProductsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getTopSellingProducts', data)
        if (getTopSelingProductsListReponse.data.error === true) {
            yield put(apiFailed(getTopSelingProductsListReponse.data.title))
        } else {
            yield put(getTopSellingProductSuccess(getTopSelingProductsListReponse.data))
        }
    } catch (error) {

    }
}
export function* getTopSelingProductsDispatcher() {
    yield takeEvery(GET_TOP_SELLING_PRODUCTS, getTopSelingProductsFunction)
}
function* getTopAstrolgersFunction({ payload }) {
    try {
        let { data, history } = payload
        const getTopAstrolgersListReponse = yield call(Axios.axiosHelperFunc, 'post', 'admin/getTopEarnAstrologers', data)
        if (getTopAstrolgersListReponse.data.error === true) {
            yield put(apiFailed(getTopAstrolgersListReponse.data.title))
        } else {
            yield put(getTopAstrologerSuccess(getTopAstrolgersListReponse.data))
        }
    } catch (error) {

    }
}
export function* getTopAstrolgersDispatcher() {
    yield takeEvery(GET_TOP_EARNING_ASTROLOGERS, getTopAstrolgersFunction)
}
function* getOrderDetailsFunction({ payload }) {
    try {
        let { data, history } = payload
        const getOrderDetailsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'productOrder/orderDetails', data)
        if (getOrderDetailsListReponse.data.error === true) {
            yield put(apiFailed(getOrderDetailsListReponse.data.title))
        } else {
            yield put(getOrderDetailsIdSuccess(getOrderDetailsListReponse.data))
        }
    } catch (error) {

    }
}
export function* getOrderDetailsDispatcher() {
    yield takeEvery(GET_ORDER_DETAILS_ID, getOrderDetailsFunction)
}

function* getRefferedFunction({ payload }) {
    try {
        let { data, history } = payload
        const getRefferedListReponse = yield call(Axios.axiosHelperFunc, 'post', 'referral/getReferralDetails', data)
        if (getRefferedListReponse.data.error === true) {
            yield put(apiFailed(getRefferedListReponse.data.title))
        } else {
            yield put(getRefferedUsersSuccess(getRefferedListReponse.data))
        }
    } catch (error) {

    }
}
export function* getRefferedDispatcher() {
    yield takeEvery(GET_REFFERED_USERS, getRefferedFunction)
}

function* getRefferalsFunction({ payload }) {
    try {
        let { data, history } = payload
        const getRefferalsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'referral/getReferralList', data)
        if (getRefferalsListReponse.data.error === true) {
            yield put(apiFailed(getRefferalsListReponse.data.title))
        } else {
            yield put(getRefferalsSuccess(getRefferalsListReponse.data))
        }
    } catch (error) {

    }
}
export function* getRefferalsDispatcher() {
    yield takeEvery(GET_REFERRALS, getRefferalsFunction)
}
function* getCallRequestsFunction({ payload }) {
    try {
        let { data, history } = payload
        const getCallRequestsListReponse = yield call(Axios.axiosHelperFunc, 'post', 'callRequest/callRequestList', data)
        if (getCallRequestsListReponse.data.error === true) {
            yield put(apiFailed(getCallRequestsListReponse.data.title))
        } else {
            yield put(getCallRequestsSuccess(getCallRequestsListReponse.data))
        }
    } catch (error) {

    }
}
export function* getCallRequestsDispatcher() {
    yield takeEvery(GET_CALL_REQUESTS, getCallRequestsFunction)
}
function* getBlogsListFunction({ payload }) {
    try {
        let { data, history } = payload
        const getBlogsResponse = yield call(Axios.axiosHelperFunc, 'post', 'blog/list', data)
        if (getBlogsResponse.data.error === true) {
            yield put(apiFailed(getBlogsResponse.data.title))
        } else {
            yield put(getBlogsListSuccess(getBlogsResponse.data))
        }
    } catch (error) {

    }
}
export function* getBlogsDispatcher() {
    yield takeEvery(GET_BLOGS, getBlogsListFunction)
}
export default function* rootSaga() {
    yield all([
        fork(loginDispatcher),
        fork(getAstrolgersDispatcher),
        fork(addEditAstroDispatch),
        fork(addEditServicesDispatcher),
        fork(listServicesDispatcher),
        fork(listProductsDispatcher),
        fork(addEditProductsDispatcher),
        fork(listTotdDispatcher),
        fork(orderListDispatcher),
        fork(serviceRequestDispatcher),
        fork(getOrderContDispatcher),
        fork(listPromotionDispatcher),
        fork(listConsumerDispatcher),
        fork(listsettlementsDispatcher),
        fork(listastroSettleMentsDispatcher),
        fork(listlistTransactionsDispatcher),
        fork(listgetGraphDataDispatcher),
        fork(getNewReportsDispatcher),
        fork(getNewOrderDispatcher),
        fork(getNewServicesDispatcher),
        fork(getRatingsDispatcher),
        fork(getTicketingDispatcher),
        fork(addDPromotionsispatcher),
        fork(getUserDispatcher),
        fork(getTopAstrolgersDispatcher),
        fork(getTopSelingProductsDispatcher),
        fork(getTopSellingServicesDispatcher),
        fork(getOrderDetailsDispatcher),
        fork(getRefferalsDispatcher),
        fork(getRefferedDispatcher),
        fork(getCallRequestsDispatcher),
        fork(getBlogsDispatcher)

    ])
}