<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <h1 class="title">优点达资讯</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="用户名"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        maxlength="11"
        ><van-icon slot="left-icon" name="contact"
      /></van-field>

      <van-field
        v-model="user.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="userFormRules.password"
      >
        <van-icon slot="left-icon" name="edit" />
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <router-link to="/reg" class="goReg">没有账号立即注册</router-link>
  </div>
</template>

<script>
import { loginApi } from '@/api/user'
export default {
  data() {
    return {
      user: {
        mobile: '',
        password: '',
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
          },
          {
            pattern:
              /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            message: '手机号格式错误',
          },
        ],
        password: [
          { required: true, message: '密码不能为空' },
          { pattern: /^[0-9A-Za-z]{6,16}$/, message: '密码必须6-16位' },
        ],
      },
    }
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0,
      })
      const res = await loginApi(this.user)
      // console.log(res)
      if (res.data.errno === 0) {
        this.$toast.success('登录成功')
        // 保存token
        this.$store.commit('setToken', res.data.data.token)
        if (this.$route.query.url) {
          this.$router.push(`/${this.$route.query.url}`)
        } else {
          this.$router.push('/my')
        }
      } else if (res.data.errno === 1000) {
        this.$toast.fail('密码错误')
      }
    },
  },
}
</script>

<style lang="less" >
.login-container {
  .title {
    font-size: 0.8rem;
    color: #1989fa;
    font-weight: 400;
    text-align: center;
  }
  .goReg {
    font-size: 12px;
    float: right;
    margin-right: 40px;
  }
}
</style>