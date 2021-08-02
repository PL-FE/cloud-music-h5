<template>
  <div class="recommend-container">
    <div class="recommend-bg">
      <BackTop class="position" />
      <span class="date-container">
        <b class="day">{{calcDate.day}}</b><b>/{{calcDate.month}}</b>
      </span>
    </div>
    <SongList />
  </div>
</template>

<script>
import BackTop from '@/components/common/BackTop.vue'
import SongList from '@/components/song-list.vue'
export default {
  components: { BackTop, SongList },
  data () {
    return {
    }
  },
  computed: {
    calcDate () {
      const now = new Date()
      let day = now.getDay() + 1
      let month = now.getMonth() + 1
      if (day < 10) {
        day = '0' + day
      }
      if (month < 10) {
        month = '0' + month
      }
      return {
        month,
        day
      }
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.recommend-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.position {
  position: absolute;
  top: 0;
}
.recommend-bg {
  position: relative;
  min-height: 200px;
  width: 100%;
  background-image: linear-gradient(#30389c, #595e96);
  color: #fff;
  .date-container {
    position: absolute;
    bottom: 20px;
    left: 20px;
    .day {
      font-size: 40px;
    }
  }
}
</style>
