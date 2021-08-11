<template>
  <div class="playlists-container">
    <div class="img">
      <van-image width="100"
        height="100"
        :src="listsInfo.picUrl" />
      <span>{{listsInfo.playCount}}</span>
    </div>
    <span class="h4">{{listsInfo.name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    listsInfo: Object
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
.playlists-container {
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
</style>
