<template>
  <div class="new-container">
    <van-cell  @click="goArticle(newList)">
      <div slot="title">{{ newList.title }}</div>
      <div slot="default">
        <van-image
          width="100%"
          height="100"
          :src="'http://124.223.14.236:8060/' + newList.pic"
        />
      </div>
      <div slot="label">
        <div class="van-multi-ellipsis--l2">{{ newList.description }}</div>
        <div>
          <span> <van-icon name="like-o" />收藏({{ newList.lovenum }}) </span>
          <span> <van-icon name="good-job-o" />点赞({{ newList.click }}) </span>
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
      type: Object,
      required: true
    }
  },
  methods: {
    goArticle (obj) {
      this.$router.push({
        path: 'articles',
        query: {
          id: obj.id
        }
      })
    }
  }
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
