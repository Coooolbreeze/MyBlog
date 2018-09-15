import marked from 'marked'

export default {
  fillLinks (state, links) {
    state.links = links
  },
  fillTags (state, tags) {
    state.tags = tags.data
  },
  fillTagPosts (state, tagPosts) {
    state.tagPosts = tagPosts

    // state.tagPosts = Object.assign({}, state.tagPosts, {
    //   [tagPosts.id]: Object.assign({}, state.tagPosts[tagPosts.id], {
    //     [tagPosts.posts.current_page]: tagPosts.posts
    //   })
    // })
  },
  fillPosts (state, posts) {
    state.posts = posts
  },
  fillPost (state, post) {
    post.detail = marked(post.detail, { sanitize: true })
    state.post = post
  }
}
