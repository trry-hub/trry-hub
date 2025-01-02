<script setup lang="ts">
const count = ref(0)
onMounted(() => {
  console.log(count.value)
})

</script>

<template>
  <div>const: {{ count }} </div>
  <el-button @click="count++">Add</el-button>
</template>

<style lang="scss" scoped>

</style>
