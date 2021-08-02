<template>
  <div class="song-details">
    <div class="song-bg"
      :style="{backgroundImage:`url(${picUrl})`}"></div>
    <div class="shade-top"></div>
    <div class="shade"></div>
    <BackTop :title="title"
      hasBgColor />
    <audio v-if="songUrl"
      @ended="paused = true"
      @play="paused = false"
      ref="songRef"
      controls="controls"
      class="audio"
      autoplay
      :src="songUrl.url"></audio>

    <div class="song-details_container">
      <div class="song-details_swipe">
        <van-image :src="picUrl"
          width="250px"
          max-height="250px" />
      </div>
      <div class="song-details_controls">
        <div class="song-details_controls_top">
          <!-- 喜欢 -->
          <van-icon name="like-o" />
          <!-- 下载 -->
          <van-icon name="down" />
          <!-- 评论 -->
          <van-icon name="more-o" />
          <!-- 更多 -->
          <van-icon name="ellipsis"
            style="transform: rotate(90deg);" />
        </div>
        <div class="song-details_controls_slider">
          <van-slider v-model="currentTime"
            @change="onSliderChange" />
        </div>
        <div class="song-details_controls_handIcon">
          <!-- 播放模式 -->
          <van-icon name="revoke" />
          <!-- 上一首 -->
          <van-icon name="arrow-left" />
          <!-- 播放/暂停 -->
          <van-icon :name="paused ? 'play-circle' : 'pause-circle'"
            class="icon-main"
            @click="handlePlay" />
          <!-- 下一首 -->
          <van-icon name="arrow" />
          <!-- 播放列表 -->
          <van-icon name="bars" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import BackTop from '@/components/common/BackTop.vue'

export default {
  components: { BackTop },
  data () {
    return {
      songUrl: null,
      songDetail: null,
      currentTime: 0,
      paused: true
    }
  },
  watch: {
    '$route.params.id' (id) {
      if (id) {
        this.initPlaySong(id)
      }
    },
    paused: {
      // TODO: 不准备的计时方法，待改进
      handler (v) {
        if (!v) {
          const songRef = this.$refs.songRef
          const len = songRef.duration
          this.timer = setInterval(() => {
            this.currentTime += 100 / len
          }, 1000)
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
      },
      immediate: true
    }
  },
  computed: {
    song () {
      return this.$route.params
    },
    title () {
      const { songDetail } = this
      if (!songDetail) return ''
      return songDetail.name
    },
    picUrl () {
      const { songDetail } = this
      if (!songDetail) return ''
      return songDetail.al.picUrl
    }
  },

  mounted () {
    this.initPlaySong(this.$route.params.id)
  },

  methods: {
    async initPlaySong (id) {
      const songDetails = await this.$api.get(`/api/song/detail?ids=${id}`)
      const songData = await this.$api.get(`/api/song/url?id=${id}`)
      this.songDetail = songDetails.songs[0]
      this.songUrl = songData.data[0]
    },

    onSliderChange (v) {
      const songRef = this.$refs.songRef
      const len = songRef.duration
      const currentTime = len * v / 100
      songRef.currentTime = currentTime.toFixed(6)
    },

    handlePlay () {
      const songRef = this.$refs.songRef
      // 音频是否暂停
      const paused = songRef.paused
      paused ? songRef.play() : songRef.pause()
      this.paused = !paused
    }
  }
}
</script>

<style lang="less" scoped>
.song-details {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .song-bg {
    position: fixed;
    height: 100%;
    width: 100%;
    opacity: 1;
    transform: scale(1.5);
    transform-origin: center center;
    filter: blur(30px);
  }
  .shade {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0), #403838);
  }
  .shade-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 98px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  }
}
.audio {
  display: none;
}
.song-details_container {
  color: #fff;
  flex: 1;
  padding-top: 30px;
  flex-direction: column;
  display: flex;
  align-content: space-between;
  .song-details_swipe {
    flex: 1;
    text-align: center;
  }
  .song-details_controls {
    height: 160px;
    padding: 0 30px;

    .song-details_controls_slider {
      margin: 20px 0px;
    }
    .song-details_controls_handIcon,
    .song-details_controls_top {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon-main {
        font-size: 40px;
      }
    }
  }
}
</style>
