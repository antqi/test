import './tree.styl'

export default {
  name: 'QTree',
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {
      currentIndex: -1,
    }
  },
  render(h) {
    return (
      <ul class="q-tree">
        {this.list.map((item, index) => {
          const toggleIcon = this.currentIndex === index ? '收起' : '展开'
          const toogleAttrs = {
            on: {
              click: () => {
                this.onToogle(index)
              },
            },
          }
          const attrs = {
            class: {
              hide: this.currentIndex !== index,
            },
            props: {
              list: item.children,
            },
          }

          return (
            <li>
              {item.name}
              {item.children && item.children.length ? (
                <span class="toogle" {...toogleAttrs}>
                  {toggleIcon}
                </span>
              ) : (
                ''
              )}
              {item.children && item.children.length ? (
                <q-tree {...attrs}></q-tree>
              ) : (
                ''
              )}
            </li>
          )
        })}
      </ul>
    )
  },
  methods: {
    onToogle(index) {
      this.currentIndex = this.currentIndex === index ? -1 : index
    },
  },
}
