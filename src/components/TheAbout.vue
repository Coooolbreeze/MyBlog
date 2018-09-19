<template>
  <div id="body">
    <div class="container">
      <div class="content">
        <div class="main">
          <h3>关于我</h3>
        </div>
        <div class="sidebar">
          <blog-sidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogSidebar from './BlogSidebar.vue'

export default {
  metaInfo () {
    return {
      title: '关于我',
      meta: [
        {
          name: 'keywords',
          content: '李文祥,李文祥简历,李文祥个人介绍,关于李文祥'
        },
        {
          name: 'description',
          content: '李文祥的个人介绍'
        }
      ]
    }
  },
  components: {
    BlogSidebar
  },
  asyncData ({ store, router }) {
    return Promise.all([
      store.dispatch('fetchLinks'),
      store.dispatch('fetchTags')
    ])
  }
}
</script>


<style lang="stylus" scoped>
#body
  width 100%
  padding-top 0.8em
  box-sizing border-box
.container
  flex-direction column
.content
  display flex
  justify-content space-between
.main
  width 75%
  box-sizing border-box
.sidebar
  width 25%
</style>
