<template>
  <div class="my-container">
    <van-nav-bar title="我的">
      <template #right>
        <van-icon
          name="setting-o"
          size="18"
          @click="
            $router.push({
              name: 'revise',
            })
          "
        />
      </template>
    </van-nav-bar>
    <div class="userInfo" v-if="$store.state.token">
      <van-image
        class="avatar"
        round
        :src="'http://124.223.14.236:8060/' + userInfo.icon"
      />
      <span class="text">{{ userInfo.username }}</span>
    </div>
    <div class="getLogin" v-else @click="loginFn">
      <div class="left">
        <van-image
          class="avatar"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="text">
          <div class="text1">请登录</div>
          <div class="text2">登录后更加精彩</div>
        </div>
      </div>
      <div class="right">
        <van-icon name="arrow" />
      </div>
    </div>
    <van-grid class="grid" :column-num="3">
      <van-grid-item icon="like-o" text="收藏" />
      <van-grid-item icon="good-job-o" text="点赞" />
      <van-grid-item icon="newspaper-o" text="文章" />
    </van-grid>
    <van-cell-group class="group">
      <van-cell title="我的文章" is-link to="/myarticle">
        <van-icon slot="icon" name="newspaper-o" />
      </van-cell>
      <van-cell title="我的点赞" is-link to="/zan">
        <van-icon slot="icon" name="good-job-o" />
      </van-cell>
      <van-cell title="我的收藏" is-link to="/save">
        <van-icon slot="icon" name="like-o" />
      </van-cell>
    </van-cell-group>
    <div class="logoutBtn">
      <van-button type="info" block @click="logoutFn" v-if="$store.state.token"
        >立即退出</van-button
      >
    </div>
  </div>
</template>

<script>
import { userInfoApi } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      userInfo: {}, //用户信息
    }
  },
  computed: {
    ...mapState(['token']),
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    logoutFn() {
      this.$dialog
        .confirm({
          title: '确认退出?',
        })
        .then(() => {
          this.$store.commit('setToken', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    loginFn() {
      this.$router.push('/login')
    },
    async loadUserInfo() {
      try {
        if (this.token) {
          const res = await userInfoApi()
          // console.log(res);
          this.userInfo = res.data.data.userInfo
        } else {
          return
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang='less'>
.my-container {
  .userInfo {
    display: flex;
    height: 3.08rem;
    padding: 0.30667rem 0.42667rem 0.30667rem;
    box-sizing: border-box;
    align-items: center;
    background-color: #1989fa;
    .avatar {
      width: 130px;
      height: 130px;
    }
    .text {
      margin-left: 20px;
      font-size: 0.48rem;
      color: #fff;
      font-weight: bold;
    }
  }
  .getLogin {
    display: flex;
    height: 3.08rem;
    padding: 0.30667rem 0.42667rem 0.30667rem;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-color: #1989fa;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      // flex-direction: column;
      .avatar {
        width: 130px;
        height: 130px;
      }
      .text {
        margin-left: 20px;
        color: #fff;
        .text1 {
          font-size: 0.48rem;
        }
        .text2 {
          font-size: 12px;
        }
      }
    }
    .right {
      color: #fff;
    }
  }
  .grid {
    .van-grid-item {
      height: 140px;
    }
    .van-grid-item__text {
      margin: 0;
    }
  }
  .group {
    .van-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 40px;
        margin-right: 10px;
      }
    }
  }
  .logoutBtn {
    padding: 0 0.26667rem;
  }
}
</style>