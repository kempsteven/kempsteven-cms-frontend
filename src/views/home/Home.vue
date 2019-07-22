<template>
	<div class="home">
		<SideNavigation />

		<div class="main-section">
			<HeaderLayout />
			<router-view />
		</div>
	</div>
</template>

<script>

export default {
	name: 'home',
	components: {
		SideNavigation: () => import('@/components/global/SideNavigation.vue'),
		HeaderLayout: () => import('@/components/global/HeaderLayout.vue')
	}
}
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	height: 100%;
	background: #363636;
	display: flex;

	.main-section {
		@include flex-box('', '', column);
		width: 100%;
	}
}
</style>

