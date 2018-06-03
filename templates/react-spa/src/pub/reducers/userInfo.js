
import * as types from '../actions/types';

export default function(state = {}, action){
    switch(action.type){
        case types.UPDATE_USER_INFO : 
            return action.userInfo;
        default :
            return state;
    }
};



