<template>
  <div class="song-list">
    <div class="play-all">
      <van-icon @click="playSongs"
        name="play-circle"
        class="play-icon" />
      <span class="h3"> 播放全部 ({{dailySongs.length}})
      </span>
    </div>
    <div class="songs-container">
      <template v-for="(song, idx) in dailySongs">
        <Song class="song-item"
          @playSong="playingSong"
          :key="song.id"
          :songIdx="idx"
          :song="song" />
      </template>
    </div>
  </div>
</template>

<script>
import Song from '@/components/common/Song.vue'
import { mapMutations } from 'vuex'
export default {
  props: { songs: Object },
  components: { Song },
  data () {
    return {
      dailySongs: []
    }
  },
  mounted () {
    this.dailySongs = this.songs.dailySongs
    this.setPlayList(this.songs.dailySongs)
  },
  methods: {
    ...mapMutations(['setPlayList']),
    playSongs () {
      this.$router.push({ name: 'song-details', params: this.dailySongs[0] })
    },
    playingSong () {

    }
  }
}
</script>

<style lang="less" scoped>
@red: #ea4d44;
.song-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.play-all {
  display: flex;
  padding: 10px 15px;
  .play-icon {
    color: @red;
    font-size: 20px;
    padding-right: 8px;
  }
}
.songs-container {
  flex: 1;
  overflow: auto;
  padding: 0 15px;
  .song-item + .song-item {
    margin-top: 10px;
  }
}
</style>
