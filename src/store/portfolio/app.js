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
        id: '',
        oldPortfolioDesktopImgPublicId: '',
        oldPortfolioMobileImgPublicId: '',

        portfolioTitle: '',
        portfolioDescription: '',
        portfolioTechnologies: [''],
        portfolioUrl: '',
        portfolioDesktopImg: '',
        portfolioMobileImg: ''
    },

    portfolioFormChangeChecker: {
        id: '',
        oldPortfolioDesktopImgPublicId: '',
        oldPortfolioMobileImgPublicId: '',

        portfolioTitle: '',
        portfolioDescription: '',
        portfolioTechnologies: [''],
        portfolioUrl: '',
        portfolioDesktopImg: '',
        portfolioMobileImg: ''
    },

    isEditPortfolio: false,

    isFormComplete: false,

    formHasChanged: false
}

export const actions = {
    async getPortfolioList ({ state }, payload) {
        state.loading = true

        const { data } = await api('get', `/portfolio/get-portfolio${payload}`)

        state.portfolioList = data.list

        state.loading = false
    },

    async createPortfolio ({ state, commit, dispatch }) {
        const {
            portfolioTitle,
            portfolioDescription,
            portfolioTechnologies,
            portfolioUrl,
            portfolioDesktopImg,
            portfolioMobileImg
        } = state.portfolioForm

        const regEx = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi

        if (portfolioUrl && !portfolioUrl.match(regEx)) {
            dispatch(
                'modal/errorModal',
                'Invalid URL!',
                { root: true }
            )

            return
        }

        state.createLoading = true

        const form = new FormData()

        form.append('portfolioTitle', portfolioTitle)
        form.append('portfolioDescription', portfolioDescription)
        form.append('portfolioTechnologies', portfolioTechnologies.join(','))
        form.append('portfolioUrl', portfolioUrl)
        form.append('portfolioDesktopImg', portfolioDesktopImg)
        
        // portfolioMobileImg is optional
        if (portfolioMobileImg) {
            form.append('portfolioMobileImg', portfolioMobileImg)
        }

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

        // append oldPortfolioMobileImgPublicId only when there is a mobile image to be replaced/removed
        if (oldPortfolioMobileImgPublicId) form.append('oldPortfolioMobileImgPublicId', oldPortfolioMobileImgPublicId)

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
    },

    async editPortfolio ({ state, commit, dispatch }) {
        const {
            id,
            oldPortfolioDesktopImgPublicId,
            oldPortfolioMobileImgPublicId,

            portfolioTitle,
            portfolioDescription,
            portfolioTechnologies,
            portfolioUrl,
            portfolioDesktopImg,
            portfolioMobileImg
        } = state.portfolioForm

        const regEx = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi

        if (portfolioUrl && !portfolioUrl.match(regEx)) {
            dispatch(
                'modal/errorModal',
                'Invalid URL!',
                { root: true }
            )

            return
        }

        state.createLoading = true

        const form = new FormData()

        form.append('portfolioTitle', portfolioTitle)
        form.append('portfolioDescription', portfolioDescription)
        form.append('portfolioTechnologies', portfolioTechnologies)
        form.append('portfolioUrl', portfolioUrl)

        form.append('portfolioDesktopImg', portfolioDesktopImg)
        form.append('oldPortfolioDesktopImgPublicId', oldPortfolioDesktopImgPublicId)
        form.append('portfolioMobileImg', portfolioMobileImg)

        // if there is only a mobile image to replace append this
        if (oldPortfolioMobileImgPublicId) {
            form.append('oldPortfolioMobileImgPublicId', oldPortfolioMobileImgPublicId)
        }

        const { status, data } = await api('patch', `/portfolio/edit-portfolio/${id}`, form)

        await dispatch('modal/closeModal', {}, { root: true })

        if (status !== 200) {
            commit('modal/errorModal', { root: true })

            state.createLoading = false
            return
        }

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'You have successfully updated a portfolio!',
        }, { root: true })

        state.portfolioList = data.list
        state.createLoading = false
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

        state.formHasChanged = false

        state.isEditPortfolio = false
    },

    setFormChangesChecker () {
        state.portfolioFormChangeChecker = {
            ...state.portfolioForm
        }
    },

    checkFormChanges () {
        for (let item of Object.keys(state.portfolioForm)) {
            if (state.portfolioForm[item] !== state.portfolioFormChangeChecker[item]) {
                state.formHasChanged = true

                return
            }
        }
    },

    checkFormComplete() {
        if (
            !state.portfolioForm.portfolioTitle ||
            !state.portfolioForm.portfolioDescription ||
            !state.portfolioForm.portfolioTechnologies ||
            !state.portfolioForm.portfolioDesktopImg
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
