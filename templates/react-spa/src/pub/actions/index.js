/**
 * kv.wang87@gmail.com
 * 2017-10-11
 */
import * as types from './types';

// 更新用户信息
export function updateUserInfo(userInfo){
    return {
        type : types.UPDATE_USER_INFO,
        userInfo
    };
}

// 登录密钥管理
export function keepTicket(ticket){
    return {
        type : types.KEEP_TICKET,
        ticket
    };
}



