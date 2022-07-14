<template>
  <div class="new-container">
    <van-cell v-for="obj in newList" :key="obj.id" @click="goArticle(obj)">
      <div slot="title">{{ obj.title }}</div>
      <div slot="default">
        <van-image
          width="100%"
          height="100"
          :src="'http://122.51.249.55:8060/' + obj.pic"
        />
      </div>
      <div slot="label">
        <div class="van-multi-ellipsis--l2">{{ obj.description }}</div>
        <div>
          <span> <van-icon name="like-o" />收藏({{ obj.lovenum }}) </span>
          <span> <van-icon name="good-job-o" />点赞({{ obj.click }}) </span>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'newItem',
  props: {
    newList: {
      type: Array,
    },
  },
  methods: {
    goArticle(obj) {
      this.$router.push({
        path: 'articles',
        query: {
          id: obj.id,
        },
      })
    },
  },
}
</script>

<style lang='less'>
.new-container {
  .van-cell__value {
    flex: unset;
    padding-left: 10px;
  }
}
</style>