<template>
  <div id="tag">
    <ul>
      <router-link
        v-for="tag in tags"
        :key="tag.id"
        :to="'/blog/tags/' + tag.id"
      >
        <li :style="'background:' + tag.color">{{tag.name}}</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>


<style lang="stylus" scoped>
ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;

  a {
    margin: .6em .6em 0 0;
  }

  li {
    position: relative;
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 14px 0 22px;
    border-radius: 0 4px 4px 0;
    font-size: .95rem;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    transition: all .5s;

    &:hover {
      background-color: darken(#2196f3, 10) !important;
    }

    &:before {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-width: 15px 15px 15px 0;
      border-color: #fff transparent;
      border-style: solid;
    }

    &:after {
      position: absolute;
      content: '';
      width: 4px;
      height: 4px;
      top: 13px;
      left: 11px;
      border-radius: 100%;
      background: #ffffff;
    }
  }
}
</style>
