<template>
  <div class="phonogram">
    <canvas width="100"
      height="100"
      id="casvased"></canvas>
  </div>
</template>

<script>
export default {
  props: { url: String },
  data () {
    return {

    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    async init () {
      const audioBufferSourceNode = this.$utils.initMusic('casvased', this.url)
    }
  }
}
</script>

<style lang="less" scoped>
.phonogram {
  position: relative;
}
</style>
