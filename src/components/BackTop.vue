<template>
  <div class="backTop">
    <span class="backTop_back"
      @click="goBack">
      <van-icon name="arrow-left" />
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.backTop {
  position: relative;
  .backTop_back {
    position: absolute;
    padding: 15px;
    top: 0;
  }
  z-index: 9;
}
</style>
