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
  </div>
</template>

<script>
import QForm from '@/components/form'
import QFormItem from '@/components/form-item'
import QInput from '@/components/input'
import QAlert from '@/components/alert'

export default {
  name: 'app',
  components: {
    QForm, QFormItem, QInput
  },
  data () {
    return {
      user: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空哦' }],
        password: [{ required: true, message: '密码不能为空哦' }]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs.form.validate((valid) => {
        QAlert({
          message: `验证：${valid ? '成功' : '失败'}`,
          type: valid ? 'success' : 'error'
        })
      })
    }
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
