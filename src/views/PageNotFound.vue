<template>
	<div class="page-not-found">
        <h1 class="not-found-header">
            Page not found :(
        </h1>
	</div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
export default {
}
</script>
<style lang="scss" scoped>
.page-not-found {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .not-found-header {
        display: inline-block;
    }
}
</style>
