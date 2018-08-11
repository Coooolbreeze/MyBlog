import Vue from 'vue'
import Component from './func-loading'

const LoadingConstructor = Vue.extend(Component)

export default class Loading {
  constructor () {
    this.begin()
  }

  begin () {
    if (Vue.prototype.$isServer) return
    this.instance = new LoadingConstructor()
    this.instance.vm = this.instance.$mount()
    document.body.appendChild(this.instance.vm.$el)
  }

  close () {
    this.instance.vm.visible = false
    this.instance.vm.$on('closed', _ => {
      document.body.removeChild(this.instance.vm.$el)
      this.instance.vm.$destroy()
    })
  }
}
