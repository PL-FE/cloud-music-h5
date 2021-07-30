<template>
  <div class="swipe-view-container">
    <van-swipe class="swipe-view"
      :autoplay="3000"
      indicator-color="white">
      <van-swipe-item v-for="banner in banners"
        :key="banner.bannerId">
        <van-image class="banner"
          fit="cover"
          :src="banner.pic" />
      </van-swipe-item>
      <van-swipe-item v-if="!banners.length">
        <van-image class="banner">
          <template #loading>
            <van-loading type="spinner"
              size="20" />
          </template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners: []
    }
  },
  async mounted () {
    const data = await this.$api.get('/api/banner?type=2')
    this.banners = data.banners
  }
}
</script>

<style lang="less" scoped>
.swipe-view .van-swipe-item {
  text-align: center;
  .banner {
    width: 350px;
    min-height: 136px;
    /deep/.van-image__img {
      border-radius: 8px;
    }
  }
}
</style>
