<template>
  <div id='app'>
    <Bottom>
      <div class="container">
        <div class='header-container'>
          <van-icon name='flower-o'
            @focus='isFocus = true'
            @blur='isFocus = false' />

          <van-search class='search'
            shape='round'
            v-model='value'
            placeholder='花儿乐队'
            input-align='center' />

          <van-icon name='service-o' />
        </div>
        <Home class="home" />
      </div>
    </Bottom>
  </div>
</template>

<script>
import Bottom from '@/views/bottom/'
import Home from '@/views/home/'
export default {
  name: 'App',
  components: {
    Bottom,
    Home
  },
  data () {
    return {
      value: '',
      isFocus: false
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

<style lang='less' scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .home {
    flex: 1;
    overflow: auto;
  }
}
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
