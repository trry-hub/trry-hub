<script setup lang="ts">
// import RelLoading from '.vitepress/theme/components/RelLoading.vue'
const props = defineProps({
  src: {
    type: String,
    required: true,
  }
})

// 获取当前文件 的绝对路径
const __dirname = import.meta.url.match(/(.+\/)[^/]+$/)

const imgFullPath = '/public/images/base/bg.jpg'
// const imgFullPath = '../../../public/images/' + props.src
</script>

<template>
  <el-button>naive-ui</el-button>
  <!-- <img style="width: 100px;height: 100px;" :src="imgFullPath" alt=""> -->
  <!-- <n-image width="100" height="100" lazy :src="imgFullPath" :intersection-observer-options="{
    root: '#image-scroll-container'
  }">
    <template #placeholder>
      <div style="
            width: 100px;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #0001;
          ">
        Loading
      </div>
    </template>
  </n-image> -->
</template>

<style lang="scss" scoped></style>
