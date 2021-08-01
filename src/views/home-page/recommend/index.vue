<template>
  <div class="recommend-container">
    <div class="recommend-bg">
      <BackTop />
      <van-image width="100%"
        height="200"
        src="https://img01.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <div class="songs-container">
      <template v-for="song in dailySongs">
        <Song class="song-item"
          :key="song.id"
          :song="song" />
      </template>
    </div>
  </div>
</template>

<script>
import BackTop from '@/components/BackTop.vue'
import Song from '@/components/Song.vue'
export default {
  components: { BackTop, Song },
  data () {
    return {
      dailySongs: []
    }
  },
  async mounted () {
    const songsData = await this.$api.get('/api/recommend/songs')
    const { dailySongs } = songsData.data
    this.dailySongs = dailySongs
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.recommend-container {
  height: 100%;
  display: flex;
  flex-direction: column;
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
