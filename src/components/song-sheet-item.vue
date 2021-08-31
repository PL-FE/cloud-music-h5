<template>
  <div class="playlists-container">
    <div class="img">
      <van-image width="100"
        height="100"
        :src="listsInfo.picUrl" />
      <span class="playCount">
        <van-icon name="play"
          :style="{verticalAlign: '-1px'}" />{{playCount}}
      </span>
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
  computed: {
    playCount () {
      const { listsInfo } = this
      if (listsInfo.playCount > 100000000) {
        return (listsInfo.playCount / 100000000).toFixed(0) + '亿'
      } else if (listsInfo.playCount > 100000) {
        return (listsInfo.playCount / 100000).toFixed(0) + '万'
      } return listsInfo.playCount
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

  &:last-child {
    margin-right: 15px;
  }
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
  }
  .playCount {
    position: absolute;
    top: 2px;
    right: 8px;
    color: #fff;
    font-size: 12px;
    z-index: 2;
    padding: 0 3px;
    border-radius: 10px;
    background-color: #9e9e9e;
  }
}
</style>
