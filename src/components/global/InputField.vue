<template>
    <div class="input-field">
        <label class="input-title">
            {{ label }}
        </label>

        <input
            class="input-box"
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @keydown="checkValue($event)"
            v-if="inputType === ''"
        >

        <label
            class="input-file"
            for="input-file"
            ref="inputFileLabel"
            v-if="inputType === 'file'"
        >
            Click to Upload

            <input
                v-bind="$attrs"
                id="input-file"
                class="input-box"
                @input="inputImage($event)"
            >
        </label>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Input Label'
        },

        regex: {
            type: RegExp,
            default: null
        },
        
        inputType: {
            type: String,
            default: ''
        },

        value: {
            type: String | Number,
            default: ''
        }
    },

    watch: {
        value (val) {
            if (val === null && this.inputType === 'file') {
                this.$refs.inputFileLabel.style.backgroundImage = ``
                this.$refs.inputFileLabel.style.color = `#fff`
            }
        }
    },

    mounted () {
        this.setInputValue()
    },

    methods: {
        setInputValue () {
            if (this.inputType === 'file' && this.value) {
                const reader = new FileReader()

                reader.readAsDataURL(this.value)

                reader.onloadend = () => {
                    this.$refs.inputFileLabel.style.backgroundImage = `url(${ reader.result })`
                    this.$refs.inputFileLabel.style.color = `rgba(255, 255, 255, 0)`
                }
            }
        },

        checkValue (event) {
            const inputTag = event.target
            const isBackSpace = event.keyCode !== 8
            const isSelectAll = event.ctrlKey && event.keyCode === 65

            // handle limit
            if (`${inputTag.value}`.length >= inputTag.maxLength && isBackSpace && !isSelectAll) event.preventDefault()
            
            // handle regex
            if (this.regex !== null && isBackSpace) {
                if (`${event.key}`.match(/[1-5]/g) === null) event.preventDefault()
            } 
        },

        inputImage (inputEvent) {
            if (!this.isFileValid(inputEvent)) return

            const imageFile = inputEvent.target.files[0]
            const inputParent = inputEvent.target.parentElement
            const reader = new FileReader()

            reader.onloadend = () => {
                inputParent.style.backgroundImage = `url(${ reader.result })`
                inputParent.style.color = `rgba(255, 255, 255, 0)`
            }

            this.$emit('input', inputEvent.target.files[0])

            if (reader) reader.readAsDataURL(imageFile)
        },

        isFileValid (inputEvent) {
            const fileType = inputEvent.target.files[0].type.split('/')[0]
            const inputRequiredFileType = inputEvent.target.accept.split('/')[0]

            if (fileType !== inputRequiredFileType) {
                this.$store.commit('modal/toggleModal', {
                    modalName: 'alert-modal',
                    modalType: 'error',
                    modalTitle: 'Oooops!',
                    modalDesc: `
                        Please upload (a/an) ${inputRequiredFileType} file type!
                    `
                })

                return false
            }

            return true
        }
    },
}
</script>

<style lang="scss" scoped>
.input-field {
    &:not(:last-child) {
        margin-bottom: 15px;
    }

    .input-title {
        display: block;
        text-align: left;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
    }

    .input-box {
        padding: 8px 10px;
        width: 100%;
        border: 1px solid #fff;
        border-radius: 2px;

        &::placeholder {
            color: #c3c3c3;
        }
    }

    .input-file {
        position: relative;
        width: 100%;
        padding: 15px;
        border: 1px dashed #fff;
        display: block;
        height: 150px;
        font-size: 14px;
        cursor: pointer;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #1b212c;

        @include flex-box(center, center, '');

        .input-box {
            opacity: 0;
            position: absolute;
            pointer-events: none;
            left: 0;
            top: 0;
            width: 100%;
        }
    }
}
</style>