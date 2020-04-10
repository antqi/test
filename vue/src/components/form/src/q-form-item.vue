<template>
  <div class="q-form-item">
    <label>{{label}}</label>
    <slot></slot>
    <span class="error-msg">{{error}}</span>
  </div>
</template>

<script>
export default {
  name: 'q-form-item',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      error: ''
    }
  },
  mounted () {
    if (this.prop) {
      this.form.$emit('form.addFiled', { item: this })
    }
  },
  methods: {
    validate () {

      const rule = this.form.rules[this.prop]
      const value = this.form.model[this.prop]

      for (let i = 0; i < rule.length; i++) {
        if (rule[i].required && !value) {
          this.error = rule[i].message
          return false
        }
      }

      return true
    }
  },
}
</script>

<style lang="stylus">
.error-msg
  color red
</style>