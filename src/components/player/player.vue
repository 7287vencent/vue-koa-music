<template>
  <div v-show="showPage" class="page">
    <div class="disc">
      <img :style="{transform:'rotate(' + (current/playMusic.duration*360*4) + 'deg)'}" :src="playMusic.poster" alt="">
      <span class="duration">{{convert(playMusic.duration - current)}}</span>
    </div>
    <h2 class="title">{{playMusic.name}}</h2>
    <h3 class="artist">{{playMusic.artist}}</h3>
    <div class="lyric">
      <p class="previous">人如天上的明月是不可拥有</p>
      <p class="current">情如曲过只遗留无可挽救再分别</p>
      <p class="next">为何只是失望填密我的空虚</p>
    </div>
    <input type="range" value="0" min="0" :max="playMusic.duration" v-model="current">
    <div class="controls">
      <button @click="pre"><i class="iconfont icon-zuo"></i></button>
      <button @click="changeplay"><i class="iconfont" :class="{'icon-bofang': play, 'icon-zanting': !play}"></i></button>
      <button @click="next"><i class="iconfont icon-you"></i></button>
    </div>
  </div>
</template>

<script>
// const audio = this.$audio
export default {
  data() {
    return {
      MusicS: [],
      id: '',
      len: 0,
      showPage: true,
      playMusic: {},
      current: 0,
      play: false
    }
  },
  computed: {
    
  },
  created() {
    const id = this.$route.params.id
    this.id = id
    console.log('id', id)
    if(id) {
      // id 存在就请求对应的数据
      this.$http.get(`api/api/music/${id}`)
      .then(res => {
        console.log('res',res)
        if(res.status === 200){
          this.playMusic = res.data
          this.startPlay()
        }
      })
    }
    // this.startPlay()    
  },
  mounted() {
    // 页面数据渲染完毕，后就请求出 length数据
    this.$http.get('/api/api/music')
    .then(res => {
      if(res.status === 200 && res.data) {
        this.len = res.data.length
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    if(to) {
      this.PreAndNext(to.params.id)
    }
    next()
    // console.log('to',to)
    // console.log('from',from)
  },
  methods: {
    PreAndNext(reqId){
      const id = reqId
      this.$http.get(`api/api/music/${id}`)
      .then(res => {
        console.log('nextres',res)
        if(res.status === 200){
          this.id = id
          this.playMusic = res.data
          this.startPlay()
        }
      })
    },
    changeplay() {
      const audio = this.$audio
      if(this.play) {
        audio.play()
        this.play = false
      } else {
        audio.pause()
        this.play = true
      }
    },
    pre() {
      let reqId = +this.id - 1
      if(reqId < 1) {
        reqId = this.len
      } 
      console.log('reqId',reqId)
      this.$router.push({path:`/index/${reqId}`,params:{
        id: reqId
      }})
    },
    next() {
      let reqId = +this.id + 1
      // console.log(this.len)
      if(reqId > this.len) {
        reqId = 1
      } 
      console.log('reqId',reqId)
      this.$router.push({path:`/index/${reqId}`,params:{
        id: reqId
      }})
    },
    show() {
      this.showPage = true
      console.log('show')
    },
    convert(nowTime) {
      // console.log(nowTime)
      return nowTime
    },
    startPlay() {
      const audio = this.$audio
      audio.src = this.playMusic.music
      audio.autoplay = true
      audio.addEventListener('loadedmetadata',() => {
        this.playMusic.dutarion = audio.duration
      })
      audio.addEventListener('timeupdate',() => {
        this.current = audio.currentTime
      })
      console.log('audio',audio)
    }
  },
}
</script>

<style lang="stylus" scoped>
@import './player'
</style>

