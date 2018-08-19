<template>
  <div id="comment">
    <markdown-editor
      preview-class="markdown-body"
      :highlight="true"
      :configs="configs"
      v-model="content"
      ref="markdownEditor"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      configs: {
        toolbar: ['bold', '|', 'italic', '|', 'link', '|', 'preview'],
        placeholder: '支持markdown语法'
      },
      content: ''
    }
  },
  mounted () {

  }
}
</script>

<style lang="stylus" scoped>

</style>
