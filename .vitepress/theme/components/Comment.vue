// Comment.vue
<template>
    <div id="gitalk-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'
onMounted(() => {
    const commentConfig = {
        id: decodeURI('{{location.pathname}}'),
        clientID: 'c4c0ab7e9d863f794f47',
        clientSecret: 'f94ef6f0171184250e46597a7f114a31077d44b6',
        repo: '-Learning',
        owner: 'trry-github',
        admin: ['trry-github']
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render('gitalk-container')
})
</script>