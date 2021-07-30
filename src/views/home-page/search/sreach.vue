<template>
  <div class="search-container">
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
  watch: {
    value (v) {
      this.queryKeyWords(v)
    }
  },
  methods: {
    async queryKeyWords (v) {
      const res = await this.$api.get(`/api/search?keywords=${v}`)
      console.log(`res`, res)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  display: flex;
  padding: 0 15px;
  justify-content: space-around;
  align-items: center;

  .search {
    flex: 1;
  }
}
</style>
