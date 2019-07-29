<template>
	<div class="home">
		<SideNavigation />

		<div class="main-section">
			<HeaderLayout />

			<router-view class="router-container"/>
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
	background: #232B38;
	display: flex;

	.main-section {
		@include flex-box('', '', column);
		width: calc(100% - 230px);

		.router-container {
			padding: 0 25px;
			width: 80%;
			margin: 15px auto 0 auto;
		}
	}
}
</style>

