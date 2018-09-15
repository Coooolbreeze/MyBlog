import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const isDev = process.env.NODE_ENV === 'development'

const state = {
  token: null,
  refresh_token: null,
  links: null,
  tags: null,
  tagPosts: {},
  posts: {},
  post: {}
}

export default _ => {
  const store = new Vuex.Store({
    strict: isDev,
    state,
    mutations,
    getters,
    actions
  })

  if (module.hot) {
    module.hot.accept(['./mutations', './getters', './actions'], _ => {
      const newMutations = require('./mutations').default
      const newGetters = require('./getters').default
      const newActions = require('./actions').default

      store.hotUpdate({
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
