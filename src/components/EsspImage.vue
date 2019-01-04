<template>
    <viewer :images="images">
        <img v-for="src in images" :src="src" :key="src" width="300">
    </viewer>
</template>

<script>
    export default {
        props:['images']
    }
</script>

<style scoped>

</style>
