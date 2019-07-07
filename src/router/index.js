import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
})

const guestMiddleware = (next, token, isLoggedIn) => {
    if (token && isLoggedIn) {
        next({ name: 'dashboard' })
    } else {
        next()
    }
}

const authMiddleware = (next, token, isLoggedIn) => {
    if (token && isLoggedIn) {
        next()
    } else {
        next({ name: 'login' })
    }
}

// middleware to check if user is authenticated
router.beforeEach(async (to, from, next) => {
    let token = store.getters['authentication/getField']('token')
    let isLoggedIn = store.getters['authentication/getField']('isLoggedIn')
    
    if (token && !isLoggedIn) {
        await store.dispatch('authentication/checkToken')
        isLoggedIn = store.getters['authentication/getField']('isLoggedIn')
    }
    
    let routeName = to.name
    let routeToGoMiddlewareType = ''

    // checking of middleware type
    for (let route of routes) {
        if (route.children) {
            let routeChildName = route.children.map(item => item.name)

            // if a childroute is an indexof the route you're
            // going to get that route's middleware
            // else just get check if the route name is equal
            // to the route you're going
            if (routeChildName.indexOf(routeName) > - 1) {
                routeToGoMiddlewareType = route.middleware
                break
            } else if (route.name === routeName) {
                routeToGoMiddlewareType = route.middleware
                break
            }

            return
        } else {
            if (route.name === routeName) {
                routeToGoMiddlewareType = route.middleware
                break
            }
        }
    }

    //middleware for guest middleware type
    if (routeToGoMiddlewareType === 'guest') {
        guestMiddleware(next, token, isLoggedIn)
    }

    //middleware for auth middleware type
    if (routeToGoMiddlewareType === 'auth') {
        authMiddleware(next, token, isLoggedIn)
    }
})

export default router