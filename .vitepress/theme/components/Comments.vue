<template>
  <ClientOnly>
    <Waline id="waline" :path="path" :serverURL="serverURL"></Waline>
  </ClientOnly>
</template>

<script setup>
import { useRoute } from 'vitepress'
import { Waline } from '@waline/client/component'
import '@waline/client/style'

const serverURL = 'https://trry-blog-4baxyu3gw-trry-hubs-projects.vercel.app/';
const path = computed(() => useRoute().path);
</script>
