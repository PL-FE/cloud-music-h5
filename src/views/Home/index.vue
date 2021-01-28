<template>
  <div class="home-container">
    <div class="swipe-container">
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="img in 4"
                        :key="img">
          <van-image class="banner"
                     fit="cover"
                     :src="require('@/assets/banner.png')" />
        </van-swipe-item>
      </van-swipe>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.home-container {
  .my-swipe .van-swipe-item {
    text-align: center;
    .banner {
      // width: 340px;
      // height: 100px;
    }
  }
}
</style>
