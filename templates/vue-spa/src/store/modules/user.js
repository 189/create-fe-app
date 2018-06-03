import * as types from "../mutation-types";

function fetch(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve({ code : 0, message : 'success', data : { name : '尼古拉斯凯奇' } });
    }, 2000 )
  })
}
export default {
  state: {
    info: {
      username : ''
    },
    fetching : true
  },

  getters: {},

  mutations: {
    // 获取用户信息
    [types.UPDATE_USER_INFO](state, payload) {
      state.info = payload;
    },
    // 正在获取用户信息过程中
    [types.UPDATE_USER_INFO_PROGRESS](state, fetching) {
      state.fetching = fetching;
    },
    // 用户退出
    [types.LOGOUT](state) {
      state.info = {};
    }
  },
  actions: {
    // 异步获取用户信息
    async [types.UPDATE_USER_INFO](context) {
      const result = await fetch();
      const { code, message, data = {} } = result;

      context.commit(types.UPDATE_USER_INFO_PROGRESS, false);
      if (!code) {
        context.commit(types.UPDATE_USER_INFO, data);
      }
      return result;
    },

    // 异步 退出登录
    async [types.LOGOUT](context) {
      const result = await fetch();
      const { code, message } = result;
      if (!code) {
        context.commit(types.LOGOUT);
      }
      return result;
    }
  }
};
