import { getField, updateField } from 'vuex-map-fields'
import api from '@/store/api'

export const state = {
    loading: false,

    params: {
        keyword: ''
    },

    portfolioList: [],

    createLoading: false,

    portfolioForm: {
        portfolioTitle: '',
        portfolioDescription: '',
        portfolioTechnologies: [''],
        portfolioUrl: '',
        portfolioDesktopImg: '',
        portfolioMobileImg: ''
    },

    isEditPortfolio: false,

    isFormComplete: false
}

export const actions = {
    async getPortfolioList ({ state }, payload) {
        state.loading = true

        const { data } = await api('get', `/portfolio/get-portfolio${payload}`)

        state.portfolioList = data.list

        state.loading = false
    },

    async createPortfolio ({ state, commit, dispatch }) {
        state.createLoading = true

        const form = new FormData()

        form.append('portfolioTitle', state.portfolioForm.portfolioTitle)
        form.append('portfolioDescription', state.portfolioForm.portfolioDescription)
        form.append('portfolioTechnologies', state.portfolioForm.portfolioTechnologies.join(','))
        form.append('portfolioUrl', state.portfolioForm.portfolioUrl)
        form.append('portfolioDesktopImg', state.portfolioForm.portfolioDesktopImg)
        form.append('portfolioMobileImg', state.portfolioForm.portfolioMobileImg)

        const { status, data } = await api('post', `/portfolio/add-portfolio`, form)

        await commit('clearForm')

        await dispatch('modal/closeModal', {}, { root: true })

        if (status !== 200) {
            commit('modal/errorModal', { root: true })

            return
        }

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'You have successfully created a portfolio!',
        }, { root: true })

        state.portfolioList = data.list

        state.createLoading = false
    },

    async deletePortfolio({ state, commit }, {
        id,
        oldPortfolioDesktopImgPublicId,
        oldPortfolioMobileImgPublicId
    }) {
        state.loading = true

        const form = new FormData()
        form.append('oldPortfolioDesktopImgPublicId', oldPortfolioDesktopImgPublicId)
        form.append('oldPortfolioMobileImgPublicId', oldPortfolioMobileImgPublicId)

        // Axios for Delete Request we would have to pass a { data: form } object
        const { status, data } = await api('delete', `/portfolio/delete-portfolio/${id}`, { data: form })

        if (status !== 200) {
            commit('modal/errorModal', { root: true })

            state.loading = false
            return
        }

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'You have successfully deleted a portfolio!',
        }, { root: true })

        state.portfolioList = data.list
        state.loading = false
    } 
}

export const mutations = {
    updateField,

    clearForm () {
        state.portfolioForm = {
            portfolioTitle: '',
            portfolioDescription: '',
            portfolioTechnologies: [''],
            portfolioUrl: '',
            portfolioDesktopImg: '',
            portfolioMobileImg: ''
        }
    },

    setFormChangesChecker () {
    },

    checkFormChanges () {
    },

    checkFormComplete() {
        if (
            state.portfolioForm.portfolioTitle === '' ||
            state.portfolioForm.portfolioDescription === '' ||
            state.portfolioForm.portfolioTechnologies === '' ||
            state.portfolioForm.portfolioDesktopImg === '' ||
            state.portfolioForm.portfolioMobileImg === ''
        ) {
            state.isFormComplete = false

            return
        }

        state.isFormComplete = true
    }
}

const getters = {
    getField
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
}
