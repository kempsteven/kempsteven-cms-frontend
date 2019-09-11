<template>
	<div class="dashboard">
		<div class="dashboard-days">
			<span
				class="day"
				:class="{ 'active' : activeDay === 1, 'loading' : loading }"
				@click="changeFilter(1)"
			>
				1 Day
			</span>

			<span
				class="day"
				:class="{ 'active' : activeDay === 7, 'loading' : loading }"
				@click="changeFilter(7)"
			>
				7 Day
			</span>

			<span
				class="day"
				:class="{ 'active' : activeDay === 30, 'loading' : loading }"
				@click="changeFilter(30)"
			>
				30 Day
			</span>

			<span
				class="day"
				:class="{ 'active' : activeDay === 180, 'loading' : loading }"
				@click="changeFilter(180)"
			>
				6 Months
			</span>

			<span
				class="day"
				:class="{ 'active' : activeDay === 360, 'loading' : loading }"
				@click="changeFilter(360)"
			>
				1 Year
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
			<transition name="_transition-anim">
				<Loading v-if="loading"/>
			</transition>

			<apexchart type=area height="450" :options="chartOptions" :series="series"/>
		</div>

		<DashboardTraffic />
	</div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import * as dashboard from '@/store/dashboard/app.js'
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
					x: {
						show: true,
						format: 'MMM dd, yyyy HH:mm'
					},
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
			'dashboardCountryTraffic',
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
			this.$store.registerModule('dashboard', dashboard.default)
		}
	},

	destroyed () {
		this.activeDay = 30
	},

	methods: {
		async getDashboardData () {
			if (this.loading) return

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
					y: (data.bandwidth.all * 0.000001).toFixed(0)
				})
			})
		},

		setBandwidth (bandwidth) {
			if (!bandwidth) return

			return `${(bandwidth * 0.000001).toFixed(0)} MB`
		},

		changeFilter (day) {
			if (this.loading) return

			this.activeDay = day
		}
	},

	components: {
		DashboardCard: () => import('@/components/dashboard/DashboardCard.vue'),
		DashboardTraffic: () => import('@/components/dashboard/DashboardTraffic.vue'),
		Loading: () => import('@/components/global/Loading.vue'),
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

			&.loading {
				opacity: 0.2;
				pointer-events: none;
			}
			
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
		margin-bottom: 30px;
	}

	.chart-container {
		width: 100%;
		background-color: #293243;
		box-shadow: 0px 0px 22px 3px #1B222C;
		padding: 25px 30px 5px 15px;
		position: relative;
		// overflow: hidden;
	}
}

</style>

