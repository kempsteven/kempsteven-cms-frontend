<template>
    <section class="header">
        <h1 class="header-title">
            <img
                class="title-icon"
                :src="require('@/assets/img/icon/dashboard.png')"
                alt="Header Title"
            >
            
            Dashboard
        </h1>

        <div class="admin-container">
            <div class="user-icon-container" @click="toggleDropdown = !toggleDropdown">
                <span class="user-icon">
                    &#129489;&#127995;
                </span>
            </div>

            <ul class="dropdown-container" :class="{ 'active' : toggleDropdown }">
                <li class="dropdown-item" @click="logOut()">
                    Logout
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    data () {
        return {
            toggleDropdown: false
        }
    },

    methods: {
        async logOut () {
            await this.$store.dispatch('authentication/logOut')
        }
    },
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    padding: 15px 0;

    @include flex-box(space-between, center, '');

    .header-title {
        display: block;
        margin: 0;
        padding: 15px 45px;
        color: #fff;
        @include flex-box(center, center, '');

        .title-icon {
            width: 50px;
            margin-right: 20px;
        }
    }

    .admin-container {
        position: relative;
        padding-right: 25px;

        .user-icon-container {
            @include flex-box(center, center, '');
            border: 1px solid #fff;
            border-radius: 50%;
            padding: 5px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
                background: rgba($color: #fff, $alpha: 0.5);
            }

            .user-icon {
                display: block;
                font-size: 30px;
                pointer-events: none;
            }
        }

        .dropdown-container {
            width: 150px;
            position: absolute;
            list-style: none;
            right: 25px;
            background: #fff;
            opacity: 0;
            pointer-events: none;
            top: 50%;
            transition: 0.3s;
            border-radius: 3px;
            overflow: hidden;

            &.active {
                opacity: 1;
                pointer-events: all;
                top: 100%;
            }

            .dropdown-item {
                padding: 10px 15px;
                text-align: left;
                cursor: pointer;
                transition: 0.3s;
                
                &:hover {
                    background: #4373b3;
                    color: #fff;
                }
            }
        }
    }
}
</style>