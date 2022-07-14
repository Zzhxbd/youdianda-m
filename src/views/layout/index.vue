<template>
  <div>
    <router-view />
    <van-tabbar route fixed placeholder>
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/sort" icon="records">分类</van-tabbar-item>
      <van-tabbar-item replace to="/release" icon="edit">发布</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>