<template>
  <div class="w">
    <div class="carouselfather" ref="carouselfather">
      <div class="carousel" ref="carousel" v-for="item in data" :key="item.id">
        <img :src="data[item.id-1].src" @mousemove="carouselTimer(false)" @mouseleave="carouselTimer(false); carouselTimer(true, item.id-2)"> <!-- mouseleav的时候从鼠标停止的图片的前一张开始轮转 -->
      </div>
    </div>
    <div>
      <ul ref="carouselUl">
        <li v-for="item in data" :key="item.id" @click="liClick(item.id-1)"><div></div></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [ // 后期改进 将数据存放于vuex中
        { id: 1, src: require('./assets/guitar1.jpg') },
        { id: 2, src: require('./assets/guitar2.jpg') },
        { id: 3, src: require('./assets/guitar3.jpg') },
        { id: 4, src: require('./assets/guitar4.jpg') },
        { id: 5, src: require('./assets/guitar5.jpg') },
        { id: 6, src: require('./assets/guitar6.jpg') }
      ],
      timer: ''
    }
  },
  mounted () {
    this.setCarouselfather() // 设置父盒子的大小将轮播图按钮往下挤
    this.carousel(0) // 设置初始轮播图显示第一张照片
    this.carouselTimer(false) // 每次开启定时器时先停掉定时器
    this.carouselTimer(true, 0) // 打开定时器 从0开始循环
  },
  beforeDestroy () {
    this.carouselTimer(false) // 在销毁前关闭定时器,否则转到其他页面时会报错(定时器中的变量未定义).
  },
  updated () {
    this.carouselTimer(false)
  },
  methods: {
    setCarouselfather () { // 根据图片大小设置绝对定位的div大小
      this.$refs.carouselfather.style.height = this.$refs.carousel[0].offsetHeight * 1.1 + 'px'
      this.$refs.carouselfather.style.width = this.$refs.carousel[0].offsetWidth + 'px'
    },
    carousel (item) { // 单次轮播动作函数 参数为第几个图
      for (var i = 0; i < this.$refs.carousel.length; i++) {
        if (i < item) {
          this.$refs.carousel[i].className = 'carousel noSelLeftBroCar'
        } else if (i > item) {
          this.$refs.carousel[i].className = 'carousel noSelRightBroCar'
        }
      }
      if (item === 0) {
        this.$refs.carousel[this.$refs.carousel.length - 1].className = 'carousel selLeftBroCar'
        this.$refs.carousel[1].className = 'carousel selRightBroCar'
      } else if (item === this.$refs.carousel.length - 1) {
        this.$refs.carousel[item - 1].className = 'carousel selLeftBroCar'
        this.$refs.carousel[0].className = 'carousel selRightBroCar'
      } else {
        this.$refs.carousel[item - 1].className = 'carousel selLeftBroCar'
        this.$refs.carousel[item + 1].className = 'carousel selRightBroCar'
      }
      this.$refs.carousel[item].className = 'carousel selectCarousel'
    },
    carouselTimer (Boolean, j) { // 自动轮播定时器函数.
      var that = this
      if (Boolean === true) {
        this.timer = setInterval(function () {
          if (j < that.$refs.carousel.length - 1) {
            j++
          } else {
            j = 0
          }
          that.carousel(j)
        }, 2000)
      } else {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    liClick (item) { // 点击小圆点触发函数.
      this.carousel(item)// 显示第item张图片
      this.carouselTimer(false)// 关闭轮播定时器
      this.carouselTimer(true, item)// 从当前张开始轮播定时器
    }
  }
}
</script>

<style lang="less" scoped>
  @imgheight: 288px;
  @imgwidth: 512px;
  @min-imgheight: (@imgheight / 32 * 29);
  @min-imgwidth: (@imgwidth / 32 * 29);
  @max-imgheight: (@imgheight / 32 * 35);
  @max-imgwidth: (@imgwidth / 32 * 35);
  // @ noSelleft
  div {
    display: flex;
    flex-direction: column;// 从上往下排.
    .carouselfather{
      display: block;
      margin: 30px auto 0;
      position: relative;
    }
    .carousel{
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      height: @imgheight;
      width: @imgwidth;
      img {
        transition:all 1s;
        border-radius: 10px;
        height: @imgheight;
        width: @imgwidth;
      }
    }
    // 没有选中放在左边的轮播图
    .noSelLeftBroCar {
      left: -300px;
      transition:all 1s;
      height: @min-imgheight;
      width: @min-imgwidth;
      img{
        transition:all 1s;
        height: @min-imgheight;
        width: @min-imgwidth;
      }
    }
    // 选中的轮播图左边
    .selLeftBroCar {
      opacity: 0.8;
      left: -300px;
      transition:all 1s;
      z-index: 90;
    }
    // 选中的轮播图
    .selectCarousel {
      opacity: 1;
      left: 0px;
      top: -12px;
      transition:all 1s;
      z-index: 100;
      height: @max-imgheight;
      width: @max-imgwidth;
      img {
        transition:all 1s;
        height: @max-imgheight;
        width: @max-imgwidth;
      }
    }
    // 选中的轮播图右边
    .selRightBroCar {
      opacity: 0.8;
      left: 300px;
      transition:all 1s;
      z-index: 90;
    }
    // 没有选中放在右边的轮播图
    .noSelRightBroCar {
      left: 300px;
      transition:all 1s;
      height: @min-imgheight;
      width: @min-imgwidth;
      img{
        transition:all 1s;
        height: @min-imgheight;
        width: @min-imgwidth;
      }
    }
    ul {
      display: inline-block;
      margin: auto;
      z-index: 101;
      li {
        display: inline-block ;
        list-style: none;
        margin: 5px;
        div {
          height: 10px;
          width: 10px;
          background-color: #ccc;
          border-radius: 50%;
          &:hover{
          background: rgb(240, 240, 99);
          cursor:pointer;
          }
        }
      }
    }
  }
</style>
