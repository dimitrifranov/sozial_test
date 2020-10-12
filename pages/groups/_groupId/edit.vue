<template>
  <div class="center-items">
    <form
      class=" w-full max-w-xs h-screen center-items flex-col"
      @submit.prevent="updateGroup"
    >
      <baseInput v-model="change_to.name" value="name" label="Name:" />
      <baseInput
        v-model="change_to.description"
        value="description"
        label="Beschreibung:"
      />

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
        >Profilbild wählen</label
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
        Speichern
      </baseButton>
    </form>
  </div>
</template>

<script>
import Compressor from 'compressorjs'
export default {
  middleware: 'auth',
  data() {
    return {
      change_to: {
        name: '',
        description: ''
      },
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      },
      file: null
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
    async updateGroup() {
      const context = this
      const groupId = context.$route.params.groupId
      const apiClient = this.$axios.create({
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
      if (this.file) {
        this.crop()
        // eslint-disable-next-line no-new
        await new Compressor(this.dataURItoBlob(this.file), {
          quality: 0.2,
          strict: true,
          maxWidth: 150,
          maxHeight: 150,
          convertSize: 0,
          async success(result) {
            const formData = new FormData()
            formData.append('pic', result, 'group_' + groupId + '.jp2')
            if (context.change_to.name)
              formData.append('name', context.change_to.name)
            if (context.change_to.description)
              formData.append('description', context.change_to.description)
            formData.append('creator', context.$auth.user.pk)

            await apiClient.put('/groups/' + groupId + '/', formData, {
              params: { user: this.$auth.user.pk }
            })
            context.$router.push('/groups/' + groupId)
          }
        })
      } else {
        const formData = new FormData()
        if (context.change_to.name)
          formData.append('name', context.change_to.name)
        if (context.change_to.description)
          formData.append('description', context.change_to.description)
        formData.append('creator', context.$auth.user.pk)

        await apiClient.put('/groups/' + groupId + '/', formData, {
          params: { user: this.$auth.user.pk }
        })
        context.$router.push('/groups/' + groupId)
      }
    }
  },
  head() {
    return {
      title: 'Dein Profil bearbeiten',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Hier kannst du dein Profil bearbeiten'
        }
      ]
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
</style>
