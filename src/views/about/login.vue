<template>
  <div class="login-container">
    <van-nav-bar title="登录网易云音乐"
      left-text="返回"
      left-arrow />

    <div class="form-container">
      <van-field v-model="tel"
        type="tel"
        label="手机号" />
      <van-field v-model="password"
        type="password"
        label="密码" />

      <van-button type="info"
        @click="invokeLogin"
        size="small">登录</van-button>

    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Toast } from 'vant'

export default {
  data () {
    return {
      tel: '',
      password: ''
    }
  },
  mounted () {

  },
  methods: {
    ...mapMutations(['setLoginData']),
    async invokeLogin () {
      const { password, tel } = this
      if (!password || !tel) return
      try {
        const data = await this.$api.post(`/api/login/cellphone?phone=${tel}&password=${password}`)
        if (data.code === 200) {
          const { token, account, profile } = data
          this.setLoginData({ token, account, profile })
          this.$router.push({ path: '/' })
        } else {
          Toast.fail(data.message)
        }
      } catch (error) {
        console.error('error', error)
        Toast.fail(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #f4f4f4;
  height: 100%;

  .form-container {
    margin: 20px 0;
    text-align: center;
  }
}
</style>
