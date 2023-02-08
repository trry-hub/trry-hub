<template>
    <div>
        {{sourceCode}}
        <slot/>
    </div>
</template>


<script setup name="example">
const props = defineProps({
    sourceCode: {
        type: String,
        default: ''
    }
})

</script>
<style lang="scss" scoped>
.div[class*="language-"],.line-numbers-wrapper {
        background-color: #f9fafc;
}
</style>
