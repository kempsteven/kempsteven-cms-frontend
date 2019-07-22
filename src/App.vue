<template>
	<main id="app">
		<transition name="_transition-anim">
			<router-view/>
		</transition>

		<transition name="_transition-anim">
			<Alerts v-if="modalName === 'alert-modal'"/>
		</transition>
	</main>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
export default {
	computed: {
		...mapFields('modal',[
            'modalName',
        ]),
	},
	components: {
		Alerts: () => import('@/components/global/Alerts.vue')
	},
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 100%;
	height: 100%;
}
</style>
