<template>
  <div class="update-name">
    <van-nav-bar
      title="编辑地址"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="field">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入地址"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      message: this.value,
    }
  },
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        await updateUser({
          address: this.message,
          id: this.id,
        })
        this.$toast.success('更新成功')
        this.$emit('input', this.message)
        this.$emit('close')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
  },
}
</script>

<style lang='less'>
.update-name {
  .van-nav-bar__content {
    background-color: #fff;
  }
  .van-nav-bar__title{
    color: #333 !important;
  }
  .field {
    padding: 20px;
  }
}
</style>