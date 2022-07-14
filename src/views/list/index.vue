<template>
  <div class="list-container">
    <van-nav-bar left-arrow @click-left="$router.back()" fixed placeholder>
      <div slot="title">列表</div>
    </van-nav-bar>
    <!-- 标签 -->
    <van-tabs v-model="active" animated swipeable > 
      <van-tab
        :title="cate.catename"
        v-for="(cate, index) in allCate"
        :key="index"
      >
        <ListOne :cate="cate"></ListOne>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getIndexApi } from '@/api/home'
import ListOne from '@/views/list/components/LIstOne.vue'
export default {
  name: 'ListIndex',
  data() {
    return {
      active: this.$route.query.idx,
      allCate: [],
    }
  },
  components: {
    ListOne,
  },
  created() {
    this.loadGetIndex()
  },
  methods: {
    async loadGetIndex() {
      try {
        const { data } = await getIndexApi()
        // console.log(data)
        this.allCate = data.data.allCate
      } catch (err) {
        // console.log(err)
        this.$toast('数据错误')
      }
    },
   
  },
}
</script>

<style lang='less'>
.list-container{
    padding-top: 88px;
    .van-tabs__wrap{
        position: fixed;
        top: 92px;
        left: 0;
        right: 0;
        z-index: 999;
    }
}
</style>