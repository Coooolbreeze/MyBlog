<template>
  <div id="body">
    <div class="container">
      <div class="content">
        <div class="main">
          <router-view />
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
#body {
  width: 100%;
  padding-top: .8em;
  box-sizing: border-box;
}

.container {
  flex-direction column;
}

.content {
  display: flex;
  justify-content space-between
}

.main {
  width: 75%;
  padding: 0 .8em;
  box-sizing: border-box;
}

.sidebar {
  width: 25%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 1366px) {
  .container {
    width: 95%;
  }
}

@media (max-width: 1200px) {
  .main {
    width: 70%;
  }

  .sidebar {
    width: 30%;
  }
}

@media (max-width: 960px) {
  .container {
    width: 100%;
  }

  .main {
    width: 100%;
  }

  .sidebar {
    display: none;
  }
}
</style>
