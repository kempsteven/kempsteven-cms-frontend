import api from '@/store/api'
import cookies from 'js-cookie'
import router from '../../router'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    email: '',
    password: '',
    error: '',
    loading: false,
    token: cookies.get('token'),
    isLoggedIn: false
}

export const actions = {
    async login ({ commit }) {
        state.loading = true

        let form = new FormData()

        form.append('email', state.email)
        form.append('password', state.password)

        const { data } = await api('post', '/user/login', form)

        commit('clearLogin')

        // if error
        if (data.status !== 200) {
            commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'error',
                modalTitle: 'Oooops!',
                modalDesc: data.message,
            }, { root: true })

            return
        }

        //setting of token
        cookies.set('token', data.token, { expires: 36500 })
        state.token = data.token

        router.push('/dashboard')
    },

    async checkToken () {
        const { data } = await api('get', '/user/check-token')

        if (!data || data.status !== 200) {
            state.isLoggedIn = false
            state.token = ''
            cookies.remove('token')
            return
        }

        state.isLoggedIn = true
    },
}

export const mutations = {
    updateField,

    clearLogin () {
        state.email = ''
        state.password = ''
        state.error = ''
        state.loading = false
    }
}

const getters = {
    getField
}

export default {
    state,
    actions,
    mutations,
    getters
}
