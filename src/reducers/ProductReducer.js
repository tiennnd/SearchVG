import {FETCHING_PRODUCT, FETCHING_PRODUCT_FAILURE, FETCHING_PRODUCT_SUCCESSFUL, GET_RECENT_SEARCH} from '../constants';

const initialState = {
    listProduct: [],
    productFetched: false,
    isFetching: false,
    error: false,
    page:0
}

export default function ProductReducer (state = initialState, action) {
    switch (action.type) {
        case FETCHING_PRODUCT:
            return {
                ...state,
                isFetching:true,
                listProduct:[],
                page:action.page
            }
        case FETCHING_PRODUCT_SUCCESSFUL:
            return {
                ...state,
                listProduct:action.data,
                isFetching:false,
                page:action.page
            }

        case FETCHING_PRODUCT_FAILURE:
            return {
                ...state,
                listProduct:[],
                isFetching:false,
                page:0
            }

        default:
            return{
                ...state
            }
    }
}