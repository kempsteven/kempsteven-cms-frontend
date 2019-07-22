<template>
    <nav class="side-nav">
        <div class="logo-container">
            <img
                class="logo"
                :src="require('@/assets/img/ks-logo.png')"
                alt="KS Logo"
            >

            <span class="logo-title">
                Kemp Steven
            </span>
        </div>

        <ul class="nav-list">
            <li class="nav-item active">
                <router-link class="router-link" to="/dashboard">
                    <img
                        class="nav-icon"
                        :src="require('@/assets/img/icon/dashboard.png')"
                        alt="Dashboard Icon"
                    >

                    <span class="nav-name">
                        Dashboard
                    </span>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link class="router-link" to="/dashboard">
                    <img
                        class="nav-icon"
                        :src="require('@/assets/img/icon/dashboard.png')"
                        alt="Dashboard Icon"
                    >

                    <span class="nav-name">
                        Dashboard
                    </span>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link class="router-link" to="/dashboard">
                    <img
                        class="nav-icon"
                        :src="require('@/assets/img/icon/dashboard.png')"
                        alt="Dashboard Icon"
                    >

                    <span class="nav-name">
                        Dashboard
                    </span>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link class="router-link" to="/dashboard">
                    <img
                        class="nav-icon"
                        :src="require('@/assets/img/icon/dashboard.png')"
                        alt="Dashboard Icon"
                    >

                    <span class="nav-name">
                        Dashboard
                    </span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.side-nav {
    width: 350px;
    padding: 25px 45px;

    .logo-container {
        width: 100%;
        @include flex-box(flex-start, center, '');
        margin-bottom: 25px;
        // border: 1px solid #fff;
        border-radius: 3px;
        padding: 10px 0 10px 0px;
        
        .logo {
            width: 40px;
            margin-right: 8px;
        }

        .logo-title {
            display: inline-block;
            color: #fff;
            font-size: 20px;
        }
    }

    .nav-list {
        list-style: none;
        display: block;
        padding: 0;
        margin: 0;

        .nav-item {
            display: block;
            // margin: 15px 0;
            padding: 5px 10px;
            border-radius: 1px;
            transition: 0.3s;

            &.active {
                background: rgba($color: #fff, $alpha: 0.2);

                .nav-name {
                    // font-weight: 600;
                }
            }

            &:hover {
                background: rgba($color: #fff, $alpha: 0.2);

                .nav-name {
                    // font-weight: 600;
                }
            }

            .router-link {
                @include flex-box(flex-start, center, '');

                text-decoration: none;
                color: #fff;

                .nav-icon {
                    width: 40px;
                    margin-right: 20px;
                }

                .nav-name {
                    display: block;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>