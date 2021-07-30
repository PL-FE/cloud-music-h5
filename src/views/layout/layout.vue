<template>
  <div class="app-container">
    <keep-alive>
      <component :is="activeTab"></component>
    </keep-alive>
    <van-tabbar class="bottom-container"
      v-model="activeTab">
      <van-tabbar-item name="HomePage"
        icon="home-o">发现</van-tabbar-item>
      <van-tabbar-item name="About"
        icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import HomePage from '../home-page/home-page.vue'
import About from '../about/about.vue'
export default {
  components: { HomePage, About },
  data () {
    return {
      activeTab: 'HomePage'
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
