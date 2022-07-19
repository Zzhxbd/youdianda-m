<template>
  <div class="release">
    <van-nav-bar title="发布文章" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="title"
        name="title"
        label="文章标题"
        placeholder="请填写文章标题"
        :rules="[{ required: true, message: '文章标题不能为空' }]"
      />
      <van-field
        @click="cateidShow = true"
        v-model="cate"
        name="cateid"
        label="文章分类"
        placeholder="请填写文章分类"
        :rules="[{ required: true, message: '文章分类不能为空' }]"
      />
      <van-field
        @click="tagsShow = true"
        v-model="tags"
        name="tags"
        label="文章标签"
        placeholder="请填写文章标签"
        :rules="[{ required: true, message: '文章标签不能为空' }]"
      />
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
      <van-field
        v-model="content"
        name="content"
        label="文章正文"
        placeholder="请填写文章正文"
        :rules="[{ required: true, message: '文章正文不能为空' }]"
      />
      <div style="margin: 16px" class="btns">
        <van-button block type="primary" @click="btnF">
          <van-icon name="plus" />
          <span>发布</span>
        </van-button>
        <van-button block type="info" @click="btnC">
          <van-icon name="send-gift-o" />
          <span>存草稿</span>
        </van-button>
        <van-button
          block
          type="danger"
          native-type="button"
          @click="resetLoginForm"
        >
          <van-icon name="revoke" />
          <span>重置</span>
        </van-button>
      </div>
    </van-form>

    <!-- 分类弹出框 -->
    <van-popup v-model="cateidShow" position="bottom">
      <ArticleSort
        @close="cateidShow = false"
        v-if="cateidShow"
        v-model="cate"
        :cateidIndex.sync="cateidIndex"
        :cateid.sync="cateid"
      />
    </van-popup>
    <!-- 标签弹出框 -->
    <van-popup v-model="tagsShow" position="bottom">
      <ArticleTags
        @close="tagsShow = false"
        v-if="tagsShow"
        v-model="tags"
        :tagsIndex.sync="tagsIndex"
      />
    </van-popup>
  </div>
</template>

<script>
import { addArticle } from '@/api/release'
import ArticleSort from './components/article-sort.vue'
import ArticleTags from './components/article-tags.vue'
export default {
  name: 'Release',
  components: {
    ArticleSort,
    ArticleTags,
  },
  data() {
    return {
      title: '',
      cateid: '',
      cate: '',
      tags: '',
      uploader: [],
      content: '',
      cateidIndex: 0,
      tagsIndex: 0,
      cateidShow: false,
      tagsShow: false,
      status: 2,
    }
  },
  created() {},
  methods: {
    resetLoginForm() {
      this.title = ''
      this.cate = ''
      this.tags = ''
      this.uploader = []
      this.content = ''
    },
    async onSubmit(values) {
      console.log(this.uploader);
      if (this.status === 2) {
        try {
           this.$toast.loading({
            message: '发布中...',
            forbidClick: true,
            duration: 0,
          })
          await addArticle({
            author: '',
            title: this.title,
            cateid: this.cateid,
            tags: this.tags,
            pic:this.uploader[0].content,
            content: this.content,
            status: 2,
          })
          this.$router.push('/myarticle')
          this.$toast.success('发布成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发布失败')
        }
      } else if (this.status === 1) {
        try {
           this.$toast.loading({
            message: '存储中...',
            forbidClick: true,
            duration: 0,
          })
          await addArticle({
            author: '',
            title: this.title,
            cateid: this.cateid,
            tags: this.tags,
            pic: window.URL.createObjectURL(this.uploader[0].file),
            content: this.content,
            status: 1,
          })
          // console.log(res)
          console.log(this.uploader)
          this.$router.push('/myarticle')
          this.$toast.success('存储成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('存储失败')
        }
      }
    },
    btnF() {
      this.status = 2
      // console.log(this.status)
    },
    btnC() {
      this.status = 1
      // console.log(this.status)
    },
  },
}
</script>

<style lang='less'>
.release {
  .btns {
    display: inline-block;
    display: flex;
    .van-button {
      margin: 10px;
    }
  }
}
</style>