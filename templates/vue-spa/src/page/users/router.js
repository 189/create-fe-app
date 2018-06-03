
export default [{
    name : 'users',
    path : '/users',
    title : '用户列表页',
    component : () => import(/* webpackChunkName: "users" */ "./index.vue"),
    children : []
  }
];


