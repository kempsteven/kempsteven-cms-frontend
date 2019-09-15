import axios from 'axios'
import store from './'

axios.defaults.baseURL = 'https://kempsteven-cms-backend.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(request => {
    const token = store.getters['authentication/getField']('token')

    if (token) {
        request.headers.common['Authorization'] = `Bearer ` + token
    }

    return request
})

export default async (method, url, payload) => {
    try {
        return await axios[method](url, payload)
    } catch (error) {
        return {
            status: 500,
            message: error
        }
    }
}