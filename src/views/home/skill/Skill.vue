<template>
    <div class="skill">
        <CardList
            keyImg="skillImg.url"
            keyName="skillName"
            keyDescription="skillLevel"
            :list="skillList"
            :loading="loading"
            v-model="params.keyword"

            @create="createSkill()"
            @delete="deleteSkill($event)"
            @edit="editSkill($event)"
        />

        <transition name="_transition-no-pos">
            <Modal
                v-if="modalName.includes('create-skill-modal')"
            >
                <SkillForm slot="content"/>
            </Modal>
        </transition>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import * as skill from '@/store/skill/app.js'
export default {
    beforeCreate () {
		if (!this.$store._modulesNamespaceMap['skill/']) {
			this.$store.registerModule('skill', skill.default)
		}
    },

    computed: {
		...mapFields(`skill`, [
			'loading',
            'params',
            'skillList',
            'formHasChanged',

            'skillForm.id',
            'skillForm.oldSkillImgPublicId',

            'skillForm.skillName',
            'skillForm.skillLevel',
            'skillForm.skillImage',
            'createLoading',
            'isEditSkill'
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

            this.getSkillList()
        },

        async getSkillList () {
            if (this.loading) return

            const fullPath = this.$route.fullPath
            const queryKeys = Object.keys(this.$route.query)
            let urlQuery = ''

            if (queryKeys.length > 0) {
                urlQuery = fullPath.replace('/skill', '')
            }

			await this.$store.dispatch('skill/getSkillList', urlQuery)
        },

        async closeModal () {
            if (this.createLoading) return

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
        },

        createSkill () {
            this.$store.commit('modal/toggleModal', {
                modalName: 'create-skill-modal'
            })
        },

        deleteSkill ({ skillImg, _id }) {
            this.$store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'warning',
                modalTitle: 'Warning',
                modalDesc: 'Are you sure you want to delete this skill?',
                storeAction: 'skill/deleteSkill',
                storePayload: {
                    id: _id,
                    oldSkillImgPublicId: skillImg.publicId,
                }
            })
        },

        async editSkill ({ _id, skillName, skillLevel, skillImg }) {
            this.id = _id
            this.skillName = skillName
            this.skillLevel = skillLevel
            this.oldSkillImgPublicId = skillImg.publicId
            this.isEditSkill = true
            // this.skillImage = skillImg.url

            // convert remote image to blob
            const res = await fetch(skillImg.url)
            const imgBlob = await res.blob()

            // creates a DOMString containing a URL
            //  representing the object given in the parameter
            this.skillImage = imgBlob

            this.$store.commit('modal/toggleModal', {
                modalName: 'create-skill-modal'
            })
        }
    },
    
    components: {
        CardList: () => import('@/components/global/CardList.vue'),
        Modal: () => import('@/components/global/Modal.vue'),
        SkillForm: () => import('@/components/skill/SkillForm.vue'),
    },
}
</script>

<style lang="scss" scoped>
.skill {
    width: 100%;
}
</style>