<template>
  <div v-if="chord[0]">
    <add-chord-child :title="chord[0]"></add-chord-child>
  </div>
</template>

<script>
import addChordChild from './addChord/addChordChild'
import { mapState } from 'vuex'
export default {
  components: {
    addChordChild
  },
  computed: {
    ...mapState(['chord'])
  }
}
</script>

<style lang="less" scoped>

</style>
