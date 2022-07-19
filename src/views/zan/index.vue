<template>
  <div class="zan">
    <van-nav-bar title="我的点赞" left-arrow @click-left="$router.back()" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <NewItem :newList="newList"></NewItem>
    </van-list>
  </div>
</template>

<script>
import { mySaseOrZan } from '@/api/user'
import NewItem from '@/components/NewItem.vue'
export default {
  name: 'Zan',
  components: {
    NewItem,
  },
  data() {
    return {
      newList: [],
      loading: false,
      finished: false,
      type: 2,
      page: 1,
      limit: 10,
    }
  },
  created() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await mySaseOrZan({
          type: this.type,
          page: this.page,
          limit: this.limit,
        })
        // console.log(data)
        this.newList.push(...data.data.list.data)
        this.loading = false
        if (data.data.list.data.length) {
          this.page++
        } else {
          this.finished = true
          this.loading = false
        }
      } catch (err) {
        console.log(err)
        this.$toast('数据错误')
      }
    },
  },
}
</script>

<style>
</style>