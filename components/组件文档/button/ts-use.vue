<script lang="ts" setup>
import { ref } from 'vue'

interface IObject {
  [k: string]: any
}

const input = ref<any>(1)
const content = ref<any>(1)

function onSubmit() {
  content.value += input.value
}
</script>

<template>
  <el-space>
    <el-button>Default</el-button>
    <el-button @click="onSubmit" type="primary"> Primary </el-button>
    <el-button @click="onSubmit" type="info"> Info </el-button>
    <el-button @click="onSubmit" type="success"> Success </el-button>
    <el-button @click="onSubmit" type="warning"> Warning </el-button>
    <el-button @click="onSubmit" type="danger"> Danger </el-button>
  </el-space>
  <div style="margin-top: 16px">输出内容：{{ content }}</div>
</template>
