<template>
  <div class="song-container">
    <van-image width="30"
      :src="song.al.picUrl" />
    <span class="h4 song-name">
      {{song.name}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    song: Object
  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
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
}
</style>
