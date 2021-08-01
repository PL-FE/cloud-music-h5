<template>
  <div class="backTop">
    <span class="backTop_back"
      @click="goBack">
      <van-icon name="arrow-left" />
    </span>
    <span class="backTop_title h3">{{title}}</span>
  </div>
</template>

<script>
export default {
  props: { title: String },
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 15px;
  .backTop_back {
    position: absolute;
    left: 20px;
  }
  z-index: 9;

  text-align: center;
  vertical-align: middle;
}
</style>
