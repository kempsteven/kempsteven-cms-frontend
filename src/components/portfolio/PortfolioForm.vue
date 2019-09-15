<template>
    <div class="portfolio-form-container">
        <h3 class="form-title">
            {{ isEditPortfolio ? 'Edit' : 'Create' }} Portfolio
        </h3>

        <div class="portfolio-form">
            <InputField
                label="Portfolio Name"
                placeholder="Portfolio Name"
                maxlength="30"
                v-model="portfolioTitle"
            />

            <InputField
                label="Portfolio Description"
                placeholder="Portfolio Description"
                maxlength="320"
                inputType="textarea"
                v-model="portfolioDescription"
            />

            <InputField
                label="Portfolio URL"
                placeholder="Portfolio URL (Not Required)"
                maxlength="60"
                v-model="portfolioUrl"
            />

            <div class="technology-container">
                <h5 class="form-sub-title">
                    Portfolio Technologies
                </h5>

                <div
                    class="technology-item"
                    :key="key"
                    v-for="(technology, key) of portfolioTechnologies"
                >
                    <div
                        class="close"
                        @click="removeTechnology(key)"
                        v-if="portfolioTechnologies.length > 1"
                    >
                        &times;
                    </div>

                    <InputField
                        placeholder="Portfolio Technology"
                        maxlength="30"
                        v-model="portfolioTechnologies[key]"
                    />
                </div>
                

                <div class="btn-container">
                    <button
                        class="_primary"
                        @click="addTechnology()"
                    >
                        Add Technology
                    </button>
                </div>
            </div>

            <InputField
                label="Portfolio Desktop Image"
                type="file"
                accept="image/*"
                inputType="file"
                v-model="portfolioDesktopImg"
            />

            <InputField
                label="Portfolio Mobile Image"
                type="file"
                accept="image/*"
                inputType="file"
                v-model="portfolioMobileImg"
            />
        </div>

        <div class="btn-container">
            <button
                class="_secondary"
                :disabled="createLoading"
                @click="closeCreatePortfolio()"
            >
                Cancel
            </button>
            
            <button
                class="_primary"
                :disabled="createLoading"
                @click="isEditPortfolio ? editPortfolio() : createPortfolio()"
            >
                {{ createLoading ? 'Loading...' : isEditPortfolio ? 'Update Portfolio' : 'Create Portfolio' }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    computed: {
        ...mapFields('portfolio', [
            'portfolioForm.portfolioTitle',
            'portfolioForm.portfolioDescription',
            'portfolioForm.portfolioUrl',
            'portfolioForm.portfolioTechnologies',
            'portfolioForm.portfolioDesktopImg',
            'portfolioForm.portfolioMobileImg',

            'createLoading',
            'isEditPortfolio',
            'isFormComplete',
            'formHasChanged'
        ]),
    },

    mounted () {
        this.$store.commit('portfolio/setFormChangesChecker')
    },

    destroyed () {
        this.$store.commit('portfolio/clearForm')
    },

    methods: {
        async createPortfolio () {
            await this.$store.commit('portfolio/checkFormComplete')

            if (!this.isFormComplete) {
                this.$store.dispatch(
                    'modal/errorModal',
                    'Please fill up all fields!'
                )

                return
            }

            this.$store.dispatch('portfolio/createPortfolio')
        },

        async editPortfolio () {
            await this.$store.commit('portfolio/checkFormChanges')
            
            if (!this.formHasChanged) return

            await this.$store.commit('portfolio/checkFormComplete')

            if (!this.isFormComplete) {
                this.$store.dispatch(
                    'modal/errorModal',
                    'Please fill up all fields!'
                )

                return
            }

            this.$store.dispatch('portfolio/editPortfolio')
        },

        async closeCreatePortfolio () {
            await this.$store.commit('portfolio/checkFormChanges')

            if (!this.formHasChanged) {
                this.$store.dispatch('modal/closeModal')

                return
            }

            this.$store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'warning',
                modalTitle: 'Warning',
                modalDesc: 'Are you sure you want to close this form?',
                storeAction: 'modal/closeModal',
            })
        },

        addTechnology () {
            this.portfolioTechnologies.push('')
        },

        removeTechnology (key) {
            this.portfolioTechnologies.splice(key, 1)
        }
    },

    components: {
        InputField: () => import('@/components/global/InputField.vue'),
    },
}
</script>

<style lang="scss" scoped>
.portfolio-form-container {
    width: 500px;
    padding: 10px;

    .form-title {
        text-align: left;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #fff;
    }

    .portfolio-form {
        height: 585px;
        overflow: auto;
        padding: 0 10px;

        .technology-container {
            width: 100%;

            .form-sub-title {
                text-align: left;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid #fff;
                font-size: 14px;
            }

            .technology-item {
                position: relative;
                
                &:not(:last-child) {
                    margin-bottom: 15px;
                }

                .close {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    width: 22px;
                    height: 22px;
                    padding: 0 0 2px 0px;
                    font-weight: 600;
                    cursor: pointer;
                    background: #eb573f;
                    color: #fff;
                    border-radius: 50%;
                    transition: 0.3s;
                    z-index: 1;

                    @include flex-box(center, center, '');

                    &:hover {
                        background: darken(#eb573f, 5%);
                    }
                }
            }
        }
    }

    .btn-container {
        @include flex-box(flex-end, center, '');
        margin-top: 25px;

        ._secondary {
            margin-right: 15px;
        }
    }
}
</style>