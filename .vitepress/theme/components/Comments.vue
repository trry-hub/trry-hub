<template>
  <div id="gitalk-container"></div>
</template>
<script lang="ts" setup>
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import { onContentUpdated, useRouter } from "vitepress"

// const { route, go } = useRouter();
function deleteChild() {
  const element = document.querySelector("#gitalk-container");
  let child = element?.lastElementChild;
  while (child) {
    element?.removeChild(child);
    child = element?.lastElementChild;
  }
}
onContentUpdated(() => {
  deleteChild();
  const gitalk = new Gitalk({
    clientID: "9c549f47dc3da76c4d8c",
    clientSecret: "5ce5e5aea11359a1262c30b6a03a5eea98dd6d43",
    repo: "trry-hub",
    owner: "trry-hub",
    admin: ["trry-hub"],
    id: location.pathname.substring(0, 50),
    language: "zh-CN",
    distractionFreeMode: true,
  });
  gitalk.render("gitalk-container");
});
</script>
