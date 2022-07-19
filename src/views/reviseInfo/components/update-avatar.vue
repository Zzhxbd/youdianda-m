<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar, updateUser } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    // 预览图片地址信息
    img: {
      type: [String, Object],
      required: true,
    },
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      cropper: null, // 裁剪器对象
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    })
    // 不能在这里调用 this.cropper.getCroppedCanvas() 方法！因为裁剪器还没初始化好！
  },
  methods: {
    // 确定事件
    async onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        console.log(blob);
        try {
          this.$toast.loading({
            message: '更新中...',
            forbidClick: true,
            duration: 0,
          })
          const formData = new FormData()
          formData.append('file', blob)

          const { data } = await updateUserAvatar(formData)
          this.updateAvatar(data.data.savePath)
          console.log(data)
          this.$toast.success('更新成功')
          this.$emit('update-photo', data.data.savePath)
          this.$emit('close')
        } catch (err) {
          console.log(err)
          this.$toast.fail('更新失败')
        }
      })
    },
    async updateAvatar(icon) {
      try {
        const res = await updateUser({
          id:this.id,
          icon:icon,
        })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>