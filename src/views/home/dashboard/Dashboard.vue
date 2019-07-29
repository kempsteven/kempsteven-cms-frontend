<template>
	<div class="dashboard">
		<div class="dashboard-container">
			<DashboardCard
				value="227"
				name="Unique Visitors"
				:icon="require('@/assets/img/icon/visitor.png')"
			/>

			<DashboardCard
				value="2,153"
				name="Requests"
				:icon="require('@/assets/img/icon/request.png')"
			/>

			<DashboardCard
				value="10 MB"
				name="Bandwidth"
				:icon="require('@/assets/img/icon/bandwidth.png')"
			/>
		</div>

		<div class="chart-container">
			<apexchart type=area height="450" :options="chartOptions" :series="series"/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'home',
	data () {
		return {
			series: [
				{
					name: 'Unique Visitors',
					data: [31, 40, 28, 51, 42, 109, 100]
				}, 
				{
					name: 'Requests',
					data: [11, 32, 45, 32, 34, 52, 41]
				},
				{
					name: 'Bandwidth',
					data: [11, 35, 55, 12, 114, 55, 72]
				}
			],

			chartOptions: {
				dataLabels: {
					enabled: false,

					style: {
						colors: ['#fff']
					}
				},

				stroke: {
					curve: 'smooth'
				},

				chart: {
					toolbar: {
						show: true,
						tools: {
							download: false,
						},
					}
				},

				tooltip: {
					enabled: true,
					theme: true,
				},

				legend: {
					show: true,

					labels: {
						colors: '#fff',
						useSeriesColors: false
					},

					onItemClick: {
						toggleDataSeries: false
					},

					onItemHover: {
						highlightDataSeries: true
					},
				},

				xaxis: {
					labels: {
						style: {
							colors: '#fff',
						},
					}
				},

				yaxis: {
					labels: {
						style: {
							color: '#fff',
						},
					}
				}
			}
		}
	},

	components: {
		DashboardCard: () => import('@/components/dashboard/DashboardCard.vue')
	}
}
</script>

<style lang="scss" scoped>
.apexcharts-tooltip {
    background: #f3f3f3;
    color: orange;
}

.dashboard {
	width: 100%;
	margin: 0 auto;
	
	.dashboard-container {
		@include flex-box(space-between, '', '');
		width: 100%;
		margin-bottom: 50px;
	}

	.chart-container {
		width: 100%;
		background-color: #293243;
		box-shadow: 0px 0px 22px 3px #1B222C;
		padding: 25px 30px 5px 15px;
	}
}

</style>

