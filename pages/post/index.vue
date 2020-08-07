<template>
  <div class="center-items w-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="postData"
    >
      <h1 class="text-white font-light mb-6">
        New Post:
      </h1>
      <v-select :options="['Ehre', 'degno']" />
      <BaseInput v-model="title" value="title" label="Title:" />
      <cropper
        v-show="file"
        ref="cropper"
        class="w-full h-64"
        classname="cropper"
        :src="file"
        :stencil-props="{
          minAspectRatio: 3 / 4,
          maxAspectRatio: 16 / 9
        }"
      />
      <label
        class="cursor-pointer font-light bg-transparent hover:bg-white text-white hover:text-grey py-2 px-4 mt-2 border border-white hover:border-transparent transition-colors duration-200"
        for="file"
        >Upload Picture</label
      >
      <input
        id="file"
        ref="file"
        name="file"
        class="inputfile"
        type="file"
        accept="image/*"
        @change="uploadImage($event)"
      />

      <BaseButton type="submit">
        Post
      </BaseButton>
    </form>
    <link
      rel="stylesheet"
      href="https://unpkg.com/vue-select@latest/dist/vue-select.css"
    />
  </div>
</template>

<script>
import Compressor from 'compressorjs'
import postingService from '@/services/postingService.js'
export default {
  middleware: 'auth',
  data() {
    return {
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      group: 1,
      file: null,
      title: ''
    }
  },
  methods: {
    // change({ coordinates, canvas }) {
    //   console.log(coordinates, canvas)
    // },
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult()
      this.coordinates = coordinates
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image
      this.file = canvas.toDataURL()
    },
    uploadImage(event) {
      // Reference to the DOM input element
      const input = event.target
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.file = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0])
      }
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      const byteString = atob(dataURI.split(',')[1])

      // separate out the mime component
      const mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: mimeString })
    },
    // uploadImage(event) {
    //   this.file = event.target.files[0]
    // },
    postData() {
      this.crop()
      const title = this.title
      const group = this.group
      const user = this.$auth.user.pk
      const router = this.$router
      // eslint-disable-next-line no-new
      new Compressor(this.dataURItoBlob(this.file), {
        quality: 0.6,
        strict: true,
        maxWidth: 1000,
        maxHeight: 1000,
        convertSize: 0,
        success(result) {
          const formData = new FormData()
          formData.append('src', result, result.name)
          // console.log(formData.entries())
          formData.append('title', title)
          formData.append('group', group)
          formData.append('creator', user)

          postingService.postPost(group, formData).then(router.push('/'))
        }
      })
      // console.log(formData.entries())
      // formData.append('title', this.title)
      // formData.append('group', this.group)
      // formData.append('creator', this.$auth.user.pk)
      // // console.log(formData.entries())
      // postingService.postPost(this.group, formData).then(this.$router.push('/'))
    },
    head() {
      return {
        title: 'Einen Beitrag Posten',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'Poste hier deinen eigenen Beitrag'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.btn {
  @apply font-light bg-transparent text-white py-2 px-4 mt-2 border border-white transition-colors duration-200;
}
.btn:hover {
  @apply bg-white text-grey border-transparent;
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.v-select {
  position: relative;
  font-family: inherit;
}
.v-select,
.v-select * {
  box-sizing: border-box;
}
@-webkit-keyframes vSelectSpinner {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
@keyframes vSelectSpinner {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
.vs__fade-enter-active,
.vs__fade-leave-active {
  pointer-events: none;
  transition: opacity 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}
.vs__fade-enter,
.vs__fade-leave-to {
  opacity: 0;
}
.vs--disabled .vs__clear,
.vs--disabled .vs__dropdown-toggle,
.vs--disabled .vs__open-indicator,
.vs--disabled .vs__search,
.vs--disabled .vs__selected {
  cursor: not-allowed;
  background-color: #f8f8f8;
}
.v-select[dir='rtl'] .vs__actions {
  padding: 0 3px 0 6px;
}
.v-select[dir='rtl'] .vs__clear {
  margin-left: 6px;
  margin-right: 0;
}
.v-select[dir='rtl'] .vs__deselect {
  margin-left: 0;
  margin-right: 2px;
}
.v-select[dir='rtl'] .vs__dropdown-menu {
  text-align: right;
}
.vs__dropdown-toggle {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: flex;
  padding: 0 0 4px;
  background: none;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  white-space: normal;
}
.vs__selected-options {
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0 2px;
  position: relative;
}
.vs__actions {
  display: flex;
  align-items: center;
  padding: 4px 6px 0 3px;
}
.vs--searchable .vs__dropdown-toggle {
  cursor: text;
}
.vs--unsearchable .vs__dropdown-toggle {
  cursor: pointer;
}
.vs--open .vs__dropdown-toggle {
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.vs__open-indicator {
  fill: rgba(60, 60, 60, 0.5);
  transform: scale(1);
  transition: transform 0.15s cubic-bezier(1, -0.115, 0.975, 0.855);
  transition-timing-function: cubic-bezier(1, -0.115, 0.975, 0.855);
}
.vs--open .vs__open-indicator {
  transform: rotate(180deg) scale(1);
}
.vs--loading .vs__open-indicator {
  opacity: 0;
}
.vs__clear {
  fill: rgba(60, 60, 60, 0.5);
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  margin-right: 8px;
}
.vs__dropdown-menu {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  z-index: 1000;
  padding: 5px 0;
  margin: 0;
  width: 100%;
  max-height: 350px;
  min-width: 160px;
  overflow-y: auto;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-top-style: none;
  border-radius: 0 0 4px 4px;
  text-align: left;
  list-style: none;
  background: #fff;
}
.vs__no-options {
  text-align: center;
}
.vs__dropdown-option {
  line-height: 1.42857143;
  display: block;
  padding: 3px 20px;
  clear: both;
  color: #333;
  white-space: nowrap;
}
.vs__dropdown-option:hover {
  cursor: pointer;
}
.vs__dropdown-option--highlight {
  background: #5897fb;
  color: #fff;
}
.vs__dropdown-option--disabled {
  background: inherit;
  color: rgba(60, 60, 60, 0.5);
}
.vs__dropdown-option--disabled:hover {
  cursor: inherit;
}
.vs__selected {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  color: #333;
  line-height: 1.4;
  margin: 4px 2px 0;
  padding: 0 0.25em;
  z-index: 0;
}
.vs__deselect {
  display: inline-flex;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin-left: 4px;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: none;
  fill: rgba(60, 60, 60, 0.5);
  text-shadow: 0 1px 0 #fff;
}
.vs--single .vs__selected {
  background-color: transparent;
  border-color: transparent;
}
.vs--single.vs--open .vs__selected {
  position: absolute;
  opacity: 0.4;
}
.vs--single.vs--searching .vs__selected {
  display: none;
}
.vs__search::-webkit-search-cancel-button {
  display: none;
}
.vs__search::-ms-clear,
.vs__search::-webkit-search-decoration,
.vs__search::-webkit-search-results-button,
.vs__search::-webkit-search-results-decoration {
  display: none;
}
.vs__search,
.vs__search:focus {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  line-height: 1.4;
  font-size: 1em;
  border: 1px solid transparent;
  border-left: none;
  outline: none;
  margin: 4px 0 0;
  padding: 0 7px;
  background: none;
  box-shadow: none;
  width: 0;
  max-width: 100%;
  flex-grow: 1;
  z-index: 1;
}
.vs__search::-webkit-input-placeholder {
  color: inherit;
}
.vs__search::-moz-placeholder {
  color: inherit;
}
.vs__search:-ms-input-placeholder {
  color: inherit;
}
.vs__search::-ms-input-placeholder {
  color: inherit;
}
.vs__search::placeholder {
  color: inherit;
}
.vs--unsearchable .vs__search {
  opacity: 1;
}
.vs--unsearchable:not(.vs--disabled) .vs__search:hover {
  cursor: pointer;
}
.vs--single.vs--searching:not(.vs--open):not(.vs--loading) .vs__search {
  opacity: 0.2;
}
.vs__spinner {
  align-self: center;
  opacity: 0;
  font-size: 5px;
  text-indent: -9999em;
  overflow: hidden;
  border: 0.9em solid hsla(0, 0%, 39.2%, 0.1);
  border-left-color: rgba(60, 60, 60, 0.45);
  transform: translateZ(0);
  -webkit-animation: vSelectSpinner 1.1s linear infinite;
  animation: vSelectSpinner 1.1s linear infinite;
  transition: opacity 0.1s;
}
.vs__spinner,
.vs__spinner:after {
  border-radius: 50%;
  width: 5em;
  height: 5em;
}
.vs--loading .vs__spinner {
  opacity: 1;
}
</style>
