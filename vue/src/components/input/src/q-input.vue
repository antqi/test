<template>
  <div class="q-input">
    <input :type="type" :placeholder="placeholder" :value="value" @input="onInput" />
  </div>
</template>

<script>
export default {
  name: 'q-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  },
}
</script>

<style>
</style>