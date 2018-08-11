<template>
  <div id="tag">
    <ul>
      <li
        v-for="tag in tags"
        :key="tag.id"
        :style="'background:' + tag.color"
        @click="switchTag(tag.id)"
      >
        {{tag.name}}
      </li>
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
  },
  data () {
    return {
      colors: [
        '#006699',
        '#0066cc',
        '#0066ff',
        '#00cc66',
        '#00cc99',
        '#00cccc',
        '#00ccff',
        '#990000',
        '#990033',
        '#990066',
        '#990099',
        '#9900ff',
        '#993300',
        '#9999ff',
        '#cc00ff',
        '#cc6600',
        '#cc0033',
        '#cc99ff',
        '#ccccff',
        '#ff0000',
        '#ff0066',
        '#ff3366',
        '#ff33ff',
        '#ffcc00',
        '#ff9900'
      ]
    }
  },
  methods: {
    switchTag (tag) {
      this.$emit('tagClick', tag)
    },
    randomNum (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        default:
          return 0
      }
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

  li {
    position: relative;
    display: flex;
    align-items: center;
    height: 30px;
    margin: .6em .6em 0 0;
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

    &:nth-last-child(1) {
      margin-right: 0
    }

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
