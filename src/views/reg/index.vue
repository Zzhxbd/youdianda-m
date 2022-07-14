<template>
  <div class="reg-container">
    <van-nav-bar title="注册" left-arrow @click-left="$router.back()" />
    <h1 class="title">欢迎注册</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="用户名"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
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
      <van-field
        v-model="user.confirmPwd"
        type="password"
        name="confirmPwd"
        label="确认密码"
        placeholder="确认密码"
        :rules="userFormRules.confirmPwd"
      >
        <van-icon slot="left-icon" name="edit" />
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { regApi } from '@/api/user'
export default {
  data() {
    return {
      user: {
        mobile: '',
        password: '',
        confirmPwd: '',
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
        confirmPwd: [
          { required: true, message: '请确认密码' },
          { validator: this.validatePass2, message: '两次密码不一致' },
        ],
      },
    }
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '注册中...',
        forbidClick: true,
        duration: 0,
      })
      const res = await regApi(this.user)
      console.log(res);
      console.log(res.data.errmsg)
      if(res.data.errmsg==='账号已存在'){
        this.$toast.fail('账号已存在')
        this.$router.push('/login')
      }else if(res.data.errmsg==='注册成功'){
        this.$toast.success('账号成功')
        this.$router.push('/login')
      }
    },
    validatePass2(val) {
      return val === this.user.password
    },
  },
}
</script>

<style lang="less" >
.reg-container {
  .title {
    font-size: 0.8rem;
    color: #1989fa;
    font-weight: 400;
    text-align: center;
  }
}
</style>