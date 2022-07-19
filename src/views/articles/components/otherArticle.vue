<template>
  <div class="otherArticle">
    <van-cell>
      <div slot="title" class="title">相关推荐</div>
    </van-cell>
    <van-grid :column-num="2">
      <van-grid-item v-for="obj in recommend" :key="obj.id" class="grid-item" @click="$emit('otherArticle',obj.id)" >
        <div slot="default" class="default">
          <van-image
            :src="'http://124.223.14.236:8060/' + obj.pic"
            width="120px"
            height="100px"
          />
          <div class="van-multi-ellipsis--l2 text">{{ obj.title }}</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'otherArticle',
  props: {
    recommend: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang='less'>
.otherArticle {
  .title {
    font-size: 0.42667rem;
  }
  .grid-item {
    height: 344px;
  }
  .text{
    font-size: 12px;
    padding-top: 20px;
  }
  .default{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>