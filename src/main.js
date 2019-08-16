import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './registerServiceWorker'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.filter('capitalize', (value) => {
	if (!value) return ''

	value = value.toString()
	
	return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
