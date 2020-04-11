<template>
  <div class="q-alert" :class="type" v-if="isShow">
    <h2>{{ title}}</h2>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'QAlert',
  data () {
    return {
      duration: 2000,
      type: 'info',
      isShow: false,
      title: '提示',
      message: ''
    }
  },
  methods: {
    show () {
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.hide()
      }, this.duration)
    },
    hide () {
      this.remove()
    }
  },
}
</script>

<style lang="stylus">
.q-alert
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%)
  background-color color
  box-shadow 1px 2px 17px #ccc
  border-radius 4px
  padding 10px 20px 30px 20px
  min-width 280px
  text-align center
  &.error
    color red
  &.warn
    color yellow
  &.success
    color green
</style>