<template>
    <div class="portfolio">
        <CardList
            keyImg="portfolioDesktopImg.url"
            keyName="portfolioTitle"
            keyDescription="portfolioDescription"
            :list="portfolioList"
            :loading="loading"
            v-model="params.keyword"

            @create="createPortfolio()"
            @delete="deletePortfolio($event)"
            @edit="editSkill($event)"
        />

        <transition name="_transition-no-pos">
            <Modal class="create-portfolio" v-if="modalName.includes('create-portfolio-modal')">
                <PortfolioForm slot="content"/>
            </Modal>
        </transition>
    </div>
</template>

<script>
import * as portfolio from '@/store/portfolio/app.js'
import { mapFields } from 'vuex-map-fields'
export default {
    beforeCreate () {
		if (!this.$store._modulesNamespaceMap['portfolio/']) {
			this.$store.registerModule('portfolio', portfolio.default)
		}
    },

    computed: {
		...mapFields(`portfolio`, [
			'loading',
            'params',
            'portfolioList'
        ]),

        ...mapFields('modal',[
            'modalName',
        ]),
    },

    watch: {
		params: {
			handler: 'checkParams',
            immediate: true,
            deep: true
		}
    },

    methods: {
        checkParams () {
            const { keyword } = this.params

            const queryObj = {}

            if (keyword) queryObj.keyword = keyword

            this.$router.push({ query: queryObj })

            this.getPortfolioList()
        },

        async getPortfolioList () {
            if (this.loading) return

            const fullPath = this.$route.fullPath
            const queryKeys = Object.keys(this.$route.query)
            let urlQuery = ''

            if (queryKeys.length > 0) {
                urlQuery = fullPath.replace('/portfolio', '')
            }

			await this.$store.dispatch('portfolio/getPortfolioList', urlQuery)
        },

        createPortfolio () {
            this.$store.commit('modal/toggleModal', {
                modalName: 'create-portfolio-modal'
            })
        },

        deletePortfolio ({ _id, portfolioDesktopImg, portfolioMobileImg }) {
            this.$store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'warning',
                modalTitle: 'Warning',
                modalDesc: 'Are you sure you want to delete this portfolio?',
                storeAction: 'portfolio/deletePortfolio',
                storePayload: {
                    id: _id,
                    oldPortfolioDesktopImgPublicId: portfolioDesktopImg.publicId,
                    oldPortfolioMobileImgPublicId: portfolioMobileImg.publicId,
                }
            })
        }
    },

    components: {
        CardList: () => import('@/components/global/CardList.vue'),
        Modal: () => import('@/components/global/Modal.vue'),
        PortfolioForm: () => import('@/components/portfolio/PortfolioForm.vue'),
    },
}
</script>

<style lang="scss" scoped>
.portfolio {
    width: 100%;

    .create-portfolio {
        /deep/ .modal-container {
            padding: 15px 10px;
        }
    }
}
</style>