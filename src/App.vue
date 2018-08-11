<template>
  <div id="app">
    <div id="cover"></div>
    <the-menu />
    <the-header />
    <div class="bg">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <toolbar />
    <the-footer />
  </div>
</template>

<script>
import TheMenu from './components/TheMenu.vue'
import TheHeader from './components/TheHeader.vue'
import TheLogin from './components/TheLogin.vue'
import TheBlog from './components/TheBlog.vue'
import BlogList from './components/BlogList.vue'
import BlogListCard from './components/BlogListCard.vue'
import BlogSidebar from './components/BlogSidebar.vue'
import BlogDetail from './components/BlogDetail.vue'
import BlogDetailContent from './components/BlogDetailContent.vue'
import BlogTags from './components/BlogTags.vue'
import TheCardForBlogTags from './components/TheCardForBlogTags.vue'
import TheCardForLinks from './components/TheCardForLinks.vue'
import TheAbout from './components/TheAbout.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  metaInfo () {
    return {
      title: '李文祥的个人博客'
    }
  },
  components: {
    TheMenu,
    TheHeader,
    TheLogin,
    TheBlog,
    BlogList,
    BlogListCard,
    BlogSidebar,
    BlogDetail,
    BlogDetailContent,
    BlogTags,
    TheCardForBlogTags,
    TheCardForLinks,
    TheAbout,
    TheFooter
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 0, 0.1);
  opacity: 0.1;
  z-index: -1;
}

.bg {
  // background: linear-gradient(to bottom, #fffef4 0%,#ffffff 100%);
  background: #ffffff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
