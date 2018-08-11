<template>
  <div id="menu" :class="showClass">
    <router-link to="/login" class="logo">
      <img src="../assets/images/avatar.jpg" alt="logo">
      <div class="cover"></div>
    </router-link>
    <div class="nav">
      <div class="list">
        <ul>
          <router-link to="/blog"><li>首页</li></router-link>
          <router-link to="/blog"><li>技术</li></router-link>
          <router-link to="/note"><li>笔记</li></router-link>
          <router-link to="/talk"><li>闲叙</li></router-link>
          <router-link to="/about"><li>关于</li></router-link>
        </ul>
      </div>
      <div class="search">
        <input type="text" v-model="searchText" @keyup.enter="onSearch">
        <button @click="onSearch">
          <svg class="icon icon-search" aria-hidden="true">
            <use xlink:href="#icon-search" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showClass: '',
      black: false,
      scroll: 0,
      searchText: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', this.menu)
  },
  methods: {
    menu () {
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      let height = document.body.clientHeight
      let width = document.body.clientWidth
      let headerHeight = (height < width ? height : width) * 0.3

      if (scroll > 150 && scroll > this.scroll) {
        this.showClass = 'slideOutUp'
        this.scroll = scroll
      }
      if (scroll < this.scroll) {
        this.showClass = 'slideInDown'
        this.scroll = scroll
      }
      if (scroll > headerHeight) {
        this.showClass += ' black'
      }
    },
    onSearch () {
      if (this.searchText.trim()) {
        window.open('https://www.baidu.com/s?wd=' + this.searchText)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
height = 3em;
logo-size = 2em;

#menu {
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1em;
  width: 100vw;
  height: height;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0.9;
  overflow: hidden;
  animation-duration: 0.5s;
}

.black {
  background-color: rgba(0, 0, 0, 0.9) !important;
}

.logo {
  position: relative;
  width: logo-size;
  height: logo-size;
  min-width: logo-size;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1em;
  cursor: pointer;
  transition: all 0.4s;

  .cover {
    position: absolute;
    width: 100%;
    height: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 0.8s;
  }

  &:hover {
    width: logo-size + 0.2em;
    height: logo-size + 0.2em;
    transform: rotate(-360deg);

    .cover {
      height: 40%;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.nav {
  display: flex;
  flex-direction: row;
  height: 100%;
}

ul,li {
  padding: 0
  margin: 0
  list-style: none
}

.list {
  height: 100%;

  ul {
    display: flex;
    flex-direction: row;
    height: 100%;

    li {
      width: 2em;
      height: 100%;
      padding: 0 0.8em;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s;
      color: #cccccc;
      user-select: none;

      &:hover {
        // background-color: darken(#2196f3, 10);
        background-color: darken(#444444, 10);
        color: darken(#ffffff, 5);
      }
    }
  }
}

.search {
  margin-left: 2em;
  display: flex;
  align-items: center;

  input, button {
    transition: all 0.5s;
    // background: linear-gradient(to bottom, #020106 0%,#000000 100%);
    background: rgba(0, 0, 0, 0)
    border-bottom: 1px solid #999999;
    color: #999999;
  }

  input:focus {
    border-bottom: 1px solid #2196f3;

    &+button {
      border-bottom: 1px solid #2196f3;
    }
  }

  button:hover {
    color: #2196f3;
  }
}

@media (max-width: 720px) {
  #menu {
    height: 2.3em;
    padding: 0 0.5em;

    .logo {
      width: 1.6em;
      height: 1.6em;
      min-width: 1.6em;
    }

    .search {
      display: none;
    }

    .list>ul>a>li {
      padding: 0 0.6em;
      font-size: 1rem;
    }
  }
}

@media (max-width: 375px) {
  #menu {
    height: 2em;

    .logo {
      width: 1.4em;
      height: 1.4em;
      min-width: 1.4em;
    }

    .list>ul>a>li {
      padding: 0 .5em;
      font-size: 1rem;
    }
  }
}
</style>
