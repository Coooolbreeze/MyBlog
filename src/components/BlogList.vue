<template>
  <div id="list" v-if="posts.data">
    <transition style="position:relative;" :name="transitionName" mode="out-in">
      <div :style="!showDetail ? 'position:absolute;top:0' : ''" v-if="showDetail" key="first">
        <blog-list-card
          v-for="post in posts.data"
          :key="post.id"
          :post="post"
          @touchstart.native="onTouchstart"
          @touchend.native="onTouchend"
        />
      </div>
      <div :style="showDetail ? 'position:absolute;top:0' : ''" v-else key="last">
        <blog-list-card
          v-for="post in posts.data"
          :key="post.id"
          :post="post"
          @touchstart.native="onTouchstart"
          @touchend.native="onTouchend"
        />
      </div>
    </transition>

    <paginate
      v-if="posts.data && posts.last_page > 1"
      :page-count="posts.last_page"
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
    console.log(router.currentRoute.query)
    return store.dispatch('fetchPosts', router.currentRoute.query)
  },
  data () {
    return {
      startPageX: 0,
      startPageY: 0,
      showDetail: true,
      transitionName: ''
    }
  },
  mounted () {
    document.addEventListener('keydown', this.onKeydown)
    !this.posts.data && this.fetchPosts(this.query)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchPosts(to.query).then(_ => next())
  },
  beforeRouteLeave (to, from, next) {
    document.removeEventListener('keydown', this.onKeydown)
    if (to.name !== 'blog-detail' && to.name !== 'blog-tags') notify({ content: '暂未开放' })
    else {
      if (to.name === 'blog-tags') {
        this.fetchTagPosts({ id: to.params.id, data: to.query }).then(_ => next())
      } else if (to.name === 'blog-detail') {
        this.fetchPost(to.params.id).then(_ => next())
      } else next()
    }
  },
  computed: {
    ...mapState(['posts']),
    query: function () {
      return this.$route.query
    },
    page: function () {
      return this.query.page ? parseInt(this.query.page) : 1
    }
  },
  methods: {
    ...mapActions(['fetchPosts', 'fetchPost', 'fetchTagPosts']),
    onKeydown: function (event) {
      if (event.keyCode === 37 && this.page > 1) {
        this.$router.push(this.$route.path + '?page=' + (this.page - 1))
      } else if (event.keyCode === 39 && this.page < this.posts.last_page) {
        this.$router.push(this.$route.path + '?page=' + (this.page + 1))
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
        if (moveDistanceX >= 100 && this.page < this.posts.last_page) {
          this.showDetail = !this.showDetail
          this.transitionName = 'left'
          this.$router.push(this.$route.path + '?page=' + (this.page + 1))
        } else if (moveDistanceX <= -100 && this.page > 1) {
          this.showDetail = !this.showDetail
          this.transitionName = 'right'
          this.$router.push(this.$route.path + '?page=' + (this.page - 1))
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#list
  padding: 0 .8em
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

