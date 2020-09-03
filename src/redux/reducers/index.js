import { combineReducers } from 'redux'
import courses from './coursereducer'
import authors from './authorreducer'
import apiCallsInProgress from './apisStatusReducer'

const rootReducer = combineReducers({
    courses,
    authors,
    apiCallsInProgress
});

export default rootReducer