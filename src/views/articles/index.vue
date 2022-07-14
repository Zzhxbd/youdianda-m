<template>
  <div class="articles-container">
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
      fixed
      placeholder
    />
    <articleItem :articleInfo="articleInfo" ref="articleItem"></articleItem>
    <otherArticle
      :recommend="recommend"
      @otherArticle="loadGetArticle"
    ></otherArticle>
    <van-tabbar fixed placeholder>
      <van-tabbar-item v-if="articleInfo.isCollect">
        <van-button slot="icon" @click="Collect" class="btn" :loading='loadingCollect'>
          <van-icon name="star" />
        </van-button>
      </van-tabbar-item>
      <van-tabbar-item v-else>
        <van-button slot="icon" @click="Collect" class="btn" :loading='loadingCollect'>
          <van-icon name="star-o" />
        </van-button>
      </van-tabbar-item>
      <van-tabbar-item v-if="articleInfo.isLike">
        <van-button slot="icon" @click="Like" class="btn" :loading='loadingLike'>
          <van-icon name="good-job" />
        </van-button>
      </van-tabbar-item>
      <van-tabbar-item v-else>
         <van-button slot="icon" @click="Like" class="btn" :loading='loadingLike'>
          <van-icon name="good-job-o" />
        </van-button>
      </van-tabbar-item>
      <van-tabbar-item>
         <van-button class="btn">
          <van-icon name="share" />
        </van-button>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import articleItem from '@/views/articles/components/articlesItem.vue'
import otherArticle from '@/views/articles/components/otherArticle.vue'
import { getArticles, userDataHandle, zanArticles } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleIndex',
  components: {
    articleItem,
    otherArticle,
  },
  data() {
    return {
      articleInfo: {},
      recommend: [],
      id: this.$route.query.id,
      loadingCollect:false,
      loadingLike:false
    }
  },
  computed: {
    ...mapState(['token']),
  },
  created() {
    this.loadGetArticle(this.id)
  },
  methods: {
    async loadGetArticle(id) {
      const { data } = await getArticles(id)
      // console.log(data);
      this.articleInfo = data.data.info
      this.recommend = data.data.recommend
      window.scrollTo({
        top:0
      })
    },
    async Collect() {
      this.loadingCollect=true
      if (this.token) {
        if (this.articleInfo.isCollect) {
          await userDataHandle({
            type: 1,
            article_id: this.articleInfo.id,
            action: 'del',
          })
          // console.log(data)
          this.$toast.success('取消关注')
        } else {
          await userDataHandle({
            type: 1,
            article_id: this.articleInfo.id,
            action: 'add',
          })
          // console.log(data)
          this.$toast.success('关注成功')
        }
        this.articleInfo.isCollect = !this.articleInfo.isCollect
      } else {
        this.$toast('你还未登录,请登录')
      }
      this.loadingCollect=false
    },
    async Like() {
      this.loadingLike=true
      if (this.token) {
        if (this.articleInfo.isLike) {
          await zanArticles(this.articleInfo.id, 'del')
          this.$toast.success('取消点赞')
        } else {
          await zanArticles(this.articleInfo.id, 'add')
          this.$toast.success('点赞成功')
        }
        this.articleInfo.isLike = !this.articleInfo.isLike
      } else {
        this.$toast('你还未登录,请登录')
      }
      this.loadingLike=false
    },
  },
}
</script>

<style lang='less'>
.articles-container {
  .van-tabbar-item--active {
    color: unset;
  }
  .btn {
    border: 0;
  }
  .van-icon{
    font-size: 40px;
  }
}
</style>