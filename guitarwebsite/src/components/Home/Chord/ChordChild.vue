<template>
   <div class="chordBox">
      <div v-text="title.name_chord">C</div>
      <div>
         <table>
            <tr v-for="item in title.phonemicPoint_chord" :key="item.id">
               <td><div v-text="item.point"></div></td>
            </tr>
         </table>
         <table>
            <tr v-for="item in title.phonemicPoint_chord" :key="item.id">
                  <td class="phonemicPoint" v-for="(item1,index) in item.grades" :key="index">
                     <div v-if="item1==1"></div>
                  </td>
                  <td class="phoneticName"><div v-text="item.chordName"></div></td>
            </tr>
            <tr class="grade_chord"><td>1</td></tr>
         </table>
      </div>
   </div>
</template>

<script>
export default {
  name: 'ChordChild',
  props: ['title'],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
   .chordBox{
      padding: 10px 0px;
      display: flex;
      align-items: center;
      flex-direction: column;
      div {
         text-align: center;
         display: flex;
         align-items: flex-start;
      }
      table {
         float: left;
         border-collapse:collapse;
         display: line-block;
         th {
            vertical-align: middle;
            text-align: center;
            td {
            width: 100%;}
         }
         tr:first-child td,.grade_chord td{
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
      table:first-child {
         margin-right: 5px;
         border: 0px;
         td{
            height: 16px;
            border: 0px;
            border-right:1px solid;
         }
         div{
            position: relative;
            top: 8px;
            width: 15px;
            height: 15px;
            line-height: 15px;
         }
      }
      table:nth-child(2) {
         .phonemicPoint div {
            position: relative;
            top: 10px;
            width: 15px;
            height: 15px;
            border-radius: 100%;
            background-color: #000;
            margin: auto;
            font-size: 5px;
            color:#fff;
            text-align: center;
            line-height: 15px;
         }
         .phoneticName {
            border: 0;
            div{
               position: relative;
               top: 10px;
               width: 15px;
               height: 15px;
               margin: auto;
               font-size: 15px;
               text-align: center;
               line-height: 15px;
            }
         }
      }
   }
</style>
