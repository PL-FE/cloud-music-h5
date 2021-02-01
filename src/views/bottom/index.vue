<template>
  <van-tabbar class="bottom-container"
              v-model="activeIndex">
    <van-tabbar-item icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item icon="search">标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: ''
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.bottom-container {
  opacity: 0.8;
  &::after {
    content: '';
    filter: blur(2px);
  }
}
</style>
