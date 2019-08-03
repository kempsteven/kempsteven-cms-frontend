<template>
    <div class="card-list">
        <input
            class="search"
            type="text"
            placeholder="Search List"
            @input="search($event.target.value)"
        >

        <div class="list-container">
            <div class="card" key="key" v-for="(card, key) in 10">
                <div class="img-container">
                    <img class="card-img" src="@/assets/img/icon/css.png">
                </div>

                <span class="card-title">
                    CSS
                </span>

                <p class="card-description">
                    {{
                        limitText(`Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Dignissimos rem similique
                        saepe corporis ab, numquam vitae dicta dolorem
                        architecto fugiat.`)
                    }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        search (searchText) {
            clearTimeout(this.timeout)

			this.timeout = setTimeout(() => {
                console.log(searchText)
			}, 500)
        },

        limitText (string) {
            return string.length > 70 ?
                        `${string.substring(0, 70)}...` : string
        } 
    },
}
</script>

<style lang="scss" scoped>
.card-list {
    width: 100%;

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

        .card {
            border-radius: 3px;
            width: 19.2%;
            background: #293243;
            box-shadow: 0px 0px 10px 3px #1B222C;
            margin-bottom: 1%;

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
                background: #1b212c;
                margin-bottom: 10px;

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