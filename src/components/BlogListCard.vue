<template>
  <router-link :to="'/blog/' + post.id">
    <div class="card">
      <h1>{{post.title}}</h1>
      <div class="content">
        <div class="image">
          <img :src="post.image.src">
        </div>
        <div class="outline">
          <p>{{post.outline}}</p>
          <div class="info">
            <!-- <i>
              <svg class="icon icon-zuozhe" aria-hidden="true">
                <use xlink:href="#icon-zuozhe" />
              </svg>
              {{post.author.nickname}}
            </i> -->
            <i>
              <svg class="icon icon-riqi" aria-hidden="true">
                <use xlink:href="#icon-riqi" />
              </svg>
              {{post.created_at}}
            </i>
            <div class="view-like">
              <i>
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
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: .8em;
  padding: 0.8em;
  background: #ffffff;
  box-shadow: 4px 3px 10px 1px #ececec;
  border: 1px solid #ececec;
  cursor: pointer;
  transition: all .3s linear;

  &:hover {
    // position: relative;
    // bottom: 1px;
    // right: 1px;
    box-shadow: 6px 6px 15px 2px rgba(60, 60, 60, .1);
  }

  h1 {
    display: flex;
    justify-content: center;
    margin: 0;
    padding-bottom: 0.6em;
    font-weight: 500;
    font-size: 1.4rem;
    color: #333333;
  }

  .content {
    display: flex;

    .image {
      width: 14em;
      height: 8em;
      margin-right: 0.8em;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        transition: all 0.6s;

        &:hover {
          transform: scale(1.4);
        }
      }
    }

    .outline {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 75%;

      p {
        margin: 0;
        line-height: 1.4em;
        font-size: 1.03rem;
        color: #666666;
        // text-indent: 2em;
      }

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .view-like {
          display: flex;
          justify-content: flex-end;
        }

        i {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #999999;
          padding-left: 0.5rem;
          font-style: normal;

          &:nth-child(1) {
            padding-left: 0;
          }

          svg {
            padding-right: 0.2rem;
          }

          .icon-haoping {
            font-size: 0.75rem;
          }
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .card {
    h1 {
      font-size: 1.2rem;
    }

    .content {
      flex-direction: column;

      .image {
        width: 100%;
        height: 45vw;
      }

      .outline {
        width: 100%;

        p {
          font-size: 0.9rem;
          line-height: 1.5em;
          padding: 0.5em 0;
        }
      }
    }
  }
}
</style>
