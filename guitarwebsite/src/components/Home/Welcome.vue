<template>
    <div class="carousel">
        <div class="W carouselFollowing">
          <span>在这里 你甚至可以学吉他</span>
        </div>
      <div class="w">
        <carousel></carousel>
      </div>
    </div>
</template>

<script>
import Carousel from './/Welcome/Carousel'
export default {
  components: {
    Carousel
  }
}
</script>

<style lang="less" scoped>
  .carousel{
    background-color: #FBFBFD;
  }
  .carouselFollowing{
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: #4D4D4E;
    background-color: #F5F5F7;
  }
</style>
