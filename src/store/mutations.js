import marked from 'marked'

export default {
  fillLinks (state, links) {
    state.links = links
  },
  fillTags (state, tags) {
    state.tags = tags.data
  },
  fillTagPosts (state, tagPosts) {
    state.tagPosts = tagPosts.posts

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
  },
  addPostLike (state, id) {
    tagPostsLike(state, id)
    postsLike(state, id)
    postLike(state, id)
  }
}

function tagPostsLike (state, id) {
  for (let item in state.tagPosts.data) {
    if (state.tagPosts.data[item].id === id) {
      state.tagPosts.data[item].like++
      return
    }
  }
}

function postsLike (state, id) {
  for (let item in state.posts.data) {
    if (state.posts.data[item].id === id) {
      state.posts.data[item].like++
      return
    }
  }
}

function postLike (state, id) {
  if (state.post.id === id) {
    state.post.like++
  }
}
