import Vue from 'vue'
import createApp from './create-app'
import bus from './util/bus'

import Hlghlight from './components/highlight/highlight'
import VueSimplemde from 'vue-simplemde'

import './assets/lib/iconfont'

Vue.use(Hlghlight)
Vue.use(VueSimplemde)

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

bus.$on('auth', _ => {
  router.push('/login')
})

router.onReady(_ => {
  app.$mount('#root')
})
