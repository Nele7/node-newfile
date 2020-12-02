const Foo = () => import(/* webpackChunkName: "foo" */ './Foo.vue')
const A = () => import(/* webpackChunkName: "a" */ '@/view/home/a.jsx')
const B = () => import(/* webpackChunkName: "b" */ '@/view/home/b.jsx')
const A = () => import(/* webpackChunkName: "a" */ '@/view/about/a.jsx')
const A = () => import(/* webpackChunkName: "a" */ '@/view/home/a.jsx')
const B = () => import(/* webpackChunkName: "b" */ '@/view/home/b.jsx')
const A = () => import(/* webpackChunkName: "a" */ '@/view/about/a.jsx')
const A = () => import(/* webpackChunkName: "a" */ '@/view/home/a.vue')
const B = () => import(/* webpackChunkName: "b" */ '@/view/home/b.vue')
const A = () => import(/* webpackChunkName: "a" */ '@/view/about/a.vue')
const A = () => import(/* webpackChunkName: "a" */ '@/view/home/a.vue')
const B = () => import(/* webpackChunkName: "b" */ '@/view/home/b.vue')
const A = () => import(/* webpackChunkName: "a" */ '@/view/about/a.vue')
const A = () => import(/* webpackChunkName: "a" */ '@/view/home/a.vue')
const B = () => import(/* webpackChunkName: "b" */ '@/view/home/b.vue')
const A = () => import(/* webpackChunkName: "a" */ '@/view/about/a.vue')
const A = () => import(/* webpackChunkName: "a" */ '@/view/home/a.vue')
const B = () => import(/* webpackChunkName: "b" */ '@/view/home/b.vue')
const A = () => import(/* webpackChunkName: "a" */ '@/view/about/a.vue')

/** autoRouteStart */
const routes = [
  {
    path: '/approval',
    name: 'approval',
    component: () => Foo,
    meta: { title: '待办' },
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/b',
    name:'b',
    component: () => B,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/b',
    name:'b',
    component: () => B,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/b',
    name:'b',
    component: () => B,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/b',
    name:'b',
    component: () => B,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/b',
    name:'b',
    component: () => B,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
  {
    path:'/b',
    name:'b',
    component: () => B,
  },
  {
    path:'/a',
    name:'a',
    component: () => A,
  },
]
/** autoRouteEnd */
export default routes
