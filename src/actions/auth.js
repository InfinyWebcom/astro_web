import {
    LOGIN,
    LOGIN_SUCCESS,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    INIT_URL,
    HIDE_MESSAGE,
    API_FAILED,
    GET_ASTROLOGERS,
    GET_ASTROLOGERS_SUCCESS,
    ADDEDIT_ASTROLOGERS,
    ADDEDIT_ASTROLOGERS_SUCCESS,
    API_SUCCESS,
    ADDEDIT_SERVICES,
    LIST_SERVICES,
    LIST_SERVICES_SUCCESS,
    ADD_PRODUCTS,
    LIST_PRODUCTS,
    LIST_PRODUCTS_SUCCESS,
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
    LIST_CONSUMERS,
    LIST_CONSUMERS_SUCCESS,
    LIST_SETTLEMENTS,
    LIST_SETTLEMENTS_SUCCESS,
    LIST_SETTLEMENTS_ASTRO,
    LIST_SETTLEMENTS_ASTRO_SUCCESS,
    LIST_TRANSACTIONS,
    LIST_TRANSACTIONS_SUCCESS,
    GET_GRAPH_DATA,
    GET_GRAPH_DATA_SUCCESS,
    GET_NEW_SERVICE,
    GET_NEW_SERVICE_SUCCESS,
    GET_NEW_ORDER,
    GET_NEW_ORDER_SUCCESS,
    GET_NEW_REPORT,
    GET_NEW_REPORT_SUCCESS,
    GET_RATINGS,
    GET_RATINGS_SUCCESS,
    GET_TICKETING,
    GET_TICKETING_SUCCESS,
    ADD_PROMOTIONS,
    ADD_PROMOTIONS_SUCCESS,
    GET_USER_SUCCESS,
    GET_USER,
    GET_TOP_SELLING_PRODUCTS,
    GET_TOP_SELLING_PRODUCTS_SUCCESS,
    GET_TOP_SELLING_SERVICES,
    GET_TOP_SELLING_SERVICES_SUCCESS,
    GET_TOP_EARNING_ASTROLOGERS,
    GET_TOP_EARNING_ASTROLOGERS_SUCCESS,
    GET_ORDER_DETAILS_ID,
    GET_ORDER_DETAILS_ID_SUCCESS,
    GET_REFERRALS,
    GET_REFERRALS_SUCCESS,
    GET_REFFERED_USERS,
    GET_REFFERED_USERS_SUCCESS, GET_CALL_REQUESTS, GET_CALL_REQUESTS_SUCCESS, GET_BLOGS, GET_BLOGS_SUCCESS
} from '../constants/ActionTypes';

export const login = (data, history) => {
    return {
        type: LOGIN,
        payload: { data, history }
    }
}

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const apiFailed = (data) => {
    return {
        type: API_FAILED,
        payload: data
    }
}
export const showAuthLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    };
};
export const hideAuthLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};
export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const getastrologerList = (data) => {
    return {
        type: GET_ASTROLOGERS,
        payload: data
    }
}
export const getastrologerListSuccess = (data) => {
    return {
        type: GET_ASTROLOGERS_SUCCESS,
        payload: data
    }
}
export const addEditAstrolger = (data, history) => {
    return {
        type: ADDEDIT_ASTROLOGERS,
        payload: { data, history }
    }
}
export const addEditAstrolgerSuccess = (data) => {
    return {
        type: ADDEDIT_ASTROLOGERS_SUCCESS,
        payload: data
    }
}
export const addEditServices = (data, history) => {
    return {
        type: ADDEDIT_SERVICES,
        payload: { data, history }
    }
}

export const apiSuccess = (data) => {
    return {
        type: API_SUCCESS,
        payload: data
    }
}

export const listServices = (data, history) => {
    return {
        type: LIST_SERVICES,
        payload: { data, history }
    }
}
export const listServicesSuccess = (data) => {
    return {
        type: LIST_SERVICES_SUCCESS,
        payload: data
    }
}

export const listProduct = (data, history) => {
    return {
        type: LIST_PRODUCTS,
        payload: { data, history }
    }
}

export const listProductsSuccess = (data) => {
    return {
        type: LIST_PRODUCTS_SUCCESS,
        payload: data
    }
}
export const addEditProducts = (data, history) => {
    return {
        type: ADD_PRODUCTS,
        payload: { data, history }
    }
}
export const listTotd = (data, history) => {
    return {
        type: LIST_TOTD,
        payload: { data, history }
    }
}
export const listTotdSuccess = (data) => {
    return {
        type: LIST_TOTD_SUCCESS,
        payload: data
    }
}

export const listOrder = (data, history) => {
    return {
        type: ORDER_LIST,
        payload: { data, history }
    }
}

export const listOrderSuccess = (data) => {
    return {
        type: ORDER_LIST_SUCCESS,
        payload: data
    }
}

export const serviceRequestList = (data, history) => {
    return {
        type: SERVICE_REQUEST_LIST,
        payload: { data, history }
    }
}
export const serviceRequestListSuccess = (data) => {
    return {
        type: SERVICE_REQUEST_LIST_SUCCESS,
        payload: data
    }
}

export const getOrderCount = (data, history) => {
    return {
        type: GET_NEW_ORDER_COUNT,
        payload: { data, history }
    }
}

export const getOrderCountSuccess = (data) => {
    return {
        type: GET_NEW_ORDER_COUNT_SUCCESS,
        payload: data
    }
}

export const listPromotions = (data, history) => {
    return {
        type: LIST_PROMOTIONS,
        payload: { data, history }
    }
}

export const listPromotionsSuccess = (data) => {
    return {
        type: LIST_PROMOTIONS_SUCCESS,
        payload: data
    }
}

export const listConsumers = (data, history) => {
    return {
        type: LIST_CONSUMERS,
        payload: { data, history }
    }
}

export const listConsumersSuccess = (data) => {
    return {
        type: LIST_CONSUMERS_SUCCESS,
        payload: data
    }
}

export const listSettlements = (data, history) => {
    return {
        type: LIST_SETTLEMENTS,
        payload: { data, history }
    }
}

export const listSettlementsSuccess = (data) => {
    return {
        type: LIST_SETTLEMENTS_SUCCESS,
        payload: data
    }
}

export const astroSettlements = (data, history) => {
    return {
        type: LIST_SETTLEMENTS_ASTRO,
        payload: { data, history }
    }
}

export const astroSettlementsSuccess = (data) => {
    return {
        type: LIST_SETTLEMENTS_ASTRO_SUCCESS,
        payload: data
    }
}

export const listTransactions = (data, history) => {
    return {
        type: LIST_TRANSACTIONS,
        payload: { data, history }
    }
}

export const listTransactionsSuccess = (data) => {
    return {
        type: LIST_TRANSACTIONS_SUCCESS,
        payload: data
    }
}

export const getGraphdata = (data, history) => {
    return {
        type: GET_GRAPH_DATA,
        payload: { data, history }
    }
}

export const getGraphdataSuccess = (data) => {
    return {
        type: GET_GRAPH_DATA_SUCCESS,
        payload: data
    }
}

export const getNewService = (data, history) => {
    return {
        type: GET_NEW_SERVICE,
        payload: { data, history }
    }
}

export const getNewServiceSuccess = (data) => {
    return {
        type: GET_NEW_SERVICE_SUCCESS,
        payload: data
    }
}

export const getNewOrder = (data, history) => {
    return {
        type: GET_NEW_ORDER,
        payload: { data, history }
    }
}

export const getNewOrderSuccess = (data) => {
    return {
        type: GET_NEW_ORDER_SUCCESS,
        payload: data
    }
}
export const getNewReport = (data, history) => {
    return {
        type: GET_NEW_REPORT,
        payload: { data, history }
    }
}
export const getNewReportSuccess = (data) => {
    return {
        type: GET_NEW_REPORT_SUCCESS,
        payload: data
    }
}

export const getRatings = (data, history) => {
    return {
        type: GET_RATINGS,
        payload: { data, history }
    }
}

export const getRatingsSuccess = (data) => {
    return {
        type: GET_RATINGS_SUCCESS,
        payload: data
    }
}

export const getTicketing = (data, history) => {
    return {
        type: GET_TICKETING,
        payload: { data, history }
    }
}

export const getTicketingSuccess = (data) => {
    return {
        type: GET_TICKETING_SUCCESS,
        payload: data
    }
}

export const addPromotions = (data, history) => {
    return {
        type: ADD_PROMOTIONS,
        payload: { data, history }
    }
}

export const addPromotionsSuccess = (data) => {
    return {
        type: ADD_PROMOTIONS_SUCCESS,
        payload: { data }
    }
}

export const getUser = (data, history) => {
    return {
        type: GET_USER,
        payload: { data, history }
    }
}

export const getUserSuccess = (data) => {
    return {
        type: GET_USER_SUCCESS,
        payload: data
    }
}

export const getTopSellingProduct = (data, history) => {
    return {
        type: GET_TOP_SELLING_PRODUCTS,
        payload: { data, history }
    }
}

export const getTopSellingProductSuccess = (data) => {
    return {
        type: GET_TOP_SELLING_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const getTopSellingServices = (data, history) => {
    return {
        type: GET_TOP_SELLING_SERVICES,
        payload: { data, history }
    }
}

export const getTopSellingServicesSuccess = (data) => {
    return {
        type: GET_TOP_SELLING_SERVICES_SUCCESS,
        payload: data
    }
}

export const getTopAstrolgers = (data, history) => {
    return {
        type: GET_TOP_EARNING_ASTROLOGERS,
        payload: { data, history }
    }
}
export const getTopAstrologerSuccess = (data) => {
    return {
        type: GET_TOP_EARNING_ASTROLOGERS_SUCCESS,
        payload: data
    }
}

export const getOrderDetailsId = (data, history) => {
    return {
        type: GET_ORDER_DETAILS_ID,
        payload: { data, history }
    }
}
export const getOrderDetailsIdSuccess = (data) => {
    return {
        type: GET_ORDER_DETAILS_ID_SUCCESS,
        payload: data
    }
}

export const getRefferals = (data, history) => {
    return {
        type: GET_REFERRALS,
        payload: { data, history }
    }
}

export const getRefferalsSuccess = (data) => {
    return {
        type: GET_REFERRALS_SUCCESS,
        payload: data
    }
}

export const getRefferedUsers = (data, history) => {
    return {
        type: GET_REFFERED_USERS,
        payload: { data, history }
    }
}

export const getRefferedUsersSuccess = (data) => {
    return {
        type: GET_REFFERED_USERS_SUCCESS,
        payload: data
    }
}

export const getCallRequests = (data, history) => {
    return {
        type: GET_CALL_REQUESTS,
        payload: { data, history }
    }
}

export const getCallRequestsSuccess = (data) => {
    return {
        type: GET_CALL_REQUESTS_SUCCESS,
        payload: data
    }
}

export const getBlogsList = (data) => {
    return {
        type: GET_BLOGS,
        payload: data
    }
}

export const getBlogsListSuccess = (data) => {
    return {
        type: GET_BLOGS_SUCCESS,
        payload: data
    }
}