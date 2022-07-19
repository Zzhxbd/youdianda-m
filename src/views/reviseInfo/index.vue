<template>
  <div class="editUserInfo">
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" />
    <input type="file" ref="file" hidden @change="onFileChange" />
    <van-cell title="头像" is-link>
      <van-image
        class="img"
        round
        fit="cover"
        :src="'http://124.223.14.236:8060/' + user.icon"
        @click="$refs.file.click()"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.username"
      is-link
      @click="editNameShow = true"
    />
    <van-cell
      title="手机号"
      :value="user.mobile"
      is-link
      @click="editMobileShow = true"
    />
    <van-cell
      title="性别"
      :value="user.sex === 0 ? '男' : '女'"
      is-link
      @click="editGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="editBirthdayShow = true"
    />
    <van-cell
      title="家庭住址"
      :value="user.address"
      is-link
      @click="editAddressShow = true"
    />
    <van-cell
      title="个性留言"
      :value="user.notes"
      is-link
      @click="editNotesShow = true"
    />
    <!-- 个性留言弹出框 -->
    <van-popup v-model="editNotesShow" position="bottom" style="height: 100%">
      <UpdateNotes
        @close="editNotesShow = false"
        v-if="editNotesShow"
        v-model="user.notes"
        :id="user.id"
      ></UpdateNotes>
    </van-popup>
    <!-- 家庭住址弹出框 -->
    <van-popup v-model="editAddressShow" position="bottom" style="height: 100%">
      <UpdateAddress
        @close="editAddressShow = false"
        v-if="editAddressShow"
        v-model="user.address"
        :id="user.id"
      ></UpdateAddress>
    </van-popup>
    <!-- 生日弹出框 -->
    <van-popup v-model="editBirthdayShow" position="bottom">
      <UpdateBirthday
        @close="editBirthdayShow = false"
        v-if="editBirthdayShow"
        v-model="user.birthday"
        :id="user.id"
      ></UpdateBirthday>
    </van-popup>
    <!-- 性别弹出框 -->
    <van-popup v-model="editGenderShow" position="bottom">
      <UpdateGender
        @close="editGenderShow = false"
        v-if="editGenderShow"
        v-model="user.sex"
        :id="user.id"
      ></UpdateGender>
    </van-popup>
    <!-- 手机号弹出框 -->
    <van-popup v-model="editMobileShow" position="bottom" style="height: 100%">
      <UpdateMobile
        @close="editMobileShow = false"
        v-if="editMobileShow"
        v-model="user.mobile"
        :id="user.id"
      ></UpdateMobile>
    </van-popup>
    <!-- 昵称弹出框 -->
    <van-popup v-model="editNameShow" position="bottom" style="height: 100%">
      <UpdateName
        @close="editNameShow = false"
        v-if="editNameShow"
        v-model="user.username"
        :id="user.id"
      ></UpdateName>
    </van-popup>
    <!-- 头像弹出框 -->
    <van-popup v-model="editAvatarShow" position="bottom" style="height: 100%">
      <UpdateAvatar
        @close="editAvatarShow = false"
        v-if="editAvatarShow"
        :img="img"
        :id="user.id"
        @update-photo="user.icon = $event"
      ></UpdateAvatar>
    </van-popup>
  </div>
</template>

<script>
import { userInfoApi } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdateAvatar from './components/update-avatar.vue'
import UpdateMobile from './components/update-mobile.vue'
import UpdateAddress from './components/update-address.vue'
import UpdateNotes from './components/update-notes.vue'
export default {
  name: 'editUserInfo',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar,
    UpdateMobile,
    UpdateAddress,
    UpdateNotes
  },
  data() {
    return {
      user: {},
      editAvatarShow: false,
      editNameShow: false,
      editMobileShow: false,
      editGenderShow: false,
      editBirthdayShow: false,
      editAddressShow: false,
      editNotesShow: false,
      img: null,
    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo() {
      try {
        const { data } = await userInfoApi()
        // console.log(data)
        this.user = data.data.userInfo
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.editAvatarShow = true
      this.$refs.file.value = ''
    },
  },
}
</script>

<style lang='less'>
.editUserInfo {
  .van-icon-arrow-left {
    color: #fff;
  }
  .van-popup {
    background-color: #f5f6f9;
  }
  .img {
    width: 60px;
    height: 60px;
  }
}
</style>