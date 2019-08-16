import { getField, updateField } from 'vuex-map-fields'

export const state = {
    modalName: [],
    modalType: '',
    modalTitle: '',
    modalDesc: '',
    storeAction: '',
    storePayload: ''
}

export const actions = {
    closeModal ({ commit }) {
        commit('toggleModal', {
            modalName: '',
            modalType: '',
            modalTitle: '',
            modalDesc: '',
            storeAction: '',
            storePayload: ''
        })
    }
}

export const mutations = {
    updateField,

    toggleModal (state, { modalName, modalType, modalTitle, modalDesc, storeAction, storePayload }) {
        if (modalName !== '') state.modalName.push(modalName)
        else state.modalName.pop()

        state.modalType = modalType
        state.modalTitle = modalTitle
        state.modalDesc = modalDesc
        state.storeAction = storeAction
        state.storePayload = storePayload
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
