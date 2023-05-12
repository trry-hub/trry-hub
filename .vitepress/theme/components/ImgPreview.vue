<script setup lang="ts">
import { withBase } from 'vitepress';

const props = defineProps({
  src: {
    type: String,
    required: true,
  }
})

// 获取当前文件 的绝对路径
const imgFullPath = withBase('/images'+props.src)
</script>

<template>
  <el-image style="width: 100px; height: 100px" loading="lazy" :src="imgFullPath" :preview-src-list="[imgFullPath]" :zoom-rate="1.2" :initial-index="4" fit="cover" />
</template>

