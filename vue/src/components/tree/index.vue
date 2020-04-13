<template>
  <ul class="q-tree">
    <li v-for="(item,index) in  data" :key="index">
      {{item.name}}
      <span
        class="toogle"
        @click="onToogle(index)"
        v-if="item.children"
      >{{currentIndex===index?'收起':'展开'}}</span>
      <q-tree
        :class="{hide:currentIndex!==index}"
        :data="item.children"
        v-if="item.children&&item.children.length"
      ></q-tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'QTree',
  props: {
    data: {
      type: Array,
      // default: []
    }
  },
  data () {
    return {
      currentIndex: -1
    }
  },
  methods: {
    onToogle (index) {
      this.currentIndex = this.currentIndex === index ? -1 : index
    }
  },
}
</script>

<style lang="stylus">
.q-tree
  text-align left
  list-style none
  ul
    padding-left 20px
  .toogle
    cursor pointer
    font-size 12px
  .hide
    display none
</style>