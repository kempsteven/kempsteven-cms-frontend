<template>
    <div class="skill-form-container">
        <h3 class="form-title">
            {{ isEditSkill ? 'Edit' : 'Create' }} Skill
        </h3>

        <InputField
            label="Skill Name"
            placeholder="Skill Name"
            maxlength="30"
            v-model="skillName"
        />

        <InputField
            label="Skill Level"
            type="number"
            placeholder="Skill Level (1-5)"
            maxlength="1"
            :regex="/[1-5]/g"
            v-model="skillLevel"
        />

        <InputField
            label="Skill Image"
            type="file"
            accept="image/*"
            inputType="file"
            v-model="skillImage"
        />

        <div class="btn-container">
            <button
                class="_secondary"
                :disabled="createLoading"
                @click="closeCreateSkill()"
            >
                Cancel
            </button>
            
            <button
                class="_primary"
                :disabled="createLoading"
                @click="isEditSkill ? editSkill() : createSkill()"
            >
                {{ createLoading ? 'Loading...' : isEditSkill ? 'Update Skill' : 'Create Skill' }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'

export default {
    computed: {
        ...mapFields('skill', [
            'skillForm.skillName',
            'skillForm.skillLevel',
            'skillForm.skillImage',
            'createLoading',
            'formHasChanged',
            'isEditSkill',
            'isFormComplete'
        ]),
    },

    mounted () {
        this.$store.commit('skill/setFormChangesChecker')
    },

    destroyed () {
        this.$store.commit('skill/clearForm')
    },

    methods: {
        async createSkill () {
            await this.$store.commit('skill/checkFormComplete')

            if (!this.isFormComplete) {
                this.$store.dispatch(
                    'modal/errorModal',
                    'Please fill up all fields!'
                )

                return
            }

            this.$store.dispatch('skill/createSkill')
        },

        async editSkill () {
            await this.$store.commit('skill/checkFormChanges')

            if (!this.formHasChanged) return

            await this.$store.commit('skill/checkFormComplete')

            if (!this.isFormComplete) {
                this.$store.dispatch(
                    'modal/errorModal',
                    'Please fill up all fields!'
                )

                return
            }

            this.$store.dispatch('skill/editSkill')
        },

        async closeCreateSkill () {
            await this.$store.commit('skill/checkFormChanges')

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
        }
    },

    components: {
        InputField: () => import('@/components/global/InputField.vue'),
    },
}
</script>

<style lang="scss" scoped>
.skill-form-container {
    width: 350px;
    padding: 10px;

    .form-title {
        text-align: left;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #fff;
    }

    .btn-container {
        @include flex-box(flex-end, center, '');
        margin-top: 35px;

        ._secondary {
            margin-right: 15px;
        }
    }
}
</style>