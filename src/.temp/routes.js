const c1 = () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/mh97888/Downloads/git/Azderica.github.io/src/templates/Tag.vue")
const c2 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/mh97888/Downloads/git/Azderica.github.io/node_modules/gridsome/app/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/mh97888/Downloads/git/Azderica.github.io/src/templates/Post.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/mh97888/Downloads/git/Azderica.github.io/src/pages/Index.vue")

export default [
  {
    path: "/tag/:id/",
    component: c1
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    path: "/:slug/",
    component: c3
  },
  {
    name: "home",
    path: "/",
    component: c4
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
