<template>
  <div class="chordBox">
    <!-- 和弦名称C -->
    <div>
      <div class="name_chord" v-show="identification != 'name_chord'" v-text="dtitle.name_chord" @click="name_chordDom('name_chord', $refs.name_chord_input)"></div>
      <input type="text" v-show="identification == 'name_chord'" v-model="dtitle.name_chord" ref="name_chord_input" @blur="identification = false">
    </div>
    <div class="levelDiv">
      <!-- point表格 -->
      <table class="pointTable">
        <tr v-for="item in dtitle.phonemicPoint_chord" :key="item.id">
            <td><div class="point" v-text="item.point" @click="pointChange(item.id)"></div></td>
        </tr>
      </table>

      <div class="phonemicTableFather">
        <!-- 小黑点 指法表格 -->
        <table class="phonemicTable">
          <tr v-for="item in dtitle.phonemicPoint_chord" :key="item.id">
                <td class="phonemicPoint" v-for="(item1,index) in item.grades" :key="index">
                  <div :class="{choise: item1==1}" @click="choise(item.id-1, index, $event)">
                  </div>
                </td>
                <td class="phoneticName"><div v-text="Scale[item.chordName]"></div></td>
          </tr>
        </table>
        <!-- 品级 -->
        <div>
          <div class="grade_chord" v-show="identification != 'grade_chord'" v-text="dtitle.grade_chord" @click="name_chordDom('grade_chord', $refs.grade_chord_input)">
          </div>
          <div class="grade_chord">
            <input type="text" v-show="identification == 'grade_chord'" v-model="dtitle.grade_chord" ref="grade_chord_input" @blur="gradeChordInputBlur()">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ChordChild',
  data () {
    return {
      identification: false, // input标识符. 为false时不存在input 当改为某个名字时 则隐藏某text 显示某input
      Scale: [' ', 'C', '#C', 'D', '#D', 'E', 'F', '#F', 'G', '#G', 'A', '#A', 'B'] // 音级名数组 使用数字来获取该数组的方式得到音级名 方便在函数中计算.
    }
  },
  computed: {
    ...mapGetters(['dtitle'])
  },
  methods: {
    name_chordDom (who, el) { // 点击和弦名时,文本隐藏 显示input框并获取焦点
      this.identification = who
      setTimeout(() => { // ref不是响应式的，所有的动态加载的模板更新它都无法相应的变化。ref不是响应式的，所有的动态加载的模板更新它都无法相应的变化。
        el.focus() // input获取焦点
      }, 0)
    },
    pointChange (id) { // 小黑点改变函数 id从0开始
      // console.log(id)
      // console.log(this.dtitle.phonemicPoint_chord[id - 1].point)
      var point = this.dtitle.phonemicPoint_chord[id - 1].point // 第几弦 因为传进来的是从1开始 所以减1从0开始.
      var gradesLength = this.dtitle.phonemicPoint_chord[id - 1].grades.length // 每条弦上有几品

      if (point !== 'X') { // 如果该弦point不为'X'
        this.dtitle.phonemicPoint_chord[id - 1].point = 'X' // 先执行该弦point修改为'X'

        for (let i = 0; i < gradesLength; i++) { // 对该弦进行循环判断是否存在小黑点
          if (this.dtitle.phonemicPoint_chord[id - 1].grades[i] !== 0) { // 一旦发现该弦存在小黑点
            this.$message('该弦上存在小黑点 不可更改为X') // 该弦上存在小黑点 不可更改为'X'
            this.dtitle.phonemicPoint_chord[id - 1].point = '' // 强制改为' '
            break
          }
        }
      } else { // 当该弦point 为 'X'
        for (let i = 0; i < gradesLength; i++) { // 对该弦进行循环判断是否存在小黑点
          if (this.dtitle.phonemicPoint_chord[id - 1].grades[i] !== 0) { // 如果存在小黑点
            this.dtitle.phonemicPoint_chord[id - 1].point = '' // 改为' '
            break// 直接跳出循环
          }
          // 全部走完发现没有存在小黑点 则改该弦point为'0'
          this.dtitle.phonemicPoint_chord[id - 1].point = '0'
        }
      }
    },
    choise (id, index, e) { // 切换小黑点.调用函数改变音级名
      if (this.dtitle.phonemicPoint_chord[id].grades[index]) { // 如果该div为小黑点的话
        this.dtitle.phonemicPoint_chord[id].grades[index] = 0 // 则将该点信息改为0
        e.target.className = '' // 此外 因为:class不是响应式的 所以需要手动将该dom元素的class进行修改
      } else { // 如果该div不是小黑点的话
        this.dtitle.phonemicPoint_chord[id].grades[index] = 1 // 修改该点信息为1
        e.target.className = 'choise' // 手动将该dom元素的class进行修改
      }
      this.chordNameChange(id) // 调用修改音级函数 将该弦上的音级名进行修改
    },
    gradeChordInputBlur () { // 修改品级名称grade_chord时 触发所有弦进行修改音级名chordName行为
      if (this.dtitle.grade_chord <= 0 | this.dtitle.grade_chord > 12) { // 不允许品级不在1 到 12之间
        this.dtitle.grade_chord = 1
      }
      this.identification = false // 隐藏input 显示text
      var phonemicPointChordLength = this.dtitle.phonemicPoint_chord.length
      for (let i = 0; i < phonemicPointChordLength; i++) { // 对所有弦进行音程名变更
        this.chordNameChange(i)
      }
    },
    chordNameChange (id) { // 修改音级函数 id为第几弦
      var gradesLength = this.dtitle.phonemicPoint_chord[id].grades.length // 每条线有几品
      var grades = this.dtitle.phonemicPoint_chord[id].grades // 该弦的和弦组成数组
      var EmptyScale = this.dtitle.phonemicPoint_chord[id].EmptyScale // 该弦的空弦音级名
      var gradeChord = parseInt(this.dtitle.grade_chord) // 品级
      for (let i = gradesLength; i > 0; i--) { // 从后往前看
        if (grades[i - 1] === 1) { // 情况1该弦上有小黑点 找出最后一个1是第几个
          // 三元表达式剔除为0的情况以12替代
          // 空弦音级 + 品级 + 小黑点所在品级 得出该弦当前音级
          this.dtitle.phonemicPoint_chord[id].chordName = ((EmptyScale + gradeChord + -1 + i) % 12) === 0 ? 12 : ((EmptyScale + i + gradeChord + -1) % 12)
          this.dtitle.phonemicPoint_chord[id].point = ''
          break // 一当找到小黑点立即结束循环
        }
        // 如果该弦上没有小黑点,则使用 空弦音级 作为该弦当前音级
        this.dtitle.phonemicPoint_chord[id].chordName = EmptyScale
        this.dtitle.phonemicPoint_chord[id].point = '0' // 当该弦没有小黑点时 该弦point应该为'0'空弦
      }
    }
  }
}
</script>

<style lang="less" scoped>
    input { // 所有输入框的样式
      display: inline-block;
      width: 50px;
      border: 0px;
    }
   .chordBox { // 包裹整个和弦的div
      padding: 10px 0px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .name_chord { // 和弦名称div
        &:hover{
          background: rgb(68, 68, 68);
        }
      }
      .levelDiv { // 水平div 在该div中的子元素以水平呈现
         text-align: center;
         display: flex;
         align-items: flex-start;
      }
      table {
         border-collapse:collapse; // 去除格子间的缝隙
         tr:first-child td,.grade_chord td{ // 每个表格的第一个tr中的td
            border:0px !important;
         }
         td {
            width: 18px;
            height: 15px;
            padding: 0;
            border:1px solid;
            text-align: center;
         }
      }
      .pointTable { // point表格
         margin-right: 5px;
         border: 0px;
         td{
            height: 16px;
            border: 0px;
            border-right:1px solid;
            .point{
              position: relative;
              top: 10px;
              width: 15px;
              height: 15px;
              line-height: 15px;
              &:hover{
                background-color: rgb(68, 68, 68);
                cursor:pointer;
              }
            }
         }
      }
      .phonemicTableFather{ // 在该div中的子元素都是垂直靠左呈现
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .phonemicTable { // 存放 小黑点 和 音级名 表格
          .phonemicPoint { // 小黑点表格块
            div {// 第二个table表格中
              position: relative;
              top: 8px;
              width: 15px;
              height: 15px;
              border-radius: 100%;
              margin: auto;
              font-size: 5px;
              color:#fff;
              text-align: center;
              line-height: 15px;
              &:hover{
                width: 13px;
                height: 13px;
                border: 1px solid rgb(68, 68, 68);
                cursor:pointer;
              }
            }
            .choise{ // 选中的小黑点
              background-color: #000;
            }
          }
          .phoneticName {// 最后一列td 音级名
              border: 0;
              div{
                position: relative;
                top: 10px;
                width: 30px;
                height: 15px;
                margin: auto;
                font-size: 15px;
                text-align: center;
                line-height: 15px;
              }
          }
        }
        .grade_chord { // 品级
          margin: 5px;
          &:hover{
            background: rgb(68, 68, 68);
          }
        }
      }
   }
</style>
