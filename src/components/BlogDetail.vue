<template>
  <div id="detail">
    <transition style="position:relative;" :name="transitionName" mode="out-in" v-if="post">
      <blog-detail-content :style="!showDetail ? 'position:absolute;top:0' : ''" v-if="showDetail" key="first" :post="post" @touchstart.native="onTouchstart" @touchend.native="onTouchend" />
      <blog-detail-content :style="showDetail ? 'position:absolute;top:0' : ''" v-else key="last" :post="post" @touchstart.native="onTouchstart" @touchend.native="onTouchend" />
    </transition>
    <!-- <the-comment /> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import notify from './notification/function.js'
import TheComment from './TheComment.vue'
import BlogDetailContent from './BlogDetailContent.vue'

export default {
  components: {
    TheComment,
    BlogDetailContent
  },
  data () {
    return {
      startPageX: 0,
      startPageY: 0,
      showDetail: true,
      transitionName: ''
    }
  },
  asyncData ({ store, router }) {
    return store.dispatch('fetchPost', router.currentRoute.params.id)
  },
  mounted () {
    document.addEventListener('keydown', this.onKeydown)
    !this.post && this.fetchPost(this.postId)
  },
  beforeRouteUpdate (to, from, next) {
    if (!this.posts[to.params.id]) {
      this.fetchPost(to.params.id).then(_ => next())
    } else {
      next()
      this.watchPost(to.params.id)
    }
  },
  beforeRouteLeave (to, from, next) {
    document.removeEventListener('keydown', this.onKeydown)
    if (to.name !== 'blog-list' && to.name !== 'blog-tags') {
      notify({ content: '暂未开放' })
    } else {
      if (to.name === 'blog-list' && !this.postsList[to.query.page || 1]) {
        this.fetchPosts(to.query).then(_ => next())
      } else if (
        to.name === 'blog-tags' &&
        (!this.tagPosts[to.params.id] ||
          !this.tagPosts[to.params.id][to.query.page || 1])
      ) {
        this.fetchTagPosts({ id: to.params.id, data: to.query }).then(_ =>
          next()
        )
      } else next()
    }
  },
  computed: {
    ...mapState(['tagPosts', 'posts', 'postsList']),
    postId: function () {
      return this.$route.params.id
    },
    post: function () {
      return this.posts[this.postId]
    }
  },
  methods: {
    ...mapActions(['fetchTagPosts', 'fetchPost', 'fetchPosts', 'watchPost']),
    onKeydown: function (event) {
      if (event.keyCode === 37 && this.post.prev) {
        this.$router.push('/blog/' + this.post.prev.id)
      } else if (event.keyCode === 39 && this.post.next) {
        this.$router.push('/blog/' + this.post.next.id)
      }
    },
    onTouchstart: function (event) {
      this.startPageX = event.changedTouches[0].pageX
      this.startPageY = event.changedTouches[0].pageY
    },
    onTouchend: function (event) {
      let endPageX = event.changedTouches[0].pageX
      let endPageY = event.changedTouches[0].pageY
      let moveDistanceX = this.startPageX - endPageX
      let moveDistanceY = Math.abs(this.startPageY - endPageY)
      if (moveDistanceY <= 100) {
        if (moveDistanceX >= 100 && this.post.next) {
          this.showDetail = !this.showDetail
          this.transitionName = 'left'
          this.$router.push('/blog/' + this.post.next.id)
        } else if (moveDistanceX <= -100 && this.post.prev) {
          this.showDetail = !this.showDetail
          this.transitionName = 'right'
          this.$router.push('/blog/' + this.post.prev.id)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#detail
  padding 0 .8em
  overflow-x hidden
.right-enter-active, .left-enter-active
  transition all 0.4s ease
.right-leave-active, .left-leave-active
  transition all 0.2s cubic-bezier(1, 0.5, 0.8, 1)
.right-enter, .left-leave-to
  transform translateX(-300px)
  opacity 0
.left-enter, .right-leave-to
  transform translateX(300px)
  opacity 0
</style>
