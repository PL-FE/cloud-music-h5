<template>
  <div class="about-container">
    <Login v-if="!profile" />
    <div v-else>
      <div class="about-info">
        <van-image round
          class="about-avatar"
          :src="profile.avatarUrl" />
        <span class="h4">{{profile.nickname}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './login.vue'
import { mapGetters } from 'vuex'
export default {
  components: { Login },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['profile'])
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.about-info {
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.about-avatar {
  background-color: #fff;
}
</style>
