<template>
    <div class="loading-container" :style="`width: ${width}`">
        <div class="lds-dual-ring" />
    </div>
</template>

<script>
    export default {
        props: {
            width: {
                type: String,
                default: '100%'
            }
        }
    }
</script>

<style lang="scss" scoped>
.loading-container {
    height: 100%;
    min-height: 450px;
    position: absolute;
    background: rgba(40, 49, 66, 0.5);
    z-index: 10;
    border-radius: 3px;
    top: 0;
    left: 0;

    @include flex-box(center, center, '');

    .lds-dual-ring {
        display: inline-block;
        width: 64px;
        height: 64px;

        &:after {
            content: " ";
            display: block;
            width: 46px;
            height: 46px;
            margin: 1px;
            border-radius: 50%;
            border: 5px solid #fff;
            border-color: #fff transparent #fff transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}
</style>