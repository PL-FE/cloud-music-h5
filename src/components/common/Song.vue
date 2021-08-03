<template>
  <div class="song-container"
    @click="handlePlay">
    <van-image width="30"
      :src="song.al.picUrl" />
    <span class="h3 song-name">
      {{song.name}}
    </span>
    <span v-if="song.recommendReasons"
      class="h4 song-recommendReasons">{{song.recommendReasons}}</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    song: Object,
    songIdx: Number
  },
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['setPlayingSong']),
    handlePlay () {
      this.$router.push({ name: 'song-details', params: this.song })
      this.setPlayingSong({
        playingSong: this.song,
        playingSongIdx: this.songIdx
      })
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor: #ea4d44;
@secColor: #fae2e1;

.song-container {
  display: flex;
  align-items: center;
  .song-name {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 10px;
  }
  .song-recommendReasons {
    color: @mainColor;
    background-color: @secColor;
    padding: 0 5px;
    transform: scale(0.8);
  }
}
</style>
