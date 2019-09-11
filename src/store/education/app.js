import { getField, updateField } from 'vuex-map-fields'
import api from '@/store/api'

export const state = {
    loading: false,
    formHasChanged: false,
    enableEdit: false,
    updateLoading: false,
    isFormComplete: false,

    education: {
        id: '',
        education: [],
        awards: []
    },

    educationChangesChecker: {
        education: [],
        awards: []
    },
}

export const actions = {
    async getEducation ({ state, commit }) {
        state.loading = true

        const { status, data } = await api('get', `/education/get-education`)

        if (status !== 200) {
            commit('modal/errorModal', { root: true })
            state.loading = false

            return
        }
        
        const id = data.data[0]._id
        const education = data.data[0].education.split(',')
        const awards = data.data[0].awards.split(',')

        state.education.id = id
        state.education.education = education
        state.education.awards = awards
        
        await commit('setFormChangesChecker', { education, awards })
        state.loading = false
    },

    async editEducation ({ state, commit }) {
        state.loading = true

        const form = new FormData()
        form.append('education', state.education.education.join(','))
        form.append('awards', state.education.awards.join(','))
        
        const { status, data } = await api('patch', `/education/edit-education/${state.education.id}`, form)
        
        if (status !== 200) {
            commit('modal/errorModal', { root: true })
            state.loading = false

            return
        }

        const id = data.data[0]._id
        const education = data.data[0].education.split(',')
        const awards = data.data[0].awards.split(',')

        state.education.id = id
        state.education.education = education
        state.education.awards = awards

        await commit('setFormChangesChecker')

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'You have successfully updated an education!',
        }, { root: true })

        state.loading = false
    }
}

export const mutations = {
    updateField,

    setFormChangesChecker() {
        state.educationChangesChecker = {
            education: [...state.education.education],
            awards: [...state.education.awards]
        }
    },

    checkFormChanges () {
        const { education: checkerEducation, awards: checkerAwards } = state.educationChangesChecker
        const { education, awards } = state.education

        if (
            checkerEducation.join(',') !== education.join(',') ||
            checkerAwards.join(',') !== awards.join(',')
        ) {
            state.formHasChanged = true

            return
        }

        state.formHasChanged = false
    },

    checkFormComplete () {
        const { education, awards } = state.education

        for (let educ of education) {
            if (educ === '') {
                state.isFormComplete = false

                return
            }
        }

        for (let award of awards) {
            if (award === '') {
                state.isFormComplete = false

                return
            }
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
