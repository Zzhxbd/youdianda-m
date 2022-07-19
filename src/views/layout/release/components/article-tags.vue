<template>
  <div class="article-tags">
    <van-picker
      title="文章标题"
      show-toolbar
      :default-index="tagsIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { getIndexApi } from '@/api/home'
export default {
  name: 'ArticleTags',
  props: {
    value: {
      type: String,
      required: true,
    },
    tagsIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: [],
    }
  },
  async created() {
    try {
      const { data } = await getIndexApi()
    //   console.log(data)
      this.columns = data.data.allTag.map((item) => item.tagname)
    } catch (err) {
      this.$toast('数据错误')
    }
  },
  methods: {
    onConfirm(value, index) {
      this.$emit('input', value)
      this.$emit('close')
      this.$emit('update:tagsIndex', index)
    },
  },
}
</script>

<style>
</style>