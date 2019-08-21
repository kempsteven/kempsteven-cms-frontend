import { getField, updateField } from 'vuex-map-fields'
import api from '@/store/api'

export const state = {
    loading: false,

    params: {
        keyword: ''
    },


    portfolioList: []
}

export const actions = {
    async getPortfolioList ({ state }, payload) {
        state.loading = true

        const { data } = await api('get', `/portfolio/get-portfolio${payload}`)

        state.portfolioList = data.list

        state.loading = false
    }
}

export const mutations = {
    updateField,

    clearForm() {
        // state.skillForm.id = ''
        // state.skillForm.oldSkillImgPublicId = ''

        // state.skillForm.skillName = ''
        // state.skillForm.skillLevel = ''
        // state.skillForm.skillImage = null
        // state.formHasChanged = false

        // state.isEditSkill = false
    },

    setFormChangesChecker() {
        // state.skillFormChangeChecker = {
        //     ...state.skillForm
        // }
    },

    checkFormChanges() {
        // for (let item of Object.keys(state.skillForm)) {
        //     if (state.skillForm[item] !== state.skillFormChangeChecker[item]) {
        //         state.formHasChanged = true

        //         return
        //     }
        // }
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
