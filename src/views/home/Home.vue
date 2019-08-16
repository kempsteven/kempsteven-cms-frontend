<template>
	<div class="home">
		<SideNavigation />

		<div class="main-section">
			<HeaderLayout />
			
			<div class="route-container">
				<transition name="_transition-anim">
					<router-view class="router-container"/>
				</transition>
			</div>
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
		height: 100%;
		overflow: auto;

		.route-container {
			position: relative;
			margin: 30px auto 0 auto;
			width: 80%;

			.router-container {
				padding: 0 25px;
				width: 100%;
			}
		}
	}
}
</style>

