<template>
  <div class="save">
    <van-nav-bar title="我的收藏" left-arrow @click-left="$router.back()" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell>
        <NewItem :newList="newList"></NewItem>
        <template #right>
          <van-button square type="primary" text="取消收藏" style="height:100%"/>
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { mySaseOrZan } from '@/api/user'
import NewItem from '@/components/NewItem.vue'
export default {
  name: 'Save',
  components: {
    NewItem,
  },
  data() {
    return {
      newList: [],
      loading: false,
      finished: false,
      type: 1,
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