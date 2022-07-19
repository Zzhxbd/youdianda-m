<template>
  <div class="article-sort">
    <van-picker
      title="文章分类"
      show-toolbar
      :default-index="cateidIndex"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { getIndexApi } from '@/api/home'
export default {
  name: 'ArticleSort',
  props: {
    value: {
      type: String,
      required: true,
    },
    cateidIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: [],
      id: '',
      allCate: {},
    }
  },
  async created() {
    try {
      const { data } = await getIndexApi()
      //   console.log(data)
      this.allCate = data.data.allCate
      this.columns = data.data.allCate.map((item) => item.catename)
    } catch (err) {
      this.$toast('数据错误')
    }
  },
  methods: {
    onConfirm(value, index) {
      const arr = this.allCate.filter((item) => item.catename === value)
      this.id = arr[0].id
      this.$emit('input', value)
      this.$emit('close')
      this.$emit('update:cateidIndex', index)
      this.$emit('update:cateid', this.id)
    },
  },
}
</script>

<style>
</style>