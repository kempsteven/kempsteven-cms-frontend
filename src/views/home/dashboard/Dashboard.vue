<template>
	<div class="dashboard">
		<div class="dashboard-days">
			<span
				class="day"
				:class="{ 'active' : activeDay === 1 }"
				@click="activeDay = 1"
			>
				1 Day
			</span>

			<span
				class="day"
				:class="{ 'active' : activeDay === 7 }"
				@click="activeDay = 7"
			>
				7 Day
			</span>

			<span
				class="day"
				:class="{ 'active' : activeDay === 30 }"
				@click="activeDay = 30"
			>
				30 Day
			</span>
		</div>

		<div class="card-container">
			<DashboardCard
				:value="dashboardTotals.uniques"
				name="Unique Visitors"
				:icon="require('@/assets/img/icon/visitor.png')"
			/>

			<DashboardCard
				:value="dashboardTotals.requests"
				name="Requests"
				:icon="require('@/assets/img/icon/request.png')"
			/>

			<DashboardCard
				:value="setBandwidth(dashboardTotals.bandwidth)"
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
import { mapFields } from 'vuex-map-fields'
import * as dashboardModel from '@/store/dashboard/model.js'
export default {
	data () {
		return {
			series: [
				{
					name: 'Unique Visitors',
					data: []
				}, 
				{
					name: 'Requests',
					data: []
				},
				{
					name: 'Bandwidth',
					data: []
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
					},

					type: 'datetime'
				},

				yaxis: {
					labels: {
						style: {
							color: '#fff',
						},

						formatter: (value) => {
							return value
						},
					},

					type: 'text'
				}
			}
		}
	},

	computed: {
		...mapFields(`dashboard`, [
			'loading',
			'dashboardTotals',
			'dashboardTimeSeries',
			'activeDay'
		]),
	},

	watch: {
		activeDay: {
			handler: 'getDashboardData',
			immediate: true
		}
	},
	
	beforeCreate () {
		if (!this.$store._modulesNamespaceMap['dashboard/']) {
			this.$store.registerModule('dashboard', dashboardModel.default)
		}
	},

	methods: {
		async getDashboardData () {
			await this.$store.dispatch('dashboard/getDashboardData')

			this.setDashboardTimeSeries()
		},

		setDashboardTimeSeries () {
			this.series[0].data = []
			this.series[1].data = []
			this.series[2].data = []

			this.dashboardTimeSeries.forEach(data => {
				this.series[0].data.push({
					x: new Date(data.until.replace(/-/g, '-')),
					y: `${data.uniques.all}`
				})

				this.series[1].data.push({
					x: new Date(data.until.replace(/-/g, '-')),
					y: `${data.requests.all}`
				})

				this.series[2].data.push({
					x: new Date(data.until.replace(/-/g, '-')),
					y: this.setBandwidth(data.bandwidth.all)
				})
			})
		},

		setBandwidth (bandwidth) {
			if (!bandwidth) return

			return `${(bandwidth * 0.000001).toFixed(2)} MB`
		}
	},

	components: {
		DashboardCard: () => import('@/components/dashboard/DashboardCard.vue')
	}
}
</script>

<style lang="scss" scoped>
.dashboard {
	width: 100%;
	margin: 0 auto;

	.dashboard-days {
		display: flex;
		margin-bottom: 15px;
		
		.day {
			color: #fff;
			cursor: pointer;
			background-color: #293243;
			border: 1px solid #293243;
			padding: 10px;
			border-radius: 3px;
			transition: 0.3s;
			opacity: 0.6;
			
			&.active, &:hover {
				border: 1px solid #4e4f52;
				opacity: 1;
			}

			&:not(:last-child) {
				margin-right: 15px;
			}
		}
	}
	
	.card-container {
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

