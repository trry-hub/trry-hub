<script setup lang="ts">
const count = ref(0)
onMounted(() => {
  console.log(count.value)
})

</script>

<template>
  <div>{{ count }}</div>
  <el-button>Default</el-button>
  12312
</template>

<style lang="scss" scoped>

</style>
