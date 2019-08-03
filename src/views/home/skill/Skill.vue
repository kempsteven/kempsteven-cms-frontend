<template>
    <div class="skill">
        <CardList />
    </div>
</template>

<script>

export default {
    components: {
        CardList: () => import('@/components/global/CardList.vue'),
    },
}
</script>

<style lang="scss" scoped>
.skill {
    width: 100%;
}
</style>