<template>
	<div class="login">
        <div class="video-container">
            <video
                loop
                muted
                playsinline
                key="1"
                oncontextmenu="return false;"
                @canplaythrough="videoHasBuffered()"
                class='video'
                ref="video"
            >
                <source :src="require('@/assets/video/coding.webm')" type="video/webm" />
                <source :src="require('@/assets/video/coding.mp4')" type="video/mp4" />
            </video>
        </div>

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

        <form class="login-form" @submit.prevent="login()">

            <section class="email-container">
                <input
                    class="email-input"
                    type="email"
                    placeholder="Email"
                    required
                    autocomplete
                    v-model="email"
                >
            </section>

            <section class="password-container">
                <input
                    type="password"
                    placeholder="Password"
                    required
                    autocomplete
                    v-model="password"
                >
            </section>

            <button type="submit" :class="{'disabled' : loading}">
                {{ loading ? 'Loading' : 'Login' }}
            </button>
        </form>
	</div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
export default {
    computed: {
        // The `mapFields` function takes an array of
        // field names and generates corresponding
        // computed properties with getter and setter
        // functions for accessing the Vuex store.
        ...mapFields('authentication', [
            'email',
            'password',
            'loading'
        ]),
    },

    data () {
        return {
            // isVideoLoaded: false
        }
    },

    methods: {
        async login () {
            if (this.loading) return

            await this.$store.dispatch('authentication/login')
        },

        videoHasBuffered () {
            // this.isVideoLoaded = true
            this.$refs.video.play()
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    @include flex-box(center, center, column);
    position: relative;
    overflow: hidden;

    .video-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;

        .video-fallback {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            // height: 100%;
            width: 100%;
            min-width: 1920px;
            filter: blur(10px);
            transform: scale(1.04);
        }

        .video {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            min-height: 100%;
            min-width: 100%;
            filter: blur(10px);
            transform: scale(1.04);
            transition: 0.3s;
        }
    }

    .logo-container {
        width: 350px;
        @include flex-box(center, center, '');
        margin-bottom: 50px;
        border-bottom: 2px solid #fff;
        padding: 10px 0;
        
        .logo {
            width: 70px;
            margin-right: 25px;
        }

        .logo-title {
            display: inline-block;
            color: #fff;
            font-size: 35px;
        }
    }

    .login-form {
        width: 350px;

        input {
            padding: 20px 25px 20px 52px;
            background: transparent;
            border: 1px solid #fff;
            color: #fff;
            width: 100%;
            border-radius: 3px;
            margin-bottom: 15px;
            outline: none;
            transition: 0.3s;
            font-size: 16px;

            &:focus { 
                background-color: rgba(250, 250, 250, 0.1);
            }

            &:hover { 
                background-color: rgba(250, 250, 250, 0.1);
            }

            &::placeholder {
                color: #fff;
            }
        }

        .email-container {
            position: relative;
            
            &::before {
                position: absolute;
                content: '';
                width: 36px;
                height: 36px;
                background-image: url('../../assets/img/icon/user.png');
                background-size: 26px;
                background-repeat: no-repeat;
                left: 14px;
                top: 16px;
            }
        }

        .password-container {
            position: relative;
            
            &::before {
                position: absolute;
                content: '';
                width: 36px;
                height: 36px;
                background-image: url('../../assets/img/icon/lock.png');
                background-size: 26px;
                background-repeat: no-repeat;
                left: 14px;
                top: 16px;
            }
        }

        button {
            width: 100%;
            padding: 20px 25px;
            border: 1px solid transparent;
            background-color:rgba(114, 166, 247, 0.7);
            border-radius: 3px;
            font-size: 16px;
            margin-top: 10px;
            color: #fff;
            transition: 0.3s;

            &:hover {
                background-color: #72a6f7;
            }

            &.disabled {
                opacity: 0.8;
                pointer-events: none;
            }
        }
    }
}
</style>
