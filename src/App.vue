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

<style></style>
