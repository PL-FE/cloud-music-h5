<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Bottom />
  </div>
</template>

<script>
import Header from '@/views/header/'
import Bottom from '@/views/bottom/'
export default {
  name: 'App',
  components: {
    Header,
    Bottom
  }
}
</script>

<style lang="less" >
.h4 {
  font-size: 12px;
}
.h3 {
  font-size: 14px;
}
.h2 {
  font-size: 16px;
}
.h1 {
  font-size: 18px;
}

.bold {
  font-weight: bold;
}
</style>
