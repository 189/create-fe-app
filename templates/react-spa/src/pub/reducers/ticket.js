
import * as types from '../actions/types';


export default function(state = {}, action){
    switch(action.types){
        case types.KEEP_TICKET :
            return state.ticket = action.ticket;
        default : 
            return state;
    }
}


// import * as types from '../actions/types';

// export default function(state = {}, action){
//     switch(action.type){
//         case types.UPDATE_USER_INFO : 
//             return action.userInfo;
//         default :
//             return state;
//     }
// };






