<!-- <script lang="ts" setup>
import { Repl, ReplStore } from '@vue/repl'
import '@vue/repl/style.css'
import { version } from 'vue'

const store = new ReplStore({
  defaultVueRuntimeURL: `https://unpkg.com/vue@${version}/dist/vue.esm-browser.js`
})

store.setFiles({ 'App.vue': `` })
</script>


<template>
  <Repl :store="store" :showImportMap="true" :showCompileOutput="false" :clearConsole="false"></Repl>
</template>

<style lang="scss" scoped>
.vue-repl {
  width: 100%;
  height: 1000px;
  border: 1px solid var(--border);

  :deep(.split-pane) {
    flex-direction: column;

    >div {
      width: 100% !important;
    }

    .left {
      order: 1;
      border-top: 1px solid var(--border);
      border-right: none;
    }
  }
}

@media (max-width: 960px) {
  .vue-repl {
    border: none;
    height: calc(var(--vh, 0px) - var(--vt-nav-height) - var(--vt-banner-height, 0px) - 48px);
  }
}
</style> -->

<script setup lang="ts">
import { onMounted, ref } from 'vue';

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
