<template>
    <div class="input-field">
        <label class="input-title" v-if="label">
            {{ label }}
        </label>

        <!-- For Normal Input Field -->
        <input
            class="input-box"
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @keydown="checkValue($event)"
            v-if="inputType === ''"
        >

        <!-- For Text Field Input Type -->
        <textarea
            class="input-textarea"
            v-bind="$attrs"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @keydown="checkValue($event)"
            v-if="inputType === 'textarea'"
        />

         <!-- For File Input Type -->
        <div class="close" @click.self="removeFile()" v-if="inputType === 'file'">
            &times;
        </div>

        <label
            class="input-file"
            :for="uniqueId"
            ref="inputFileLabel"
            v-if="inputType === 'file'"
        >
            Click to Upload

            <input
                v-bind="$attrs"
                :id="uniqueId"
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
            default: ''
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
            default: ''
        }
    },

    data() {
        return {
            uniqueId: 0
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

    created () {
        this.generateUniqueId()
    },

    // mounted () {
    //     this.setInputValue()
    // },

    watch: {
        value: {
            handler: 'setInputValue',
            immediate: true
        }
    },

    methods: {
        generateUniqueId () {
            this.uniqueId = Math.random().toString(36).substr(2, 9)
        },

        setInputValue () {
            if (this.inputType === 'file' && this.value) {
                const reader = new FileReader()

                reader.readAsDataURL(this.value)

                reader.onloadend = () => {
                    if (!this.$refs.inputFileLabel) return

                    this.$refs.inputFileLabel.style.backgroundImage = `url(${ reader.result })`
                    this.$refs.inputFileLabel.style.color = `rgba(255, 255, 255, 0)`
                }
            } else {
                if (!this.$refs.inputFileLabel) return

                this.$refs.inputFileLabel.style.backgroundImage = ``
                
                this.$refs.inputFileLabel.style.color = `#fff`
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
        },

        removeFile () {
            this.$emit('input', '')
        }
    },
}
</script>

<style lang="scss" scoped>
.input-field {
    position: relative;
    
    &:not(:last-child) {
        margin-bottom: 15px;
    }

    .close {
        position: absolute;
        top: 15px;
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

    .input-title {
        display: block;
        text-align: left;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        height: 17px;
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

    .input-textarea {
        padding: 8px 10px;
        width: 100%;
        border: 1px solid #fff;
        border-radius: 2px;
        resize: none;
        height: 120px;

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