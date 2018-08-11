<template>
  <div id="links">
    <h3>友情链接</h3>
    <ul v-if="links">
      <li v-for="link in links" :key="link.id">
        <a :href="link.url" target="_blank">{{link.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    !this.links && this.fetchLinks()
  },
  computed: {
    ...mapState(['links'])
  },
  methods: {
    ...mapActions(['fetchLinks'])
  }
}
</script>

<style lang="stylus" scoped>
#links {
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
    width: 4.2em;
  }

  &:hover {
    border: 1px solid #ececec;
    box-shadow: 1px 1px 20px 7px #ececec;

    h3 {
      width 5em;
    }
  }

  ul {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      height: 1em;
      font-size: .95rem;
      cursor: pointer;
      user-select: none;
      margin: .6em .6em 0 0;

      &:nth-last-child(1) {
        margin-right: 0
      }

      a {
        transition: all .5s;
        border-bottom: 1px solid #ffffff;

        &:hover {
          color: darken(#2196f3, 10);
          border-bottom-color: darken(#2196f3, 10);
        }
      }
    }
  }
}
</style>
