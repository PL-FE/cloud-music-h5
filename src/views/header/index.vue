<template>
  <div class="header-container">
    <van-icon name="flower-o" />

    <van-search class="search"
                shape="round"
                v-model="value"
                placeholder="花儿乐队"
                input-align="center" />

    <van-icon name="service-o" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  padding: 0 15px;
  justify-content: space-around;
  align-items: center;

  .search {
    flex: 1;
  }
}
</style>
