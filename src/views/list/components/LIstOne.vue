<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <newItem :newList="newList"></newItem>
    </van-list>
  </div>
</template>

<script>
import { getList } from '@/api/list'
import newItem from '@/components/NewItem.vue'
export default {
  props: {
    cate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      limit: 20,
      newList: [],
      loading: false,
      finished: false,
      error: false,
    }
  },
  components: {
    newItem,
  },
  created() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getList({
          page: this.page,
          limit: this.limit,
          cateid: this.cate.id,
        })
        // console.log(data)
        this.loading=false
        this.newList = [...this.newList, ...data.data.list.data]
        if (data.data.list.data.length < 20) {
          this.finished = true
        } else {
          this.page++
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style>
</style>