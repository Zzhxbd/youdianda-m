<template>
  <div class="article-item">
    <van-cell>
      <h1 slot="title" class="title">{{ articleInfo.title }}</h1>
      <div slot="label" class="label">
        <div class="top">
          <van-image
            class="left"
            fit="cover"
            round
            :src="'http://124.223.14.236:8060/' + articleInfo.pic"
          />
          <div class="right">
            <div class="top">{{ articleInfo.author }}</div>
            <div class="bottom">
              {{ articleInfo.create_date | relativeTime }}
            </div>
          </div>
        </div>
      </div>
    </van-cell>
    <div
      v-html="articleInfo.content"
      class="article-content markdown-body"
      ref="article-content"
    ></div>
    <div class="end">
      <van-divider>正文结束</van-divider>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import '@/utils/dayjs'
export default {
  name: 'ArticleItem',
  props: {
    articleInfo: {
      type: Object,
      required: true,
    },
  },
  created() {
    setTimeout(() => {
      this.imagePreview()
    }, 1000)
  },
  methods: {
    imagePreview() {
      setTimeout(() => {
        const articleContent = this.$refs['article-content']
        const imgs = articleContent.querySelectorAll('img')
        // console.log(this.$refs['article-content'])
        // console.log(imgs);
        const images = []
        imgs.forEach((imgs, index) => {
          images.push(imgs.src)
          imgs.onclick = () => {
            ImagePreview({
              images,
              startPosition: index,
            })
          }
        })
      }, 0)
    },
  },
}
</script>

<style lang='less'>
.article-item {
  .title {
    font-size: 0.53333rem;
    margin: 0;
    color: #3a3a3a;
    padding: 0.66667rem 0;
  }
  .label {
    .top {
      display: flex;
      align-items: center;
      .left {
        width: 64px;
        height: 64px;
      }
      .right {
        padding-left: 20px;
        .top {
          font-size: 0.32rem;
          color: #3a3a3a;
        }
        .bottom {
          font-size: 0.30667rem;
          color: #b7b7b7;
        }
      }
    }
    .bottom {
      margin: 0px 0px 16px;
      padding: 0px;
      font-size: 52px;
      color: rgb(34, 34, 34);
      line-height: 1.5;
      font-family: PingFangSC-Regular, 'Microsoft YaHei', Arial, '\\5B8B体',
        'Arial Narrow';
      white-space: normal;
      background-color: rgb(255, 255, 255);
    }
  }
  .article-content {
    padding: 0.73333rem 0.42667rem;
  }
  .markdown-body {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    color: #24292e;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
    font-size: 32px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .markdown-body img {
    max-width: 80%;
    box-sizing: initial;
    background-color: #fff;
  }
  .end {
    color: #969799;
    font-size: 0.37333rem;
    text-align: center;
  }
}
</style>