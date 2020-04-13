<template>
  <div id="app">
    <h2>表单</h2>
    <q-form :rules="rules" :model="user" ref="form">
      <q-form-item label="用户名" prop="name">
        <q-input v-model="user.name" placeholder="username"></q-input>
      </q-form-item>
      <q-form-item label="密码" prop="password">
        <q-input type="password" v-model="user.password" placeholder="password"></q-input>
      </q-form-item>
      <q-form-item>
        <button type="button" @click="onLogin">登录</button>
      </q-form-item>
    </q-form>
    <q-tree :data="list"></q-tree>
  </div>
</template>

<script>
import QForm from '@/components/form'
import QFormItem from '@/components/form-item'
import QInput from '@/components/input'
import QAlert from '@/components/alert'
import QTree from '@/components/tree'

export default {
  name: 'app',
  components: {
    QForm,
    QFormItem,
    QInput,
    QTree,
  },
  data () {
    return {
      user: {
        name: '',
        password: '',
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空哦' }],
        password: [{ required: true, message: '密码不能为空哦' }],
      },
      list: [
        {
          id: '8004601d-e9d8-52ae-8c31-051e499db583',
          name: 'vessels',
          color: '#5c8b5d',
        },
        {
          id: '82c52393-ff2e-582b-8ab8-15be15396812',
          name: 'tool',
          color: '#b20171',
          children: [
            {
              id: '359800ad-2b3f-5635-a676-54244222bc46',
              name: 'loss',
              color: '#601513',
            },
            {
              id: '359800ad-2b3f-5635-a676-54244222bc46',
              name: 'loss',
              color: '#601513',
            },
          ],
        },
        {
          id: '6a5baa04-5d7d-57b1-bfc4-9afa80a8f5f1',
          name: 'thy',
          color: '#e8a356',
          children: [
            {
              id: 'a84ff0ef-646b-55b7-8db6-0a23a7c0ffb3',
              name: 'using',
              color: '#c673fc',
            },
            {
              id: 'a84ff0ef-646b-55b7-8db6-0a23a7c0ffb3',
              name: 'using',
              color: '#c673fc',
            },
          ],
        },
        {
          id: '8f033a90-aebe-5615-8c2e-853fab92d0d8',
          name: 'pick',
          color: '#c52186',
        },
        {
          id: 'b1f2b22f-c862-5179-98d3-c419b22c0b32',
          name: 'canal',
          color: '#9b58a9',
          children: [
            {
              id: '2a0da72d-ea77-5b64-a615-4431f8656845',
              name: 'buried',
              color: '#0cd64e',
              children: [
                { id: '6a0eba4f-058f-5da3-b093-002bd736f5ce', name: 'police', color: '#56a68b' },
                { id: 'b4dcebff-c459-5ae9-b50b-3c480e511172', name: 'therefore', color: '#5bbf59' },
                { id: 'bcd7a1ee-ae17-5133-a76c-c910ee53379c', name: 'gas', color: '#a83353' },
                { id: '9ca7b2e0-9ece-5aca-bc6f-33fdd4e1e2c2', name: 'someone', color: '#a6d07e' },
              ]
            },
            {
              id: '2a0da72d-ea77-5b64-a615-4431f8656845',
              name: 'buried',
              color: '#0cd64e',
            },
          ],
        },
        {
          id: '1a730ba0-7597-58a4-9bc1-c53afeb30a32',
          name: 'cotton',
          color: '#184229',
        },
      ],
    }
  },
  methods: {
    onLogin () {
      this.$refs.form.validate((valid) => {
        QAlert({
          message: `验证：${valid ? '成功' : '失败'}`,
          type: valid ? 'success' : 'error',
        })
      })
    },
  },
}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
