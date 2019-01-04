<template>
    <div>
        {{msg}}
    </div>
</template>

<script>
    import EsspHead from '@/components/EsspHead'
    export default {
        name: "",
        components: {
            EsspHead
        },
        data() {
            return {
                msg: "群组事务"
            }
        }
    }
</script>

<style scoped>

</style>
