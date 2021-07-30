<template>
  <div class="home-container">
    <!-- 輪播 -->
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
    <!-- 菜单 -->
    <div class="container tabs-container">
      <div class="tabs-item"
        v-for="tab in tabs"
        @click="handleClickTab(tab)"
        :key="tab.name">
        <span class="tab-icon">
          <van-icon :name="tab.iconUrl" />
        </span>
        <span class="tab-label">{{tab.name}}</span>
      </div>
    </div>

    <!-- 其他推荐 -->
    <div class="container repeat-item">
      <subTitle leftTitle="推荐歌单"
        rightTitle="查看更多" />

      <div class="tabs-container">
        <div class="img-container-item"
          v-for="item in personalized"
          :key="item.id">
          <div class="img">
            <van-image width="100"
              height="100"
              :src="item.picUrl" />
            <span>{{item.playCount}}</span>
          </div>
          <span class="h4">{{item.name}}</span>
        </div>
      </div>

    </div>

    <div class="container repeat-item">
      <subTitle leftTitle="根据恭喜发财推荐"
        rightTitle="播放全部" />

      <div class="tabs-container">
        <van-list>
          <van-cell v-for="item in 5"
            :key="item"
            :title="item" />
        </van-list>
      </div>

    </div>
  </div>
</template>

<script>
import SubTitle from "../../views/home-page/common/sub-title.vue";
export default {
  components: {
    SubTitle,
  },
  data () {
    return {
      banners: [],
      personalized: [],
      tabs: []
    }
  },
  async mounted () {
    const data = await this.$api.get('/api/banner?type=2')
    this.banners = data.banners

    const personalizedData = await this.$api.get('/api/personalized')
    this.personalized = personalizedData.result
    const dragonBall = await this.$api.get('/api/homepage/dragon/ball')
    this.tabs = dragonBall.data
    console.log(`dragonBall`, dragonBall)
  },
  methods: {
    handleClickTab (tab) {
      switch (tab.id) {
        case -1:
          this.openRecommend()
          break;

        default:
          break;
      }
    },

    openRecommend () {
      this.$router.push({ name: 'recommend' })
    }
  }
}
</script>

<style lang="less" scoped>
@couldred: #fe4f41;

.home-container {
  .container {
    margin-bottom: 15px;
  }

  .my-swipe .van-swipe-item {
    text-align: center;
    .banner {
      width: 350px;
      min-height: 136px;
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
      height: 0;
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

  .repeat-item {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      margin-bottom: 10px;

      ::v-deep.van-button {
        height: auto;
        padding: 5px 10px;
      }
    }

    .img-container-item {
      width: 100px;
      margin-left: 15px;
      & > span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .img {
        position: relative;
        ::v-deep img {
          border-radius: 8px;
        }

        & > span {
          position: absolute;
          top: 2px;
          right: 8px;
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
