<template>
    <div class="modal-bg" @click.self="$emit('bgClick')">
        <div class="modal-container">
            <slot name="content" />
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.modal-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: +99;
    width: 100vw;
    height: 100vh;

    .modal-container {
        background-color: #293243;
        padding: 15px;
        box-shadow: 0 0 3px #00000029;
        border-radius: 2px;
        color: #fff;
    }
}
</style>