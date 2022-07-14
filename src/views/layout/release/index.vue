<template>
  <div class="release-container">
    <van-nav-bar title="发布" />
    <van-form @submit="onSubmit">
      <van-field
        maxlength="20"
        show-word-limit
        v-model="articleTitle"
        name="articleTitle"
        label="文章标题"
        placeholder="请填写文章标题"
        :rules="[{ required: true, message: '文章标题不能为空' }]"
      />
      <van-field
        v-model="articleSort"
        name="articleSort"
        label="文章分类"
        placeholder="请输入文章分类"
        :rules="[{ required: true, message: '文章分类不能为空' }]"
      />
      <van-field
        v-model="articleTag"
        name="articleTag"
        label="文章标签"
        placeholder="请输入文章标签"
        :rules="[{ required: true, message: '文章标签不能为空' }]"
      />
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="uploader"/>
        </template>
      </van-field>
      <van-field
        type="textarea"
        rows="1"
        autosize
        v-model="articleText"
        name="articleText"
        label="文章正文"
        placeholder="请输入文章正文"
        :rules="[{ required: true, message: '文章正文不能为空' }]"
      />

      <div style="margin: 16px" class="btnS">
        <van-button block type="primary" native-type="submit">
          <van-icon slot="icon" name="plus" />
          <span>发布</span>
        </van-button>
        <van-button block type="info" native-type="submit">
          <van-icon slot="icon" name="send-gift-o" />
          <span>存为草稿</span>
        </van-button>
        <van-button block type="danger" native-type="submit">
          <van-icon slot="icon" name="revoke" />
          <span>重置</span>
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'ReleaseIndex',
  data() {
    return {
      articleTitle: '',
      articleSort: '',
      articleTag: '',
      articleText: '',
      uploader: [],
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
  },
}
</script>

<style lang='less'>
.release-container {
  .van-button--block {
    display: unset;
    width: 32%;
  }
  .btnS{
    display: flex;
    justify-content: space-between;
  }
}
</style>