<template>
	<div class="dashboard">
		<div class="dashboard-container">
        	<DashboardCard />

			<DashboardCard />

			<DashboardCard />
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',

	components: {
		DashboardCard: () => import('@/components/dashboard/DashboardCard.vue')
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	width: 100%;
	
	.dashboard-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
}

</style>

