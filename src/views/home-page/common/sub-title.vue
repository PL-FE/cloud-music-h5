<template>
  <div class="sub-title">
    <span class="h2 bold">{{leftTitle}}</span>

    <van-button round
      size="small"
      @click="$emit('rightTitleClick')">{{rightTitle}}</van-button>
  </div>
</template>
<script>
export default {
  props: {
    leftTitle: String,
    rightTitle: String
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
.sub-title {
  padding: 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
