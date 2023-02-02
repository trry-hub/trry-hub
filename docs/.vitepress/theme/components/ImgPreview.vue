<template>
    <div>
        <n-image class="img-preview" :height="height" v-bind="$attrs" :width="width" :src="withBase(baseUrl + src)" />
    </div>
</template>

<script setup>
import { withBase, useData } from 'vitepress'

const props = defineProps({
    width: {
        type: Number,
        default: 400
    },
    src: {
        type: String,
        default: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    },
    baseUrl: {
        type: String,
        default: ''
    },
    height: ''
})
</script>

<style lang="scss" scoped>
:deep(.img-preview) {
    transition: all 0.3s;
    &:hover {
        -webkit-box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
        box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
        -webkit-transform: translate3d(0, -2 px, 0);
        transform: translate3d(0, -2px, 0);
    }
}
</style>

<style lang="scss">
.n-image-preview-toolbar {
    * {
        box-sizing: content-box !important;
    }
}
</style>
