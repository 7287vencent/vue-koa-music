<template>
  <div class="page">
    <div class="list" v-for="(list, id) in lists" :key="id" @click.stop.prevent ="toPlayer(list, $event)">
      <div class="id">{{list.id}}</div>
      <!-- 名称和作者 -->
      <div class="name-artist">
        <span class="name">{{list.name}}</span>
        <span class="artist">{{list.artist}}</span>
      </div>
      <!-- 时间和图片 -->
      <div class="duration-poster">
        <span class="duration">{{list.duration}}</span>
        <img class="poster" :src="list.poster" width="27" height="27">
      </div>
    </div>
    <!-- <Player :playMusic="playMusic" ref="player"></Player> -->
  </div>
</template>

<script>
// import Player from '../player'
export default {
  data() {
    return {
      lists: [],
      playMusic: {}
    }
  },
  methods: {
    toPlayer(list, event) {
      // console.log(event)
      // if(!event._constructed) {
      //   return
      // }
      // this.playMusic = list
      const id = list.id
      console.log(id)
      this.$router.push({path:`/index/${id}`,params:{
        id: id
      }})
      // this.$refs.player.show()
      // console.log('player')
    }
  },
  created() {
    this.$http.get(`/api/api/music`)
    .then(res => {
      console.log('res',res)
      if(res.status === 200 && res.data) {
        this.lists = res.data
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  components: {
    // Player
  }
}
</script>

<style lang="stylus" scoped>
@import './index'

</style>

