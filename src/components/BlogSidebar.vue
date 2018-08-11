<template>
  <div id="sidebar">
    <the-card-for-blog-tags />
    <the-card-for-links />
  </div>
</template>

<script>
import TheCardForBlogTags from './TheCardForBlogTags.vue'
import TheCardForLinks from './TheCardForLinks.vue'

export default {
  components: {
    TheCardForBlogTags,
    TheCardForLinks
  }
}
</script>


<style lang="stylus" scoped>
#sidebar {
  display: flex;
  flex-direction column
}
</style>
