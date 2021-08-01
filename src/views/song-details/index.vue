<template>
  <div class="song-details">
    <BackTop :title="title" />
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
          width="300px"
          max-height="300px" />
      </div>
      <div class="song-details_controls">

        <div class="song-details_controls_slider">
          <van-slider v-model="currentTime"
            @change="onSliderChange" />
        </div>
        <div class="song-details_controls_handIcon">
          <van-icon name="arrow-left" />
          <van-icon :name="paused ? 'play-circle' : 'pause-circle'"
            class="icon-main"
            @click="handlePlay" />
          <van-icon name="arrow" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import BackTop from '@/components/BackTop.vue'

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
}
.audio {
  display: none;
}
.song-details_container {
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
    height: 130px;
    padding: 0 30px;

    .song-details_controls_slider {
      margin-bottom: 40px;
    }
    .song-details_controls_handIcon {
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
