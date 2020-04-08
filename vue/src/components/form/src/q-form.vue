<template>
  <form class="q-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'q-form',
}
</script>

<style lang="stylus" >
.q-form
  display inline-block
  text-align initial
</style>
