<template>
  <div class="search-container">
    <div class="search-content">
      <van-search class="search"
        @focus="activeSreach"
        shape="round"
        v-model="value"
        placeholder="花儿乐队"
        input-align="center" />

      <van-icon name="service-o"
        v-if="!isActive" />
      <span class="cencal"
        v-else
        @click="isActive = false">取消</span>
    </div>

    <div class="search-list"
      v-if="isActive">
      <p v-for="song in songs"
        @click="handlePlay(song)"
        class="h3 song"
        :key="song.id">{{song.name}} <span class="h4">({{song.artists.map(it => it.name).join('/')}}-{{song.album.name}})</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      isActive: false,
      songs: []
    }
  },
  watch: {
    value (v) {
      this.queryKeyWords(v)
    },
    isActive (v) {
      if (!v) {
        this.value = ''
      }
    }
  },
  methods: {
    async queryKeyWords (v) {
      if (!v) {
        this.songs = []
        return
      }
      const res = await this.$api.get(`/api/search?keywords=${v}`)
      this.songs = res.result.songs
    },
    activeSreach () {
      this.isActive = true
    },
    handlePlay (song) {
      this.$router.push({ name: 'song-details', params: song })
    }
  }
}
</script>

<style lang="less" scoped>
@height: 55px;
.search-container {
  height: @height;
  width: 100%;
}
.search-content {
  display: flex;
  padding: 0 15px;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  z-index: 2;
  .search {
    flex: 1;
  }
}
.search-list {
  position: absolute;
  z-index: 21;
  top: @height;
  background: #fff;
  width: 100%;
  height: calc(100% - @height);
  overflow: auto;
}

.cencal {
  font-size: 14px;
}

.song {
  padding: 2px 15px;
}
</style>
