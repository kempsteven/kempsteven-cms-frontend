<template>
    <div class="education">
        <div class="education-form">
            <transition name="_transition-anim">
                <Loading width="750px" key="0" v-if="loading"/>

                <section class="education-wrapper" key="1" v-else>
                    <div class="edit-container">
                        <button
                            class="_primary"
                            @click="toggleEdit()"
                        >
                            {{ enableEdit ? 'Save Changes' : 'Edit Education' }}
                        </button>
                    </div>

                    <section class="education-container">
                        <h3 class="form-title">
                            Education
                        </h3>

                        <div
                            class="item"
                            :key="key"
                            v-for="(educ, key) in education"
                        >
                            <div
                                class="close"
                                @click="removeEducation(key)"
                                v-if="education.length > 1 && enableEdit"
                            >
                                &times;
                            </div>

                            <InputField
                                placeholder="Education"
                                maxlength="50"
                                :readonly="!enableEdit"
                                v-model="education[key]"
                            />
                        </div>

                        <div class="btn-container" v-if="enableEdit">
                            <button
                                class="_primary"
                                @click="addEducation()"
                            >
                                Add Education
                            </button>
                        </div>
                    </section>

                    <section class="awards-container">
                        <h3 class="form-title">
                            Awards
                        </h3>

                        <div
                            class="item"
                            :key="key"
                            v-for="(award, key) in awards"
                        >
                            <div
                                class="close"
                                @click="removeAward(key)"
                                v-if="awards.length > 1 && enableEdit"
                            >
                                &times;
                            </div>

                            <InputField
                                placeholder="Award"
                                maxlength="50"
                                :readonly="!enableEdit"
                                v-model="awards[key]"
                            />
                        </div>

                        <div class="btn-container" v-if="enableEdit">
                            <button
                                class="_primary"
                                @click="addAward()"
                            >
                                Add Award
                            </button>
                        </div>
                    </section>
                </section>
            </transition>
        </div>
    </div>
</template>

<script>
import * as education from '@/store/education/app.js'
import { mapFields } from 'vuex-map-fields'
export default {
    beforeCreate () {
		if (!this.$store._modulesNamespaceMap['education/']) {
			this.$store.registerModule('education', education.default)
		}
    },

    async created () {
        await this.getEducation()
    },

    computed: {
		...mapFields(`education`, [
            'education.education',
            'education.awards',
            'loading',
            'formHasChanged',
            'enableEdit',
            'isFormComplete',
            'educationChangesChecker'
        ]),
    },

    methods: {
        getEducation () {
            this.$store.dispatch('education/getEducation')
        },

        async updateEducation () {
            await this.$store.commit('education/checkFormComplete')

            if (!this.isFormComplete) {
                this.$store.dispatch(
                    'modal/errorModal',
                    'Please fill up all fields!'
                )

                return
            }

            this.$store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'warning',
                modalTitle: 'Confirm',
                modalDesc: 'Are you sure about this new updates?',
                storeAction: 'education/editEducation',
            })
        },

        
        async toggleEdit () {
            await this.$store.commit('education/checkFormChanges')

            if (!this.formHasChanged) {
                this.enableEdit = !this.enableEdit

                return
            }

            this.updateEducation()
        },

        /* Form Add Remove Handlers */
        addEducation () {
            this.education.push('')
        },

        removeEducation (key) {
            this.education.splice(key, 1)
        },

        addAward () {
            this.awards.push('')
        },

        removeAward (key) {
            this.awards.splice(key, 1)
        },
    },

    components: {
        InputField: () => import('@/components/global/InputField.vue'),
        Loading: () => import('@/components/global/Loading.vue'),
    },
}
</script>

<style lang="scss" scoped>
.education {
    @include flex-box(center, center, '');

    .education-form {
        width: 750px;
        position: relative;

        .education-wrapper {
            background-color: #293243;
            padding: 20px;
            -webkit-box-shadow: 0 0 3px #00000029;
            box-shadow: 0 0 3px #00000029;
            border-radius: 2px;
            color: #fff;
            width: 100%;

            .edit-container {
                @include flex-box(flex-end, center, '');
            }

            .form-title {
                margin-bottom: 15px;
                text-align: left;
            }

            .item {
                position: relative;
                margin-bottom: 25px;

                .close {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    width: 22px;
                    height: 22px;
                    padding: 0 0 2px 1px;
                    font-weight: 600;
                    cursor: pointer;
                    background: #eb573f;
                    color: #fff;
                    border-radius: 50%;
                    transition: 0.3s;

                    @include flex-box(center, center, '');

                    &:hover {
                        background: darken(#eb573f, 5%);
                    }
                }
            }

            .btn-container {
                @include flex-box(flex-end, center, '');
                margin-top: 25px;
            }

            .save-container {
                @include flex-box(center, center, '');
                margin-top: 25px;
            }
        }
    }
}
</style>