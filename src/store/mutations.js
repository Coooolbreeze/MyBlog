import marked from 'marked'

export default {
  fillLinks (state, links) {
    state.links = links
  },
  fillTags (state, tags) {
    state.tags = tags.data
  },
  fillTagPosts (state, tagPosts) {
    state.tagPosts = Object.assign({}, state.tagPosts, {
      [tagPosts.id]: Object.assign({}, state.tagPosts[tagPosts.id], {
        [tagPosts.posts.current_page]: tagPosts.posts
      })
    })
  },
  fillPosts (state, posts) {
    state.postsList = Object.assign({}, state.postsList, {
      [posts.current_page]: posts
    })
  },
  fillPost (state, post) {
    post.detail = marked(post.detail, { sanitize: true })
    state.posts = Object.assign({}, state.posts, { [post.id]: post })
    tagPostsAdd(state, post.id)
    postsListAdd(state, post.id)
  },
  addPostWatch (state, id) {
    tagPostsAdd(state, id)
    postsListAdd(state, id)
    postsAdd(state, id)
  },
  addPostLike (state, id) {
    tagPostsAdd(state, id, 'like')
    postsListAdd(state, id, 'like')
    postsAdd(state, id, 'like')
  }
}

function tagPostsAdd (state, id, key = 'watch') {
  for (let item in state.tagPosts) {
    blockEach(state.tagPosts[item])
  }

  function blockEach (tag) {
    for (let item1 in tag) {
      for (let item2 in tag[item1].data) {
        if (tag[item1].data[item2].id === id) {
          tag[item1].data[item2][key]++
          return
        }
      }
    }
  }
}

function postsAdd (state, id, key = 'watch') {
  for (let item in state.posts) {
    if (state.posts[item].id === id) {
      state.posts[item][key]++
      return
    }
  }
}

function postsListAdd (state, id, key = 'watch') {
  for (let item1 in state.postsList) {
    for (let item2 in state.postsList[item1].data) {
      if (state.postsList[item1].data[item2].id === id) {
        state.postsList[item1].data[item2][key]++
        return
      }
    }
  }
}
