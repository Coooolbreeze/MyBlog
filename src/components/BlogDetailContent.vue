<template>
  <div class="article">
    <h1>{{post.title}}</h1>
    <div class="about">
      <i>
        <svg class="icon icon-riqi" aria-hidden="true">
          <use xlink:href="#icon-riqi" />
        </svg>
        <span>{{post.created_at}}</span>
      </i>
      <i>
        <svg class="icon icon-zuozhe" aria-hidden="true">
          <use xlink:href="#icon-zuozhe" />
        </svg>
        <span>{{post.author.nickname}}</span>
      </i>
      <!-- <i>
        <svg class="icon icon-liulan1" aria-hidden="true">
          <use xlink:href="#icon-liulan1" />
        </svg>
        {{post.watch}}
      </i>
      <i>
        <svg class="icon icon-haoping" aria-hidden="true">
          <use xlink:href="#icon-haoping" />
        </svg>
        {{post.like}}
      </i> -->
    </div>
    <div class="detail markdown-body" v-html="post.detail" v-highlight />
    <div class="action">
      <router-link v-if="post.prev" :to="'' + post.prev.id">上一篇 {{post.prev.title}}</router-link>
      <div v-else></div>
      <router-link v-if="post.next" :to="'' + post.next.id">下一篇 {{post.next.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: this.post.title,
      meta: [{
        name: 'keywords',
        content: this.tags.join(',')
      }, {
        name: 'description',
        content: this.post.outline
      }]
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags: function () {
      let tags = []
      this.post.tags.forEach(tag => tags.push(tag.name))
      return tags
    }
  }
}
</script>


<style lang="stylus" scoped>
.article {
  border: 1px solid #dedede;
  border-radius: 5px;
  box-shadow: 0 0 3px 3px #ededed;
  margin-bottom: 2em;
  background: #ffffff;
  padding: 1em;

  h1 {
    display: flex;
    justify-content: center;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    color: #333333;
  }

  .about {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: .9em 0;

    i {
      display: flex;
      align-items: center;
      font-size: .9rem;
      color: #999999;
      padding-left: .5rem;
      font-style: normal;

      &:nth-child(1) {
        padding-left: 0;
      }

      svg {
        padding-right: 0.2rem;
      }

      .icon-haoping {
        font-size: 0.8rem;
      }
    }
  }

  .detail {
    margin: 1.5em;
    margin-top: 0;
    font-size: 1.03rem;
    line-height: 1.7em;
    color: #666666;
  }

  .action {
    display: flex;
    justify-content: space-between;
    margin: 0 1.5em;

    a {
      font-size: 1rem;
      color: #2196f3;
      transition: all 0.3s;

      &:hover {
        color: darken(#2196f3, 15);
      }
    }
  }
}

@media (max-width: 720px) {
  .article {
    h1 {
      font-size: 1.2rem
    }

    .about {
      margin: .3em 0

      i {
        font-size: .78rem
      }
    }

    .detail {
      margin: .8em 0;
      font-size: .9rem;
      line-height: 1.65em;
    }

    .action {
      flex-direction: column;
      align-items: flex-end;
      margin: 0;

      a {
        font-size: .9rem;
      }

      a:first-child {
        margin-bottom: .5em;
      }
    }
  }
}
</style>
