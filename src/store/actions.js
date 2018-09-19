import model from '../model/model'
import notify from '../components/notification/function'

export default {
  login ({ commit, state }, { username, password }) {
    return model.login(username, password).then(data => {
      model.token.set(data)
      notify({ content: '登录成功' })
    })
  },
  fetchLinks ({ commit, state }) {
    return model.getLinks().then(res => commit('fillLinks', res))
  },
  fetchTags ({ commit, state }) {
    return model.getTags().then(res => commit('fillTags', res))
  },
  fetchTagPosts ({ commit, state }, { id, data }) {
    return model.getTagPosts(id, data).then(res => commit('fillTagPosts', res))
  },
  fetchPosts ({ commit, state }, data) {
    return model.getPosts(data).then(res => commit('fillPosts', res))
  },
  fetchPost ({ commit, state }, id) {
    return model.getPost(id).then(res => commit('fillPost', res))
  },
  likePost ({ commit, state }, id) {
    commit('addPostLike', parseInt(id))
    return model.likePost(id)
  }
}
