<script setup lang="ts">
const count = ref(0)
onMounted(() => {
  console.log(count.value)
})

</script>

<template>
  <div>{{ count }}</div>
</template>

<style lang="scss" scoped>

</style>
