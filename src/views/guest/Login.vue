<template>
	<div class="login">
        <form class="login-form" @submit.prevent="login()">
            <input
                type="email"
                placeholder="Email"
                required
                autocomplete
                v-model="email"
            >

            <input
                type="password"
                placeholder="Password"
                required
                autocomplete
                v-model="password"
            >

            <button type="submit">
                Login
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

    methods: {
        async login () {
            await this.$store.dispatch('authentication/login')
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;

    .login-form {
        width: 300px;
        padding: 25px;
        border-radius: 3px;
        background: #fff;
        margin: 100px auto 0 auto;

        input {
            padding: 10px 15px;
            margin-bottom: 15px;
        }

        button {
            width: 100%;
            padding: 10px 15px;
        }
    }
}
</style>
