<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
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
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUser({
          birthday: currentDate,
          id: this.id,
        })
        console.log(dayjs(this.currentDate).format('YYYY-MM-DD'))
        this.$toast.success('更新成功')
        this.$emit('input', currentDate)
        this.$emit('close')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
  },
}
</script>

<style>
</style>