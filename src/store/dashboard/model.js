import { getField, updateField } from 'vuex-map-fields'
import api from '@/store/api'

export const state = {
    loading: false,
    dashboardTimeSeries: {},
    dashboardTotals: {},

    activeDay: 30
}

export const actions = {
    async getDashboardData () {
        state.loading = true

        const { data } = await api('get', `/dashboard/getDashboardData?since=${ state.activeDay }`)

        state.dashboardTimeSeries = data.result.timeseries

        const { uniques, requests, bandwidth } = data.result.totals
        
        state.dashboardTotals = {
            uniques: uniques.all,
            requests: requests.all,
            bandwidth: bandwidth.all,
        }

        state.loading = false
    }
}

export const mutations = {
    updateField
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
