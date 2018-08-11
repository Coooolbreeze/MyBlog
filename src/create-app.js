import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './App.vue'
import createRouter from './router/index'
import createStore from './store/index'
import Notification from './components/notification'
import Loading from './components/loading'
import Paginate from './components/paginate'
import Tag from './components/tag'
import Toolbar from './components/toolbar'
import Hlghlight from './components/highlight/highlight'

import 'github-markdown-css/github-markdown.css'
import 'nprogress/nprogress.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Loading)
Vue.use(Paginate)
Vue.use(Tag)
Vue.use(Toolbar)
Vue.use(Hlghlight)

export default () => {
  const router = createRouter()
  const store = createStore()

  // router.beforeEach((to, from, next) => {
  //   // if (from.fullPath !== '/') router.go(0)
  //   NProgress.start()
  //   next()
  // })

  // router.afterEach((to, from) => {
  //   NProgress.done()
  // })

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
