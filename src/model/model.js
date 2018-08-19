import Request from 'request'

class Model extends Request {
  login (username, password) {
    return this.post('/login', { username, password })
  }

  getLinks () {
    return this.get('/links', { noLoad: true })
  }

  getTags () {
    return this.get('/tags', { noLoad: true })
  }

  getTagPosts (id, data) {
    return this.get(`/tags/${id}`, { ...data, limit: 8 })
  }

  getPosts (data) {
    return this.get('/posts', { ...data, limit: 8 })
  }

  getPost (id) {
    return this.get(`/posts/${id}`)
  }

  watchPost (id) {
    return this.put(`/posts/${id}/watch`, { noLoad: true })
  }

  likePost (id) {
    return this.put(`/posts/${id}/like`, { noLoad: true })
  }
}

export default new Model()
