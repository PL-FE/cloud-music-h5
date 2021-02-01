<template>
  <div class="home-container">
    <div class="container swipe-container">
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="banner in banners"
                        :key="banner.bannerId">
          <van-image class="banner"
                     fit="cover"
                     :src="banner.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="container tabs-container">
      <div class="tabs-item"
           v-for="tab in tabs"
           :key="tab.name">
        <span class="tab-icon">
          <van-icon :name="tab.name" />
        </span>
        <span class="tab-label">{{tab.label}}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      banners: [],
      tabs: [
        { name: 'notes-o', label: '每日推荐' },
        { name: 'description', label: '歌单' },
        { name: 'bar-chart-o', label: '排行榜' },
        { name: 'setting-o', label: '直播' },
        { name: 'search', label: '电台' },
        { name: 'friends-o', label: '数字专辑' },
        { name: 'home-o', label: '新碟上架' }
      ]
    }
  },
  async mounted () {
    const data = await this.$api.get('/api/banner?type=2')
    console.log('data', data)
    this.banners = data.banners
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@couldred: #fe4f41;

.home-container {
  .container {
    margin-bottom: 10px;
  }

  .my-swipe .van-swipe-item {
    text-align: center;
    .banner {
      width: 350px;
      /deep/.van-image__img {
        border-radius: 8px;
      }
    }
  }

  .tabs-container {
    display: flex;
    width: 375px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
    .tabs-item {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80px;

      .tab-icon {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: @couldred;
        color: #fff;
        border-radius: 50%;
      }

      .tab-label {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
}
</style>
