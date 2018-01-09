import reducer from './reducers'
import thunk from 'redux-thunk'
import {applyMiddleware, createStore} from 'redux'

let store = createStore(reducer, applyMiddleware(thunk))
export default store;