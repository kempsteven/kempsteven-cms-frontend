<template>
    <div class="card-list">
        <div class="list-function">
            <button class="_primary" @click="$emit('create')">
                Create
            </button>
        </div>

        <input
            class="search"
            type="text"
            placeholder="Search List"
            @input="search($event.target.value)"
        >
        
        <div class="list-container">
            <div
                class="card"
                :key="key"
                v-for="(card, key) in list"
            >
                <div class="img-container">
                    <div class="btn-container">
                        <button class="edit" @click="$emit('edit', card)"/>

                        <button class="delete" @click="$emit('delete', card)"/>
                    </div>

                    <img class="card-img" :src="resolve(keyImg, card)">
                </div>

                <span class="card-title">
                    {{ card[keyName] }}
                </span>

                <p class="card-description" v-if="keyDescription">
                    {{ limitText(card[keyDescription]) }}
                </p>
            </div>

            <transition name="_transition-anim">
                <Loading v-if="loading"/>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        keyImg: {
            type: String,
            default: '',
            required: true
        },

        keyName: {
            type: String,
            default: '',
            required: true
        },

        keyDescription: {
            type: String,
            default: ''
        },

        list: {
            type: Array,
            default: () => []
        },

        loading: {
            type: Boolean,
            default: false
        },

        value: {
            type: String,
            default: ''
        },
    },

    methods: {
        search (searchText) {
            clearTimeout(this.timeout)

			this.timeout = setTimeout(() => {
                this.$emit('input', searchText)
			}, 500)
        },

        limitText (string) {
            return string.length > 70 ?
                        `${string.substring(0, 70)}...` : string
        },

        resolve (path, obj) {
            return path.split('.').reduce((prev, curr) => {
                return prev ? prev[curr] : null
            }, obj || self)
        }
    },

    components: {
        Loading: () => import('@/components/global/Loading.vue'),
    },
}
</script>

<style lang="scss" scoped>
.card-list {
    width: 100%;

    .list-function {
        @include flex-box(flex-end, center, '');
        margin-bottom: 15px;
    }

    .search {
        width: 100%;
        padding: 10px 15px;
        background: #293243;
        border: none;
        outline: none;
        color: #fff;
        border-radius: 3px;
        margin-bottom: 25px;
        box-shadow: 0px 0px 10px 3px #1B222C;
    }

    .list-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        position: relative;

        .card {
            border-radius: 3px;
            width: 19.2%;
            background: #293243;
            box-shadow: 0px 0px 10px 3px #1B222C;
            margin-bottom: 1%;
            overflow: hidden;

            &:not(:nth-child(5n + 5)) {
                margin-right: 1%;
            }

            span, p {
                color: #fff;
            }

            .img-container {
                width: 100%;
                padding-bottom: 65%;
                position: relative;
                overflow: hidden;
                // background: #1b212c;
                background: #f3f3f3;
                margin-bottom: 10px;

                .btn-container {
                    position: absolute;
                    z-index: 1;
                    top: 5px;
                    right: 5px;

                    button {
                        border: none;
                        width: 30px;
                        height: 30px;
                        background-repeat: no-repeat;
                        background-size: 17px 17px;
                        background-position: center;
                        border-radius: 50%;
                        outline: none;
                    }

                    .delete {
                        background-color: #eb573f;
                        background-image: url('~@/assets/img/icon/delete.png');
                    }

                    .edit {
                        background-color: #759bd8;
                        margin-right: 5px;
                        background-image: url('~@/assets/img/icon/edit.png');
                    }
                }

                .card-img {
                    top: 4%;
                    height: 92%;
                    transform: translateX(-50%);
                    left: 50%;
                    position: absolute;
                }
            }

            .card-title {
                text-align: left;
                font-weight: 600;
                display: block;
                width: 90%;
                margin: 0 auto 10px auto;
            }

            .card-description {
                padding-top: 10px;
                border-top: 1px solid #f1f1f1;
                text-align: left;
                margin: 0 auto;
                font-size: 14px;
                margin-bottom: 15px;
                width: 90%;
                color: #f1f1f1;
            }
        }
    }
}
</style>