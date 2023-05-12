
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { useData } from 'vitepress'
import Comments from "../components/Comments.vue";

const { Layout } = DefaultTheme;
const data = useData()

</script>

<template>
  <Layout>
    <!-- <template #doc-before>
      <Title />
      <Category />
    </template> -->
    <template #doc-after>
      <Comments />
    </template>
    <!-- Home slot-->
    <!-- <template #home-hero-before>
      <HomeHero />
    </template>
    <template #home-features-after>
      <Page />
    </template> -->
  </Layout>
  <!-- copywright -->
  <!-- <CopyWright /> -->
</template>
<style scoped>
button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
}

button::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--vp-c-color-d);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
