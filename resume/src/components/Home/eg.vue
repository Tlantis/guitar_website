<template>
   <div class="w">
      <div><chord-child :title='$route.params'></chord-child></div>
      <p>
         C和弦是由C、E、G三个音叠置构成的大三和弦，是C大调中的I级主和弦。上图为常见的C和弦图表现形式。或者追加有小指按6弦3品，在学习的过程中由于简化指法所以我们没有按6弦3品。
         和弦图中的数字1代表食指、2代表中指、3代表无名指、4代表小指，如果和弦图中有数字5或者字母T则代表大拇指。
      </p>
      <p>
         C和弦的按法：
         简化指法时：食指按2弦1品、中指按4弦2品、无名指按5弦3品
         不简化指法时：食指按2弦1品、中指按4弦2品、无名指按6弦3品、小指按5弦3品
      </p>
   </div>
</template>

<script>
import ChordChild from './Chord/ChordChild'
export default {
  components: {
    ChordChild
  }
}
</script>

<style lang="less" scoped>

</style>
