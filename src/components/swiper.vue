<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <!-- <img src="../assets/logo.png" alt=""> -->
      <!-- {{slide}} -->
      <img :src="img" alt="">
      <img :src="slide" alt="">
    </swiper-slide>
    
    <div class="swiper-pagination" slot="pagination"></div>
    
  </swiper>
  
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        img: require('../assets/logo.png'),
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: [
          '/logo.png',
          '/logo.png',
          '/logo.png',
          '/logo.png',
          '/logo.png'
        ]
      }
    },
    mounted() {
      setInterval(() => {
        console.log('simulate async data')
        if (this.swiperSlides.length < 10) {
          this.swiperSlides.push(this.swiperSlides.length + 1)
        }
      }, 3000)
    }
  }
</script>