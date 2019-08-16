import { getField, updateField } from 'vuex-map-fields'
import api from '@/store/api'

export const state = {
    loading: false,
    
    params: {
        keyword: ''
    },

    skillList: {},

    // id and oldSkillImgPublicId
    // is for edit skill only
    skillForm: {
        id: '',
        oldSkillImgPublicId: '',

        skillName: '',
        skillLevel: '',
        skillImage: null
    },
    
    createLoading: false,

    skillFormChangeChecker: {
        id: '',
        oldSkillImgPublicId: '',

        skillName: '',
        skillLevel: '',
        skillImage: null
    },

    formHasChanged: false,

    isEditSkill: false
}

export const actions = {
    async getSkillList ({state}, payload) {
        state.loading = true

        const { data } = await api('get', `/skill/get-skills${payload}`)

        state.skillList = data.list

        state.loading = false
    },

    async createSkill ({state, commit, dispatch}) {
        state.createLoading = true

        const form = new FormData()
        form.append('skillName', state.skillForm.skillName)
        form.append('skillLevel', state.skillForm.skillLevel)
        form.append('skillImg', state.skillForm.skillImage)

        const { status, data } = await api('post', `/skill/add-skills`, form)
        
        await commit('clearForm')

        await dispatch('modal/closeModal', {}, { root: true })

        if (status !== 200) {
            commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'error',
                modalTitle: 'Oooops!',
                modalDesc: 'Something went wrong!',
            }, { root: true })
            
            state.createLoading = false
            return
        }

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'You have successfully created a skill!',
        }, { root: true })

        state.skillList = data.list
        state.createLoading = false
    },

    async deleteSkill ({ state, commit }, { id, oldSkillImgPublicId }) {
        state.loading = true

        const form = new FormData()
        form.append('oldSkillImgPublicId', oldSkillImgPublicId)

        const { status, data } = await api('delete', `/skill/delete-skills/${id}`, { data: form })
        
        if (status !== 200) {
            commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'error',
                modalTitle: 'Oooops!',
                modalDesc: 'Something went wrong!',
            }, { root: true })

            state.loading = false
            return
        }

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'You have successfully deleted a skill!',
        }, { root: true })

        state.skillList = data.list
        state.loading = false
    },

    async editSkill ({ state, commit, dispatch } ) {
        state.createLoading = true

        const form = new FormData()
        const skillForm = state.skillForm

        form.append('skillName', skillForm.skillName)
        form.append('skillLevel', skillForm.skillLevel)
        form.append('skillImg', skillForm.skillImage)
        form.append('oldSkillImgPublicId', skillForm.oldSkillImgPublicId)

        const { status, data } = await api('patch', `/skill/edit-skills/${skillForm.id}`, form)
        
        await dispatch('modal/closeModal', {}, { root: true })

        if (status !== 200) {
            commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'error',
                modalTitle: 'Oooops!',
                modalDesc: 'Something went wrong!',
            }, { root: true })

            state.createLoading = false
            return
        }

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'You have successfully updated a skill!',
        }, { root: true })
        
        state.skillList = data.list
        state.createLoading = false
    }
}

export const mutations = {
    updateField,

    clearForm () {
        state.skillForm.id = ''
        state.skillForm.oldSkillImgPublicId = ''

        state.skillForm.skillName = ''
        state.skillForm.skillLevel = ''
        state.skillForm.skillImage = null
        state.formHasChanged = false

        state.isEditSkill = false
    },

    setFormChangesChecker () {
        state.skillFormChangeChecker = {
            ...state.skillForm
        }
    },

    checkFormChanges () {
        for (let item of Object.keys(state.skillForm)) {
            if (state.skillForm[item] !== state.skillFormChangeChecker[item]) {
                state.formHasChanged = true

                return
            }
        }

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
