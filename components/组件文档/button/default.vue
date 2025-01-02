<script lang="ts" setup>
import { ref, defineComponent } from 'vue'

const input = ref(1)
const content = ref(1)

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

<style lang="scss" scoped>
.n-input {
  border-radius: 1px;
}
</style>
