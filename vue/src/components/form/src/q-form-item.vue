<template>
  <div class="q-form-item">
    <label>{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'q-form-item',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
</style>