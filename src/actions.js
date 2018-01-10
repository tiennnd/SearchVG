import {FETCHING_PRODUCT_FAILURE, FETCHING_PRODUCT_SUCCESSFUL, FETCHING_PRODUCT, GET_RECENT_SEARCH} from './constants'
import crawlProduct from './web'

export function getListProduct(key, page) {
    return {
        type: FETCHING_PRODUCT,
        page
    }
}

export function getProductFailure() {
    return {
        type: FETCHING_PRODUCT_FAILURE
    }
}

export function getProductSuccessful(data, page) {
    return {
        type: FETCHING_PRODUCT_SUCCESSFUL,
        data: data,
        page
    }
}


export function fetchProduct(key, page) {
    return (dispatch) => {
        dispatch(getListProduct(key, page));

        crawlProduct(key, page)
            .then((data) => {
                dispatch(getProductSuccessful(data, page))
            })
            .catch(error => {
                console.log('error', error);
                dispatch(getProductFailure())
            })
    }
}
