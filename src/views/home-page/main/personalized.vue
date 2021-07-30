<template>
  <div class="personalized-container">
    <subTitle leftTitle="推荐歌单"
      rightTitle="查看更多" />

    <div class="personalized-list">
      <template v-for="item in personalized">
        <Playlists :key="item.id"
          :listsInfo="item" />
      </template>
    </div>
  </div>
</template>

<script>
import SubTitle from '@/views/home-page/common/sub-title.vue'
import Playlists from '@/components/Playlists.vue'
export default {
  components: { SubTitle, Playlists },
  data () {
    return {
      personalized: []
    }
  },
  async mounted () {
    const personalizedData = await this.$api.get('/api/personalized')
    this.personalized = personalizedData.result
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.personalized-list {
  display: flex;
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
