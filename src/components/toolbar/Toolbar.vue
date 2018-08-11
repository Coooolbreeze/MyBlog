<template>
  <div id="toolbar">
    <div class="top" @click="smoothscroll" v-show="show">
      <img src="../../assets/images/top.png">
    </div>
    <div class="home" @click="goHome" v-show="this.$route.path !== '/blog'">
      <img src="../../assets/images/home.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
  },
  methods: {
    scroll () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      this.show = (scroll > 100)
    },
    smoothscroll () {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.smoothscroll)
        window.scrollTo(0, currentScroll - (currentScroll / 5))
      }
    },
    goHome () {
      this.$router.push('/blog')
    }
  }
}
</script>


<style lang="stylus" scoped>
#toolbar {
  display flex
  flex-direction column
  position fixed
  bottom 1.5em
  right 1.5em
}

.top,.home {
  background rgba(0, 0, 0, .7)
  align-items center
  justify-content center
  width: 2.2em
  height: 2.2em
  cursor: pointer
  padding: .25em
  box-sizing: border-box
}

.top {
  padding: .25em .19em .25em .31em
}

.home {
  margin-top: .3em
}

img {
  width: 100%
  height: 100%
}
</style>
