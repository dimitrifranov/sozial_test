<template>
  <div class="center-items w-screen">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="postData"
    >
      <h2 class="text-white font-light mb-6">
        Neue Gruppe:
      </h2>
      <baseInput
        v-model="name"
        value="name"
        label="Name:"
        @blur="$v.name.$touch()"
      />
      <p
        v-if="!$v.name.required && $v.name.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Name der Gruppe angeben
      </p>
      <baseInput
        v-model="description"
        value="description"
        label="Beschreibung:"
        @blur="$v.description.$touch()"
      />
      <p
        v-if="!$v.description.required && $v.description.$error"
        class="text-xs text-error font-light -mt-4 mb-4 w-full"
      >
        Bitte Beschreibung hinzufügen
      </p>
      <baseToggle v-model="publicGroup" title="Gruppe öffentlich machen" />
      <cropper
        v-show="file"
        ref="cropper"
        class="w-full h-64"
        classname="cropper"
        :src="file"
        :stencil-props="{
          minAspectRatio: 1 / 1,
          maxAspectRatio: 1 / 1
        }"
      />
      <label
        class="cursor-pointer font-light bg-transparent hover:bg-white text-white hover:text-grey py-2 px-4 mt-2 border border-white hover:border-transparent transition-colors duration-200"
        for="file"
        >Bild hochladen</label
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

      <baseButton type="submit">
        Erstellen
      </baseButton>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import Compressor from 'compressorjs'
export default {
  middleware: 'auth',
  mixins: [validationMixin],
  data() {
    return {
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      file: null,
      name: '',
      description: '',
      publicGroup: true
    }
  },
  validations: {
    name: {
      required
    },
    description: {
      required
    }
  },
  methods: {
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
      this.$v.$touch()
      const apiClient = this.$axios.create({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      if (!this.$v.$invalid) {
        const name = this.name
        const publicGroup = this.publicGroup
        const description = this.description
        const user = this.$auth.user.pk
        const router = this.$router
        if (this.file) {
          this.crop()
          // eslint-disable-next-line no-new
          new Compressor(this.dataURItoBlob(this.file), {
            quality: 0.4,
            strict: true,
            maxWidth: 200,
            maxHeight: 200,
            convertSize: 0,
            success(result) {
              const formData = new FormData()
              formData.append('pic', result, result.name)
              // console.log(formData.entries())
              formData.append('name', name)
              formData.append('description', description)
              formData.append('creator', user)
              formData.append('public', publicGroup)
              apiClient.post('/groups', formData).then(router.push('/'))
            }
          })
        } else {
          const formData = new FormData()
          formData.append('name', name)
          formData.append('description', description)
          formData.append('creator', user)
          formData.append('public', publicGroup)
          apiClient.post('/groups', formData).then((res) => {
            router.push('/groups/' + res.data.id)
          })
        }
      }
    },
    head() {
      return {
        title: 'Eine Gruppe erstellen',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'Erstelle eine neue Gruppe um Beiträge mit deinen Freunden zu teilen'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
