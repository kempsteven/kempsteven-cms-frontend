<template>
    <div class="modal-bg" @click.self="close()">
        <section
            name="content"
            class="modal-wrapper"
            :class="{
                'error' : modalType === 'error',
                'success' : modalType === 'success'
            }"
        >
            <div class="icon"/>

            <h2 class="modal-header">
                {{ modalTitle }}
            </h2>

            <div class="modal-desc">
                {{ modalDesc }}
            </div>

            <div class="btn-container">
                <button class="cancel" v-if="modalType === 'warning'" @click="closeModal()">
                    Cancel
                </button>

                <button class="confirm" @click="closeModal()">
                    Confirm
                </button>
            </div>
        </section>
    </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
export default {
    computed: {
        ...mapFields('modal',[
            'modalType',
            'modalTitle',
            'modalDesc',
        ]),
    },
    methods: {
        close () {
            this.$emit('closeModal')
        },

        closeModal () {
            this.$store.commit('modal/toggleModal', {
                modalName: '',
                modalType: '',
                modalTitle: '',
                modalDesc: '',
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.4);
    top: 0;
    left: 0;
    z-index: 1000;
    @include flex-box(center, center, '');

    .modal-wrapper {
		width: 300px;
        padding: 25px 15px;
        border-radius: 5px;

        &.confirm {
            background-color: #5dd47b;
            color: #fff;

            .icon {
                &::before {
                    content: '\2713';
                    color: #5dd47b;
                }
            }

            .btn-container {
                button {
                    &.confirm {
                        color: #5dd47b;
                    }
                }
            }
        }

        &.error, &.warning {
            background-color: #eb573f;
            color: #fff;

            .icon {
                &::before {
                    content: '\2715';
                    color: #eb573f;
                }
            }

            .btn-container {
                button {
                    &.confirm {
                        color: #eb573f;
                    }
                }
            }
        }

        .icon {
            width: 100%;
            height: 100px;
            position: relative;
            margin-bottom: 25px;

            &::before {
                position: absolute;
                right: 0;
                left: 0;
                margin: 0 auto;

                width: 80px;
                height: 80px;
                padding: 10px 11px 12px 10px;

                font-weight: 800;
                font-size: 70px;

                border: 5px solid #fff;
                border-radius: 50%;

                background: #fff;
                @include flex-box(center, center, '');
            }
        }
		
		.modal-header {
			margin: 0 0 30px 0;
			font-size: 26px;
		}

		.modal-desc {
            padding: 0 15px;
			font-size: 18px;
			// border: 1px solid #dba6af;
            border-radius: 5px;
            margin-bottom: 35px;
        }
        
        .btn-container {
            width: 95%;
            margin: 0 auto;

            @include flex-box(space-between, center, '');

            button {
                border: none;
                padding: 10px 15px;
                border-radius: 2px;
                flex: 1 1 105px;
                transition: 0.3s;
                outline: none;

                &:nth-child(2) {
                    margin-left: 10px;
                }

                &.cancel {
                    border: 2px solid #fff;
                    background: transparent;
                    color: #fff;
                    font-size: 18px;
                    box-shadow: none;

                    &:hover {
                        box-shadow: 0px 0px 15px 5px rgba(255,255,255,0.24);
                    }
                }

                &.confirm {
                    border: 2px solid #fff;
                    background: #fff;
                    font-size: 18px;
                    box-shadow: none;

                    &:hover {
                        box-shadow: 0px 0px 15px 5px rgba(255,255,255,0.24);
                    }
                }
            }
        }
	}
}
</style>