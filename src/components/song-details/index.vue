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
          <van-icon name="like-o"
            @click="like" />
          <!-- 下载 -->
          <van-icon name="down"
            @click="download" />
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
          <van-icon name="arrow-left"
            @click="previousSong" />
          <!-- 播放/暂停 -->
          <van-icon :name="paused ? 'play-circle' : 'pause-circle'"
            class="icon-main"
            @click="handlePlay" />
          <!-- 下一首 -->
          <van-icon name="arrow"
            @click="nextSong" />
          <!-- 播放列表 -->
          <van-icon name="bars" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import BackTop from '@/components/common/BackTop.vue'
import { mapGetters, mapMutations } from 'vuex'
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
    ...mapGetters(['playingSongIdx', 'playList']),
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
    ...mapMutations(['setPlayingSongIdx']),
    async initPlaySong (id) {
      this.paused = true
      this.currentTime = 0
      const songDetails = await this.$api.get(`/api/song/detail?ids=${id}`)
      const songData = await this.$api.get(`/api/song/url?id=${id}`)
      this.songDetail = songDetails.songs[0]
      this.songUrl = songData.data[0]
    },

    download () {
    },

    // 喜欢歌曲
    async like () {
      const { playList, playingSongIdx } = this
      const song = playList[playingSongIdx]
      if (!song) return
      const id = song.id
      await this.$api.post(`/api/like?id=${id}`, { like: true })
    },

    // 进度条改变
    onSliderChange (v) {
      const songRef = this.$refs.songRef
      const len = songRef.duration
      const currentTime = len * v / 100
      songRef.currentTime = currentTime.toFixed(6)
    },

    // 暂停/播放
    handlePlay () {
      const songRef = this.$refs.songRef
      // 音频是否暂停
      const paused = songRef.paused
      paused ? songRef.play() : songRef.pause()
      this.paused = !paused
    },

    // 上一首
    previousSong () {
      const { playingSongIdx, playList } = this
      const idx = playingSongIdx === 0 ? playList.length - 1 : playingSongIdx - 1
      this.toogleSong(idx)
    },
    // 下一首
    nextSong () {
      const { playingSongIdx, playList } = this
      const idx = playingSongIdx === playList.length - 1 ? 0 : playingSongIdx + 1
      this.toogleSong(idx)
    },

    toogleSong (idx) {
      const { playList } = this
      this.setPlayingSongIdx({ playingSongIdx: idx })
      const song = playList[idx]
      if (!song) {
        console.error('找不到歌曲')
        return
      }
      const id = song.id
      this.initPlaySong(id)
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
