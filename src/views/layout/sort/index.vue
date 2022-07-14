<template>
  <div class="sort-container">
    <van-nav-bar title="分类" placeholder fixed/>
    <van-grid :column-num="2">
      <van-grid-item
        v-for="(cate, index) in allCate"
        :key="index"
        @click="goList(index,cate.id)"
      >
        <i slot="icon" class="fa cate.icon" :class="cate.icon"></i>
        <div slot="text" class="catename">{{ cate.catename }}</div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getIndexApi } from '@/api/home'
export default {
  name: 'sortIndex',
  data() {
    return {
      allCate: [],
    }
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
    goList(index){
      this.$router.push({
        name:'list',
        query:{
          idx:index
        }
      })
    }
  },
}
</script>


<style lang='less'>
.sort-container {
  .catename {
    color: #646566;
    font-size: 0.32rem;
    line-height: 1.5;
    word-break: break-all;
    margin-top: 0.21333rem;
  }
}
</style>