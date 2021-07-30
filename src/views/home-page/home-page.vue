<template>
  <div class="home-page-container">
    <Sreach />
    <Main style="flex: 1" />
  </div>
</template>

<script>
import Sreach from './search/sreach.vue'
import Main from './main/index.vue'
export default {
  components: { Sreach, Main },
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
.home-page-container {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}
</style>
