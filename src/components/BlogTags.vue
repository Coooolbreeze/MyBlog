<template>
  <div id="list" v-if="postList">
    <blog-list-card
      v-for="post in postList.data"
      :key="post.id"
      :post="post"
    />

    <paginate
      v-if="postList.data && postList.last_page > 1"
      :page-count="postList.last_page"
      :current-page="page"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import notify from './notification/function.js'
import BlogListCard from './BlogListCard.vue'

export default {
  components: {
    BlogListCard
  },
  asyncData ({ store, router }) {
    return store.dispatch('fetchTagPosts', {
      id: router.currentRoute.params.id,
      data: router.currentRoute.query
    })
  },
  mounted () {
    document.addEventListener('keydown', this.onKeydown)
    !this.postList && this.fetchTagPosts({ id: this.id, data: this.query })
  },
  beforeRouteUpdate (to, from, next) {
    if (!this.tagPosts[to.params.id] || !this.tagPosts[to.params.id][to.query.page || 1]) {
      this.fetchTagPosts({ id: to.params.id, data: to.query }).then(_ => next())
    } else next()
  },
  beforeRouteLeave (to, from, next) {
    document.removeEventListener('keydown', this.onKeydown)
    if (to.name !== 'blog-detail' && to.name !== 'blog-list') notify({ content: '暂未开放' })
    else {
      if (to.name === 'blog-list' && !this.postsList[to.query.page || 1]) {
        this.fetchPosts(to.query).then(_ => next())
      } else if (to.name === 'blog-detail' && !this.posts[to.params.id]) {
        this.fetchPost(to.params.id).then(_ => next())
      } else {
        to.name === 'blog-detail' && this.watchPost(to.params.id)
        next()
      }
    }
  },
  computed: {
    ...mapState(['tagPosts', 'posts', 'postsList']),
    id: function () {
      return this.$route.params.id
    },
    query: function () {
      return this.$route.query
    },
    page: function () {
      return this.query.page ? parseInt(this.query.page) : 1
    },
    postList: function () {
      if (this.tagPosts[this.id]) {
        return this.tagPosts[this.id][this.page]
      }
    }
  },
  methods: {
    ...mapActions(['fetchTagPosts', 'fetchPost', 'fetchPosts', 'watchPost']),
    onKeydown: function (event) {
      if (event.keyCode === 37 && this.page > 1) {
        this.$router.push(this.$route.fullPath + '?page=' + (this.page - 1))
      } else if (event.keyCode === 39 && this.page < this.tagPosts.last_page) {
        this.$router.push(this.$route.fullPath + '?page=' + (this.page + 1))
      }
    }
  }
}
</script>
