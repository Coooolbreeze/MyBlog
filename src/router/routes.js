export default [
  {
    path: '/',
    redirect: '/blog'
  },
  {
    path: '/login',
    component: _ => import(/* webpackChunkName: "login-view" */'../components/TheLogin.vue'),
    name: 'login'
  },
  {
    path: '/blog',
    component: _ => import(/* webpackChunkName: "blog-view" */'../components/TheBlog.vue'),
    children: [
      {
        path: '',
        component: _ => import(/* webpackChunkName: "blog-list-view" */'../components/BlogList.vue'),
        name: 'blog-list'
      },
      {
        path: 'tags/:id',
        component: _ => import(/* webpackChunkName: "blog-tags-view" */'../components/BlogTags.vue'),
        name: 'blog-tags'
      },
      {
        path: ':id',
        component: _ => import(/* webpackChunkName: "blog-detail-view" */'../components/BlogDetail.vue'),
        name: 'blog-detail'
      }
    ]
  },
  {
    path: '/about',
    component: _ => import(/* webpackChunkName: "about-view" */'../components/TheAbout.vue'),
    name: 'about'
  }
]
