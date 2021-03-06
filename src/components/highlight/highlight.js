import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

let Highlight = {}

Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach(block => {
      hljs.highlightBlock(block)
    })
  })
}

window.hljs = hljs

export default Highlight
