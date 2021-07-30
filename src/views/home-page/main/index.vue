<template>
  <div class="main-container">
    <SwipeView />
    <DragonBall />
    <Personalized />
  </div>
</template>

<script>
import SwipeView from './swipe-view.vue'
import DragonBall from './dragon-ball.vue'
import Personalized from './personalized.vue'
export default {
  components: { SwipeView, DragonBall, Personalized },
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
.main-container {
  overflow: auto;
  > div {
    margin-bottom: 10px;
  }
}
</style>
