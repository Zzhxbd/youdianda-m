<template>
  <div class="update-gender">
    <van-picker
      title="编辑性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      columns: ['男', '女'],
      sex: 0,
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        await updateUser({
          sex: this.sex,
          id:this.id
        })
        this.$toast.success('更新成功')
        this.$emit('input', this.sex)
        this.$emit('close')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
    onChange(picker, value, index) {
      this.sex = index
    },
  },
}
</script>

<style>
</style>