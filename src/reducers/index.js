import {combineReducers} from 'redux';
import productData from './ProductReducer';

const productReducer = combineReducers({
    productData
})

export default productReducer;