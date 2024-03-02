const c1 = () => import(/* webpackChunkName: "page--src--pages--blog-vue" */ "/Users/mh97888/Downloads/git/Azderica.github.io/src/pages/Blog.vue")
const c2 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/mh97888/Downloads/git/Azderica.github.io/node_modules/gridsome/app/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/mh97888/Downloads/git/Azderica.github.io/src/pages/Index.vue")

export default [
  {
    path: "/blog/",
    component: c1
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    name: "home",
    path: "/",
    component: c3
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
