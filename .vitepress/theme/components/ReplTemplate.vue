<script lang="ts" setup>
import { Repl } from '@vue/repl'

let Monaco: any = null
if (window && window.navigator) {
  Monaco = await import('@vue/repl/monaco-editor')
}
</script>


<template>
  <Repl :editor="Monaco" :showImportMap="true" :showCompileOutput="false" :clearConsole="false"></Repl>
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
</style>
