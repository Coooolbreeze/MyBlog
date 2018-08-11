import marked from 'marked'

export default {
  fillLinks (state, links) {
    state.links = links
  },
  fillTags (state, tags) {
    state.tags = tags.data
  },
  fillTagPosts (state, tagPosts) {
    state.tagPosts = Object.assign({},
      state.tagPosts,
      { [tagPosts.id]: Object.assign({},
        state.tagPosts[tagPosts.id],
        { [tagPosts.posts.current_page]: tagPosts.posts }
      )}
    )
  },
  fillPosts (state, posts) {
    state.postsList = Object.assign({}, state.postsList, { [posts.current_page]: posts })
  },
  fillPost (state, post) {
    post.detail = marked(post.detail, { sanitize: true })
    state.posts = Object.assign({}, state.posts, { [post.id]: post })
    tagPostsWatch(state, post.id)
    postsListWatch(state, post.id)
  },
  addPostWatch (state, id) {
    tagPostsWatch(state, id)
    postsListWatch(state, id)
    postsWatch(state, id)
  }
}

function tagPostsWatch (state, id) {
  for (let item in state.tagPosts) {
    blockEach(state.tagPosts[item])
  }

  function blockEach (tag) {
    for (let item1 in tag) {
      for (let item2 in tag[item1].data) {
        if (tag[item1].data[item2].id === id) {
          tag[item1].data[item2].watch++
          return
        }
      }
    }
  }
}

function postsWatch (state, id) {
  for (let item in state.posts) {
    if (state.posts[item].id === id) {
      state.posts[item].watch++
      return
    }
  }
}

function postsListWatch (state, id) {
  for (let item1 in state.postsList) {
    for (let item2 in state.postsList[item1].data) {
      if (state.postsList[item1].data[item2].id === id) {
        state.postsList[item1].data[item2].watch++
        return
      }
    }
  }
}
