<template>
    <section class="dashboard-card">
        <img
            class="card-icon"
            :src="icon"
            alt="Card Icon"
        >
        
        <div class="details-container">
            <div class="card-value">
                {{ value }}
            </div>

            <span class="card-title">
                {{ name }}
            </span>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: '' 
        },

        value: {
            type: String,
            default: '' 
        },

        icon: {
            type: String,
            default: '' 
        }
    },
}
</script>

<style lang="scss" scoped>
.dashboard-card {
    width: 30%;
    background-color: #293243;
    box-shadow: 0px 0px 22px 3px #1B222C;
    padding: 25px 15px;
    border-radius: 2px;
    color: #fff;
    @include flex-box(center, center, '');

    .card-icon {
        width: 55px;
        margin-right: 40px;
    }

    .details-container {
        .card-value {
            font-size: 35px;
            margin-bottom: 15px;
        }

        .card-title {
            font-size: 14px;
            display: block;
            font-weight: 600;
            color: #fff;
        }
    }
}
</style>