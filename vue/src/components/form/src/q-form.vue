<template>
  <form class="q-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'q-form',
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  provide () {
    return {
      form: this,
    }
  },
  data () {
    return {
      fileds: [],
    }
  },
  created () {
    this.initialFiled()
  },
  methods: {
    initialFiled () {
      this.$on('form.addFiled', (filed) => {
        this.fileds.push(filed)
      })
    },
    validate (cb) {
      let b = true
      let tasks = this.fileds.map((filed) => {
        return filed.item.validate()
      })

      Promise.all(tasks).then(res => {
        cb(true)
      }).catch(err => {
        cb(false)
      })
    },
  },
}
</script>

<style lang="stylus">
.q-form
  display inline-block
  text-align initial
</style>
