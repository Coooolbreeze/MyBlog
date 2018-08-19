<template>
  <div class="article">
    <h1>{{post.title}}</h1>
    <div class="about">
      <i>
        <svg class="icon icon-shijian" aria-hidden="true">
          <use xlink:href="#icon-shijian" />
        </svg>
        <span>{{post.created_at}}</span>
      </i>
      <i>
        <svg class="icon icon-zuozhe" aria-hidden="true">
          <use xlink:href="#icon-zuozhe" />
        </svg>
        <span>{{post.author.nickname}}</span>
      </i>
    </div>
    <div class="detail markdown-body" v-html="post.detail" v-highlight />
    <div :class="['like', isLike ? ' active' : '']">
      <i v-if="isLike" @click.prevent="likeCancel(post.id)">
        <svg class="icon icon-praise-fill" aria-hidden="true">
          <use xlink:href="#icon-praise_fill" />
        </svg>
        <span>{{post.like}}</span>
      </i>
      <i v-else @click.prevent="like(post.id)">
        <svg class="icon icon-praise" aria-hidden="true">
          <use xlink:href="#icon-praise" />
        </svg>
        <span>{{post.like}}</span>
      </i>
    </div>
    <div class="action">
      <router-link v-if="post.prev" :to="'' + post.prev.id">上一篇 {{post.prev.title}}</router-link>
      <div v-else></div>
      <router-link v-if="post.next" :to="'' + post.next.id">下一篇 {{post.next.title}}</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  metaInfo () {
    return {
      title: this.post.title,
      meta: [
        {
          name: 'keywords',
          content: this.tags.join(',')
        },
        {
          name: 'description',
          content: this.post.outline
        }
      ]
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLike: false
    }
  },
  computed: {
    tags: function () {
      this.isLike = false
      let tags = []
      this.post.tags.forEach(tag => tags.push(tag.name))
      return tags
    }
  },
  methods: {
    ...mapActions(['likePost']),
    like: function (id) {
      this.isLike = true
      this.likePost(id)
    },
    likeCancel: function (id) {}
  }
}
</script>


<style lang="stylus" scoped>
.article
  border 1px solid #dedede
  border-radius 5px
  box-shadow 0 0 3px 3px #ededed
  margin-bottom 2em
  background #ffffff
  padding 1em
  h1
    display flex
    justify-content center
    margin 0
    font-size 1.5rem
    font-weight 500
    color #333333
  .about
    display flex
    justify-content center
    align-items center
    margin 1.3em 0
    height 0
    background red
    i
      display flex
      height 0
      align-items center
      font-size 0.9rem
      color #999999
      padding-left 0.5rem
      font-style normal
      &:nth-child(1)
        padding-left 0
      svg
        padding-right 0.2rem
      .icon-haoping
        font-size 0.8rem
  .detail
    margin 1.5em
    margin-top 0
    font-size 1.03rem
    line-height 1.7em
    color #666666
  .like
    width 100%
    display flex
    justify-content center
    align-items center
    margin 2em 0
    user-select none
    i
      display flex
      justify-content center
      align-items center
      min-width 5em
      height 1.8em
      border 1px solid #999999
      border-radius 50px
      box-sizing border-box
      color #999999
      font-size 1.2rem
      padding 0 0.5em
      cursor pointer
      transition 0.3s all
      &:hover
        color #2196f3
        border-color #2196f3 // background: darken(#2196f3, 10);
      span
        font-size 0.8rem
        margin-left 0.1em
        position relative
        bottom 0.2em
    &.active
      i
        color #2196f3
        border-color #2196f3
  .action
    display flex
    justify-content space-between
    margin 0 1.5em
    a
      font-size 1rem
      color #2196f3
      transition all 0.3s
      &:hover
        color darken(#2196f3, 15)
@media (max-width: 720px)
  .article
    h1
      font-size 1.2rem
    .about
      margin 0.3em 0 i
        font-size 0.78rem
    .detail
      margin 0.8em 0
      font-size 0.9rem
      line-height 1.65em
    .action
      flex-direction column
      margin 0
      a
        font-size 0.9rem
      a:first-child
        margin-bottom 0.5em
</style>
