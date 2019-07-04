<template>
  <div class="header">
    <span @click="toPlayer" class="iconfont icon-suofang"></span>
    <div class="content">
      <span class="iconfont icon-yinyue"></span>
      <span>Music Player</span>
    </div>
    <span @click="toIndex" class="iconfont icon-details"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: true
    }
  },
  methods: {
    toIndex() {
      // if(this.page) {
      //   return
      // }
      this.page = true
      this.$router.push({name: 'index'})
    },
    toPlayer() {
      // if(!this.page){
      //   return
      // }
      this.page = false
      this.$router.push({name: 'player'})
    }
  },
}
</script>

<style lang="stylus" scoped>
@import './Header'
</style>

