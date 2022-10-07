import {
    LOGIN,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    INIT_URL,
    API_FAILED,
    LOGIN_SUCCESS,
    GET_ASTROLOGERS,
    GET_ASTROLOGERS_SUCCESS,
    ADDEDIT_ASTROLOGERS,
    ADDEDIT_ASTROLOGERS_SUCCESS,
    ADDEDIT_SERVICES,
    API_SUCCESS,
    LIST_SERVICES,
    LIST_SERVICES_SUCCESS,
    LIST_PRODUCTS,
    LIST_PRODUCTS_SUCCESS,
    ADD_PRODUCTS,
    LIST_TOTD,
    LIST_TOTD_SUCCESS,
    ORDER_LIST,
    ORDER_LIST_SUCCESS,
    SERVICE_REQUEST_LIST,
    SERVICE_REQUEST_LIST_SUCCESS,
    GET_NEW_ORDER_COUNT,
    GET_NEW_ORDER_COUNT_SUCCESS,
    LIST_PROMOTIONS,
    LIST_PROMOTIONS_SUCCESS,
    LIST_CONSUMERS_SUCCESS,
    LIST_CONSUMERS,
    LIST_SETTLEMENTS,
    LIST_SETTLEMENTS_ASTRO,
    LIST_SETTLEMENTS_SUCCESS,
    LIST_SETTLEMENTS_ASTRO_SUCCESS,
    LIST_TRANSACTIONS,
    LIST_TRANSACTIONS_SUCCESS,
    GET_GRAPH_DATA,
    GET_GRAPH_DATA_SUCCESS,
    GET_NEW_ORDER,
    GET_NEW_ORDER_SUCCESS,
    GET_NEW_SERVICE,
    GET_NEW_SERVICE_SUCCESS,
    GET_NEW_REPORT,
    GET_NEW_REPORT_SUCCESS,
    GET_RATINGS,
    GET_RATINGS_SUCCESS,
    GET_TICKETING_SUCCESS,
    GET_TICKETING,
    ADD_PROMOTIONS_SUCCESS,
    ADD_PROMOTIONS,
    GET_USER,
    GET_USER_SUCCESS,
    GET_TOP_EARNING_ASTROLOGERS,
    GET_TOP_EARNING_ASTROLOGERS_SUCCESS,
    GET_TOP_SELLING_PRODUCTS,
    GET_TOP_SELLING_PRODUCTS_SUCCESS,
    GET_TOP_SELLING_SERVICES,
    GET_TOP_SELLING_SERVICES_SUCCESS,
    GET_ORDER_DETAILS_ID,
    GET_ORDER_DETAILS_ID_SUCCESS, GET_REFFERED_USERS, GET_REFFERED_USERS_SUCCESS, GET_REFERRALS, GET_REFERRALS_SUCCESS, GET_CALL_REQUESTS, GET_CALL_REQUESTS_SUCCESS, GET_BLOGS, GET_BLOGS_SUCCESS
} from '../constants/ActionTypes'

import { NotificationManager } from 'react-notifications';
import actions from 'redux-form/lib/actions';
import { act } from 'react-dom/test-utils';

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    authUser: localStorage.getItem('token'),
    user_details: '',
    astrolgers: [],
    services: [],
    products: [],
    totdList: [],
    orders: [],
    serviceRequests: [],
    orderCount: 0,
    promotions: [],
    consumers: [],
    consumerTotal: 0,
    astroSettlementsList: [],
    settlements: [],
    transactions: [],
    newServices: [],
    newRequests: [],
    newOrders: [],
    newReports: [],
    countData: '',
    monthlyData: [],
    ratings: '',
    ticketingList: [],
    yearData: (new Date()).getFullYear(),
    monthData: (new Date()).getMonth(),
    user: '',
    topSellingServices: [],
    topSellingProducts: [],
    topAstrologers: [],
    orderDetails: '',
    refferedUsser: [],
    refferals: [],
    callRequests: [],
    blogs: []

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loader: true
            }

        case LOGIN_SUCCESS:
            NotificationManager.success(action.payload.title)
            return {
                ...state,
                loader: false,
                user_details: action.payload.data
            }

        case SHOW_MESSAGE:
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
                loader: false
            }

        case HIDE_MESSAGE:
            return {
                ...state,
                alertMessage: '',
                showMessage: false,
                loader: false
            }

        case ON_SHOW_LOADER: {
            return {
                ...state,
                loader: true
            }
        }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loader: false
            }
        }
        case INIT_URL:
            return {
                ...state,
                initURL: action.payload
            }

        case API_FAILED:
            NotificationManager.error(action.payload)
            return {
                ...state,
                loading: false
            }
        case GET_ASTROLOGERS:
            return {
                ...state,
                loading: true
            }
        case GET_ASTROLOGERS_SUCCESS:
            return {
                ...state,
                astrolgers: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0,
                loading: false
            }
        case ADDEDIT_ASTROLOGERS:
            return {
                ...state,
                loading: true
            }
        case ADDEDIT_ASTROLOGERS_SUCCESS:
            NotificationManager.success(action.payload)
            return {
                ...state,
                loading: false
            }
        case ADDEDIT_SERVICES:
            return {
                ...state,
                loading: true
            }
        case API_SUCCESS:
            NotificationManager.success(action.payload)
            return {
                ...state,
                loading: false
            }
        case LIST_SERVICES:
            return {
                ...state,
                loading: true
            }

        case LIST_SERVICES_SUCCESS:
            return {
                ...state,
                services: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0,
                loading: false
            }

        case LIST_PRODUCTS:
            return {
                ...state,
                loading: true
            }
        case LIST_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0,
                loading: false
            }
        case ADD_PRODUCTS:
            return {
                ...state,
                loading: true
            }
        case LIST_TOTD:
            return {
                ...state,
                loading: true
            }
        case LIST_TOTD_SUCCESS:
            return {
                ...state,
                totdList: action.payload.data,
                loading: false
            }
        case ORDER_LIST:
            return {
                ...state,
                loading: true
            }
        case ORDER_LIST_SUCCESS:
            return {
                ...state,
                orders: action.payload.data ? action.payload.data : [],
                total_count: action.payload.total_count ? action.payload.total_count : 0,
                loading: false
            }
        case SERVICE_REQUEST_LIST:
            return {
                ...state,
                loading: true
            }
        case SERVICE_REQUEST_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                serviceRequests: action.payload.data ? action.payload.data : [],
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_NEW_ORDER_COUNT:
            return {
                ...state,
                loading: true
            }
        case GET_NEW_ORDER_COUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                orderCount: action.payload
            }
        case LIST_PROMOTIONS:
            return {
                ...state,
                loading: true
            }
        case LIST_PROMOTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                promotions: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case LIST_CONSUMERS:
            return {
                ...state,
                loading: true,

            }
        case LIST_CONSUMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                consumers: action.payload.data,
                consumerTotal: action.payload.total_count
            }
        case LIST_SETTLEMENTS:
            return {
                ...state,
                loading: true,
            }
        case LIST_SETTLEMENTS_ASTRO:
            return {
                ...state,
                loading: true
            }
        case LIST_SETTLEMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                settlements: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case LIST_SETTLEMENTS_ASTRO_SUCCESS:
            return {
                ...state,
                loading: false,
                astroSettlementsList: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case LIST_TRANSACTIONS:
            return {
                ...state,
                loading: true,
            }
        case LIST_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_GRAPH_DATA:
            return {
                ...state,
                loading: true
            }
        case GET_GRAPH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                countData: action.payload.countData,
                monthlyData: action.payload.monthlyData
            }
        case GET_NEW_ORDER:
            return {
                ...state,
                loading: true
            }
        case GET_NEW_ORDER_SUCCESS:
            return {
                ...state,
                newOrders: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0,
                loading: false
            }
        case GET_NEW_SERVICE:
            return {
                ...state,
                loading: true
            }
        case GET_NEW_SERVICE_SUCCESS:
            return {
                ...state,
                loading: false,
                newServices: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_NEW_REPORT:
            return {
                ...state,
                loading: true
            }
        case GET_NEW_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                newReports: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_RATINGS:
            return {
                ...state,
                loading: true
            }
        case GET_RATINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                ratings: action.payload,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }

        case GET_TICKETING:
            return {
                ...state,
                loading: true
            }

        case GET_TICKETING_SUCCESS:
            return {
                ...state,
                loading: false,
                ticketingList: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case ADD_PROMOTIONS:
            return {
                ...state,
                loading: true
            }
        case ADD_PROMOTIONS_SUCCESS:
            return {
                ...state,
                loading: false,

            }
        case GET_USER:
            return {
                ...state,

            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.data
            }
        case GET_TOP_EARNING_ASTROLOGERS:
            return {
                ...state,
                loading: true,
            }
        case GET_TOP_EARNING_ASTROLOGERS_SUCCESS:
            return {
                ...state,
                loading: false,
                topAstrologers: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_TOP_SELLING_PRODUCTS:
            return {
                ...state,
                loading: true,
            }
        case GET_TOP_SELLING_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                topSellingProducts: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_TOP_SELLING_SERVICES:
            return {
                ...state,
                loading: true,

            }
        case GET_TOP_SELLING_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                topSellingServices: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_ORDER_DETAILS_ID:
            return {
                ...state,
                loading: true
            }
        case GET_ORDER_DETAILS_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                orderDetails: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_REFFERED_USERS:
            return {
                ...state,
                loading: false,

            }
        case GET_REFFERED_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                refferedUsser: action.payload,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_REFERRALS:
            return {
                ...state,
                loading: true
            }
        case GET_REFERRALS_SUCCESS:
            return {
                ...state,
                loading: false,
                refferals: action.payload,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_CALL_REQUESTS:
            return {
                ...state,
                laoding: true
            }
        case GET_CALL_REQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                callRequests: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        case GET_BLOGS:
            return {
                ...state,
                loading: true
            }
        case GET_BLOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                blogs: action.payload.data,
                total_count: action.payload.total_count ? action.payload.total_count : 0
            }
        default:
            return state;
    }
}