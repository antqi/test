<template>
  <div>
    <h2>自定义 Vuex</h2>
    <dt>
      <dl>{{count}}</dl>
      <dl>
        <button @click="onAdd">commit +1</button>
      </dl>
      <dl>
        <button @click="onAddSync">actions +1 {{loading?'...':''}}</button>
      </dl>
    </dt>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {

    count () {

      return this.$store.state.count
    }
  },
  methods: {
    onAdd () {
      this.$store.commit('increment')
    },
    onAddSync () {
      this.loading = true
      this.$store.dispatch('increment').then(res => {
        this.loading = false
      })
    }
  },
}
</script>

<style>
</style>