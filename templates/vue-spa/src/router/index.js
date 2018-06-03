import Vue from "vue";
import VueRouter from "vue-router";
import * as types from "@/store/mutation-types";
import store from "@/store";

import Users from '@/page/users/router';

Vue.use(VueRouter);

const routes = [
  ...Users
];

const scrollBehavior = (to, from, savedPostion) => {
  const { hash, matched } = to,
    position = {};
  // 浏览器前进/后退 返回到上次浏览的位置
  if (savedPostion) {
    return savedPostion;
  }
  // 锚点
  if (hash) {
    position.selector = hash;
  }
  if (matched.some(m => m.meta.scrollTop)) {
    position.x = 0;
    position.y = 0;
  }
  return position;
};

const r = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior
});

if (__DEV__) {
  console.table(routes);
  window.r = r;
}

r.beforeEach(async (to, from, next) => {
  next();
  document.title = to.title || '页面标题';
});

export default r;
