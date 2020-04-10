<template>
  <div class="q-form-item">
    <label>{{label}}</label>
    <slot></slot>
    <span class="error-msg">{{error}}</span>
  </div>
</template>

<script>

import Schema from 'async-validator'

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
      const schema = new Schema({ [this.prop]: rule })

      return schema.validate({
        [this.prop]: value
      }, (error, filed) => {
        if (error) {
          this.error = error[0].message
        } else {
          this.error = ''
        }
      })
    }
  },
}
</script>

<style lang="stylus">
.error-msg
  color red
</style>