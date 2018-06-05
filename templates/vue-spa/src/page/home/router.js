
export default [{
  name : 'home',
  path : '/',
  title : '首页',
  component : () => import(/* webpackChunkName: "home" */ "./index.vue"),
  children : []
}
];



