<template>
  <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
    <div class="notification" :style="style" v-show="visible" @mouseenter="clearTimer" @mouseleave="createTimer">
      <span class="content">{{content}}</span>
      <a class="btn" @click="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    style () {
      return {}
    }
  },
  methods: {
    handleClose (e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave () {
      this.$emit('closed')
    },
    afterEnter () {},
    clearTimer () {},
    createTimer () {}
  }
}
</script>


<style lang="stylus" scoped>
.notification
  display flex
  background-color #303030
  color rgba(255, 255, 255, 1)
  align-items center
  padding 1em
  position fixed
  min-width 13em
  max-width 60vw
  box-shadow 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.2)
  flex-wrap wrap
  transition all 0.3s
.content
  padding 0
  user-select none
.btn
  user-select none
  color #ff4081
  padding-left 1em
  margin-left auto
  cursor pointer
.fade-enter-active, .fade-leave-active
  transition opacity 0.5s
.fade-enter, .fade-leave-to
  opacity 0
</style>
