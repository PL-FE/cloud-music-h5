<template>
  <div class="recommend-container">
    <div class="recommend-bg"
      v-if="isRecommend">
      <BackTop class="position" />
      <span class="date-container">
        <b class="day">{{calcDate.day}}</b><b>/{{calcDate.month}}</b>
      </span>
    </div>
    <div class="recommend-bg"
      v-else>
      <BackTop class="position" />
      <div class="img-bg"
        :style="{backgroundImage: `url(${playlist.coverImgUrl})`}"></div>
      <div class="recommend-description">
        <div class="h2">{{playlist.name}}</div>
        <span class="dayUpdae">每日更新</span>
        <!-- <div class="h3">{{playlist.description}}</div> -->
      </div>
    </div>
    <SongList v-if="songs"
      :songs="songs" />
  </div>
</template>

<script>
import BackTop from '@/components/common/BackTop.vue'
import SongList from '@/components/song-list.vue'
export default {
  components: { BackTop, SongList },
  data () {
    return {
      songs: null,
      playlist: {}
    }
  },
  computed: {
    calcDate () {
      const now = new Date()
      let day = now.getDay() + 1
      let month = now.getMonth() + 1
      if (day < 10) {
        day = '0' + day
      }
      if (month < 10) {
        month = '0' + month
      }
      return {
        month,
        day
      }
    },
    isRecommend () {
      return this.$route.query.id === undefined
    }
  },

  async mounted () {
    const id = this.$route.query.id
    const url = id ? `/api/playlist/detail?id=${id}` : '/api/recommend/songs'
    const songsData = await this.$api.get(url)
    if (id) {
      this.handleSongSheet(songsData)
    } else {
      // 每日推荐
      this.handleRecommend(songsData)
    }
  },
  methods: {
    handleRecommend (songsData) {
      const { dailySongs, recommendReasons } = songsData.data
      dailySongs.forEach(it => {
        const target = recommendReasons.find(i => i.songId === it.id)
        if (target) {
          it.recommendReasons = target.reason
        }
      })
      this.songs = songsData.data
    },
    handleSongSheet (songsData) {
      const { playlist } = songsData
      const { tracks } = playlist
      this.playlist = playlist
      this.songs = tracks
    }
  }
}
</script>

<style lang="less" scoped>
.recommend-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.position {
  position: absolute;
  top: 10px;
}
.recommend-bg {
  position: relative;
  min-height: 200px;
  width: 100%;
  background-image: linear-gradient(#30389c, #595e96);
  color: #fff;
  .img-bg {
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    width: 100%;
    height: 100%;
    filter: contrast(0.5);
  }
  .recommend-description {
    white-space: pre-wrap;
    position: absolute;
    top: 20%;
    padding: 20px;
  }
  .dayUpdae {
    background-color: hsla(0, 0%, 100%, 0.2);
    color: hsla(0, 0%, 100%, 0.6);
    border-radius: 2px;
    font-size: 10px;
    padding: 2px 4px;
    display: inline-block;
    margin: 15px 0;
  }
  .date-container {
    position: absolute;
    bottom: 20px;
    left: 20px;
    .day {
      font-size: 40px;
    }
  }
}
</style>
