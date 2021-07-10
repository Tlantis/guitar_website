<template>
  <div class="w">
    <table>
        <tr v-for="item in panel" :key="item[0]">
            <td v-for="(item1,index) in item" :key="index">
              <!-- <span class="fret"></span> -->
              <div @click="clickdiv(item1)">{{item1}}</div>
            </td>
        </tr>
    </table>
    <div>
      {{item}}
    </div>
    <button>添加</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: 'c',
      panel: [
        ['第一弦', 3, 4, '', 5, '', 6, '', 7, 1, '', 2, '', 3, ''],
        ['第二弦', 7, 1, '', 2, '', 3, 4, '', 5, '', 6, '', 7, ''],
        ['第三弦', 5, '', 6, '', 7, 1, '', 2, '', 3, 4, '', 5, ''],
        ['第四弦', 2, '', 3, 4, '', 5, '', 6, '', 7, 1, '', 2, ''],
        ['第五弦', 6, '', 7, 1, '', 2, '', 3, 4, '', 5, '', 6, ''],
        ['第六弦', 3, 4, '', 5, '', 6, '', 7, 1, '', 2, '', 3, ''],
        ['', '开发弦', '第一格', '第二格', '第三格', '第四格', '第五格', '第六格', '第七格', '第八格', '第九格', '第十格', '第十一格', '第十二格', '第十三格']
      ]
    }
  },
  methods: {
    clickdiv (item) {
      this.item = item
      console.log('3')
    }
  }
}
</script>

<style lang="less" scoped>
table {
    border-collapse:collapse;
    margin-bottom:50px;
    tr {
      &:first-child{
        td{
          border:0px !important;
          background-color: transparent !important;
        }
      }
      &:last-child{
        td{
          border:0px !important;
          background-color: transparent !important;
          div{
            width: 15px;
          }
        }
      }
      td {
        width: 36px;
        height: 20px;
        padding: 0;
        border-width: 1px 5px;
        border-style: solid;
        border-color: #D4AF37 #c0c0c0;
        text-align: center;
        &:nth-child(n+3){
          background-color: #fff;
        }
        &:first-child {
          border:0px !important;
          width: 50px;
        }
        &:nth-child(2) {
          border:0px !important;
        }
        &:not(:first-child) {
          .highPitchPoint:before {
              position: absolute;
              content: '.';
              top: -91%;
              left: 45%;
          }
          .treble:before {
              position: absolute;
              content: ':';
              top: -80%;
              left: 45%;
          }
          .bassPoint:after{
              position: absolute;
              content: '.';
              top: 24%;
              left: 45%;
          }
        }
        div {
          display: inline-block;
          position: relative;
          top: 10px;
          height: 15px;
          width: 100%;
          margin: auto;
          font-size: 15px;
          line-height: 15px;
          &:hover{
            cursor:pointer;
          }
        }
        // .fret {
        //   display: inline-block;
        //   height: 100%;
        //   width: 5px;
        //   background-color: #c0c0c0;
        // }
      }
    }
}

</style>
