<template>
  <ul class="q-tree">
    <li v-for="(item, index) in list" :key="index">
      <div class="tree-content" scoped-slots="{item}">{{showKey?item[showKey]:item.name}}</div>
      <span
        v-if="item.children && item.children.length"
        class="toogle"
        @click="onToogle(index)"
      >{{currentIndex === index ? '收起' : '展开'}}</span>
      <q-tree
        v-if="item.children && item.children.length"
        :list="item.children"
        :show-key="showKey"
        :class="{hide: currentIndex !== index}"
      ></q-tree>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'QTree',
  props: {
    list: {
      type: Array,
    },
    showKey: {
      type: String
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
    },
  },
}
</script>
<style lang="stylus">
.q-tree
  text-align left
  list-style none
  ul
    padding-left 20px
  .tree-content
    display inline-block
  .toogle
    cursor pointer
    font-size 12px
    padding 10px
  .hide
    display none
</style>

