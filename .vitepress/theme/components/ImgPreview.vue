<script setup lang="ts">
// import RelLoading from '.vitepress/theme/components/RelLoading.vue'
const props = defineProps({
  src: {
    type: String,
    required: true,
  }
})

// 获取当前文件 的绝对路径
const imgFullPath = '/public/images/' + props.src
</script>

<template>
  <el-image style="width: 100px; height: 100px" loading="lazy" :src="imgFullPath" :preview-src-list="[imgFullPath]" :zoom-rate="1.2" :initial-index="4" fit="cover" />
</template>

<style lang="scss" scoped></style>
