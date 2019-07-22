import { getField, updateField } from 'vuex-map-fields'

export const state = {
    modalName: '',
    modalType: '',
    modalTitle: '',
    modalDesc: ''
}

export const actions = {
}

export const mutations = {
    updateField,

    toggleModal (state, { modalName, modalType, modalTitle, modalDesc }) {
        state.modalName = modalName,
        state.modalType = modalType,
        state.modalTitle = modalTitle,
        state.modalDesc = modalDesc
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
