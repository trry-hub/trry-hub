# Vue Script

<script>
import { defineAsyncComponent } from 'vue'
import Loading from '@theme/components/Loading.vue'

export default {
  components: {
    TutorialRepl: defineAsyncComponent({
      loader: () => new Promise((reslove) => {
        setTimeout(async() => {
          const com = await import('@theme/components/ReplTemplate.vue')
          reslove(com.default)
        }, 2000)
      }),
      loadingComponent: Loading
    })
  }
}
</script>

<ClientOnly>
  <TutorialRepl />
</ClientOnly>

## 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```vue
<template>
  <el-space>
    <el-button>Default</el-button>
    <el-button @click="onSubmit" type="tertiary"> Tertiary </el-button>
    <el-button @click="onSubmit" type="primary"> Primary </el-button>
    <el-button @click="onSubmit" type="info"> Info </el-button>
    <el-button @click="onSubmit" type="success"> Success </el-button>
    <el-button @click="onSubmit" type="warning"> Warning </el-button>
    <el-button @click="onSubmit" type="error"> Error </el-button>
  </el-space>
  <div style="margin-top: 16px">输出内容：{{ content }}</div>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'InputDemo',
  setup() {
    const input = ref(1)
    const content = ref(1)

    function onSubmit() {
      content.value += input.value
    }

    return { input, content, onSubmit }
  }
})
</script>

<style lang="scss" scoped>
.n-input {
  border-radius: 1px;
}
</style>
```

:::

## Setup TypeScript 用法

setup typescript 用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```vue
<template>
  <el-space>
    <el-button>Default</el-button>
    <el-button @click="onSubmit" type="tertiary"> Tertiary </el-button>
    <el-button @click="onSubmit" type="primary"> Primary </el-button>
    <el-button @click="onSubmit" type="info"> Info </el-button>
    <el-button @click="onSubmit" type="success"> Success </el-button>
    <el-button @click="onSubmit" type="warning"> Warning </el-button>
    <el-button @click="onSubmit" type="error"> Error </el-button>
  </el-space>
  <div style="margin-top: 16px">输出内容：{{ content }}</div>
</template>

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

<style lang="scss" scoped>
.el-input {
}
</style>
```

:::
