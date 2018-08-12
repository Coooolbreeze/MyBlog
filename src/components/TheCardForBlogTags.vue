<template>
  <div id="tags">
    <h3>标签云</h3>
    <tag v-if="tags" :tags="tags" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    !this.tags && this.fetchTags()
  },
  computed: {
    ...mapState(['tags'])
  },
  methods: {
    ...mapActions(['fetchTags'])
  }
}
</script>


<style lang="stylus" scoped>
#tags {
  padding: 1em;
  background: #ffffff;
  border: 1px solid #ececec;
  border-radius: 3px;
  box-shadow: 0 0 20px 5px #ececec;
  margin-bottom: .8em;

  h3 {
    user-select none
    font-size: 1.2rem
    color: #333333;
    margin: 0 0 .8em 0;
    padding-bottom: .5em
    border-bottom 2px solid #acacac
    transition all .5s
    width: 3.2em;
  }

  &:hover {
    border: 1px solid #ececec;
    box-shadow: 1px 1px 20px 7px #ececec;

    h3 {
      width 4em;
    }
  }
}
</style>
