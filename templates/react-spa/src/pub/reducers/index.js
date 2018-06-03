
import { combineReducers } from 'redux';
import userInfo from './userInfo';
import ticket from './ticket';

const rootReducer = combineReducers({ userInfo, ticket });

export default rootReducer;



