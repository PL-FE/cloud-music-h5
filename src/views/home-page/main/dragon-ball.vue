<template>
  <div class="dragon-ball-container">

    <div class="dragon-ball">
      <div class="tabs-item"
        v-for="ball in dragonBallList"
        @click="handleClickBall(ball)"
        :key="ball.name">
        <span class="tab-icon">
          <van-icon :name="ball.iconUrl" />
        </span>
        <span class="tab-label">{{ball.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dragonBallList: []
    }
  },
  async mounted () {
    const dragonBallData = await this.$api.get('/api/homepage/dragon/ball')
    this.dragonBallList = dragonBallData.data.slice(0, 1)
  },
  methods: {
    handleClickBall () {
      this.$router.push({ name: 'recommend' })
    }
  }
}
</script>

<style lang="less" scoped>
@couldred: #fe4f41;

.dragon-ball {
  display: flex;
  width: 375px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .tabs-item {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;

    .tab-icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: @couldred;
      color: #fff;
      border-radius: 50%;
    }

    .tab-label {
      margin-top: 5px;
      font-size: 12px;
    }
  }
}
</style>
