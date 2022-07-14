<template>
  <div class="home-container">
    <van-nav-bar title="首页" fixed placeholder />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="obj in banners" :key="obj.id">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="'http://122.51.249.55:8060/' + obj.advimgsrc"
        />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      left-icon="volume-o"
      text="定远吴彦祖!!!   定远吴彦祖!!!    定远吴彦祖!!!    定远吴彦祖!!!    定远吴彦祖!!!    定远吴彦祖!!!"
    />
    <div class="main">
      <div slot="title" class="title">热门推荐</div>
      <van-row gutter="6">
        <van-col
          span="8"
          v-for="obj in hotList"
          :key="obj.id"
          @click="goArticle(obj)"
        >
          <van-image
            width="110px"
            height="90px"
            fit="cover"
            lazy-load
            :src="'http://122.51.249.55:8060/' + obj.pic"
          />
          <p class="title-text">{{ obj.title }}</p>
        </van-col>
      </van-row>
    </div>
    <van-cell>
      <div slot="title" class="title">最近更新</div>
      <div slot="default">
        <span>24小时: </span>
        <span>/1周: </span>
      </div>
    </van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <NewItem :newList='newList'></NewItem>
    </van-list>
  </div>
</template>

<script>
import { getIndexApi, getHotApi, getNewApi } from '@/api/home'
import NewItem from '@/components/NewItem.vue'
export default {
  name: 'Home',
  data() {
    return {
      page: 1,
      limit: 10,
      newList: [],
      loading: false,
      finished: false,
      banners: [],
      hotList: [],
    }
  },
  components: {
    NewItem,
  },
  created() {
    this.loadGetIndex()
    this.loadGetHot()
  },
  methods: {
    async loadGetIndex() {
      const { data } = await getIndexApi()
      // console.log(data)
      this.banners = data.data.banner
    },
    async loadGetHot() {
      const { data } = await getHotApi()
      // console.log(data)
      this.hotList = data.data.list
    },
    goArticle(obj) {
      this.$router.push({
        path: 'articles',
        query: {
          id: obj.id,
        },
      })
    },
    async onLoad() {
      const { data } = await getNewApi({
        page: this.page,
        limit: this.limit,
      })
      //   console.log(data);
      this.newList = [...this.newList, ...data.data.list.data]
      this.loading = false
      if (data.data.list.data.length) {
        this.page++
      } else {
        this.finished = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang='less'>
.home-container {
  .my-swipe .van-swipe-item {
    height: 345px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .main {
    margin: 0 30px;
    /* 推荐歌单 - 歌名 */
    .title-text {
      margin: 0;
      font-size: 0.346667rem;
      padding: 0 0.08rem;
      margin-bottom: 0.266667rem;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 2; /** 显示的行数 **/
      overflow: hidden; /** 隐藏超出的内容 **/
      text-align: center;
    }
  }
  .title {
    color: #1989fa !important;
    font-weight: 700;
    font-size: 28px;
  }
}
</style>