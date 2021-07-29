<template>
  <div class="title">
    <div class="left">
      <span class="h2 bold">{{leftTitle}}</span>
    </div>

    <div class="right">
      <van-button round @click="$emit('rightTitleClick')">{{rightTitle}}</van-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    leftTitle: String,
    rightTitle: String,
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
</style>
