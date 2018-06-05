
export default [{
  name : 'about',
  path : '/about',
  title : '关于我们',
  component : () => import(/* webpackChunkName: "about" */ "./index.vue"),
  children : []
}
];


