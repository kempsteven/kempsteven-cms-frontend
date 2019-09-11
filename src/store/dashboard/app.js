import { getField, updateField } from 'vuex-map-fields'
import api from '@/store/api'
import * as countryCode from './countryCode.js'

export const state = {
    loading: false,
    dashboardTimeSeries: {},
    dashboardTotals: {},

    activeDay: 30,

    dashboardCountryTraffic: []
}

export const actions = {
    async getDashboardData ({ commit }) {
        state.loading = true

        try {
            const { status, data } = await api('get', `/dashboard/getDashboardData?since=${state.activeDay}`)

            if (status !== 200) {
                commit('modal/toggleModal', {
                    modalName: 'alert-modal',
                    modalType: 'error',
                    modalTitle: 'Oooops!',
                    modalDesc: 'Something went wrong! Please try and refresh the page :(',
                }, { root: true })

                state.loading = false
                return
            }

            state.dashboardTimeSeries = data.result.timeseries

            const { uniques, requests, bandwidth } = data.result.totals

            state.dashboardTotals = {
                uniques: uniques.all,
                requests: requests.all,
                bandwidth: bandwidth.all,
            }

            state.dashboardCountryTraffic = Object.keys(requests.country).map(country => {
                return {
                    country: countryCode.default[country] || 'Unknown states, Other entities or Organizations',
                    traffic: requests.country[country]
                }
            }).sort((a, b) => b.traffic - a.traffic)
        }
        catch (err) {
            commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'error',
                modalTitle: 'Oooops!',
                modalDesc: 'Something went wrong! Please try and refresh the page :(',
            }, { root: true })
        }
        finally {
            state.loading = false
        }
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
