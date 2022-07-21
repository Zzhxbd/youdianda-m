<template>
  <div class="my-article">
    <van-nav-bar title="我的文章" left-arrow @click-left="$router.back()" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-swipe-cell v-for="obj in newList" :key="obj.id">
        <NewItem :newList="obj"></NewItem>
        <template #right>
          <van-button
            @click="delArticle(obj.id)"
            square
            type="danger"
            text="删除"
            style="height: 100%"
          />
          <van-button
            @click="$router.push({ path: `/release/?id=${obj.id}` })"
            square
            type="primary"
            text="修改"
            style="height: 100%"
          />
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import { myArticle } from '@/api/user'
import NewItem from '@/components/NewItem.vue'
import { delArticles } from '@/api/article'
export default {
  name: 'MyArticle',
  components: {
    NewItem
  },
  data () {
    return {
      newList: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10
    }
  },
  created () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await myArticle({
          page: this.page,
          limit: this.limit
        })
        // console.log(data)
        this.newList.push(...data.data.data)
        this.loading = false
        if (data.data.data.length) {
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
    async delArticle (id) {
      try {
        await delArticles({
          id: id
        })
        const index = this.newList.findIndex((item) => {
          return item.id === id
        })
        this.newList.splice(index, 1)
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.success('操作失败')
        // console.log(err)
      }
    }
  }
}
</script>

<style>
</style>
