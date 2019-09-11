<template>
    <div class="dashboard-traffic">
        <table class="table-container" v-if="dashboardCountryTraffic.length">
            <thead class="table-header">
                <th>
                    Country
                </th>

                <th>
                    Traffic
                </th>
            </thead>

            <tbody class="table-body">
                <tr
                    class="table-row"
                    :key="key"
                    v-for="(traffic, key) in dashboardCountryTraffic"
                >
                    <td>
                        {{ traffic.country }}
                    </td>

                    <td>
                        {{ traffic.traffic }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    computed: {
		...mapFields(`dashboard`, [
			'dashboardCountryTraffic',
		]),
	},
}
</script>

<style lang="scss" scoped>
.dashboard-traffic {
    width: 100%;
    background-color: #293243;
    box-shadow: 0px 0px 22px 3px #1B222C;
    margin: 25px 0;

    .table-container {
        width: 100%;
        text-align: left;
        color: #fff;
        border-collapse: collapse;
        table-layout: fixed;

        th, td {
            padding: 15px;
        }

        th {
            background-color:  #1B222C;
        }

        .table-header {
            th {
                font-size: 18px;
            }
        }

        .table-body {
            tr {
                background-color: #293243;

                &:nth-child(even) {
                    background-color: #232a38;
                }
            }
        }
    }
}
</style>