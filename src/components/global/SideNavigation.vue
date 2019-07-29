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
            <li class="nav-item" :class="{ 'active' : $route.name === 'dashboard' }">
                <router-link class="router-link" to="/dashboard">
                    <div class="nav-icon"/>

                    <span class="nav-name">
                        Dashboard
                    </span>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link class="router-link" to="/dashboard">
                    <div class="nav-icon"/>

                    <span class="nav-name">
                        Dashboard
                    </span>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link class="router-link" to="/dashboard">
                    <div class="nav-icon"/>

                    <span class="nav-name">
                        Dashboard
                    </span>
                </router-link>
            </li>

            <li class="nav-item">
                <router-link class="router-link" to="/dashboard">
                    <div class="nav-icon"/>

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
    width: 230px;
    padding: 25px 0px 25px 0px;
    background: #13161D;
    background: linear-gradient(0deg, #13161D 0%, #2F3A4C 80%);

    .logo-container {
        width: 100%;
        @include flex-box(flex-start, center, '');
        margin-bottom: 25px;
        border-radius: 3px;
        padding: 10px 0 10px 25px;
        
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
            padding: 5px 10px 5px 20px;
            border-radius: 1px;
            border-left: 5px solid transparent;
            transition: 0.2s;

            &.active {
                border-left: 4px solid #8ddff8;

                .router-link {
                    color: #8ddff8;

                    .nav-icon {
                        background-image: url('~@/assets/img/icon/dashboard_hover.png');
                    }
                }
            }

            &:hover {
                 border-left: 4px solid #8ddff8;

                .router-link {
                    color: #8ddff8;

                    .nav-icon {
                        background-image: url('~@/assets/img/icon/dashboard_hover.png');
                    }
                }
            }

            .router-link {
                @include flex-box(flex-start, center, '');
                text-decoration: none;
                color: #fff;
                transition: 0.2s;

                .nav-icon {
                    width: 32px;
                    height: 32px;
                    margin-right: 15px;
                    background-repeat: no-repeat;
                    background-size: cover;
                    background-image: url('~@/assets/img/icon/dashboard.png');
                }

                .nav-name {
                    display: block;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>