<template>
  <div class="center-items flex-col">
    <form
      class=" w-full max-w-xs center-items flex-col pt-16"
      @submit.prevent="updateUser"
    >
      <baseInput
        v-model="user.username"
        value="username"
        label="Benutzername:"
      />
      <baseInput v-model="user.email" value="email" label="E-mail:" />
      <baseInput v-model="user.bio" value="bio" label="Bio:" />
      <baseInput
        v-model="user.password"
        value="password"
        label="Passwort:"
        type="password"
      />
      <baseInput
        v-model="user.password2"
        value="password2"
        label="Passwort nochmal:"
        type="password"
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
    <button class="btn text-error mb-16" @click="deleteUser">
      Profil löschen
    </button>
  </div>
</template>

<script>
import Compressor from 'compressorjs'
export default {
  middleware: 'auth',
  data() {
    return {
      user: {
        username: '',
        email: '',
        bio: '',
        password: '',
        password2: ''
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
    async deleteUser() {
      await this.$axios
        .delete('/users/' + this.$auth.user.pk + '/')
        .catch((e) => {
          console.log(e)
        })
      this.$auth.logout()
    },
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
    async updateUser() {
      delete this.user.password2
      const context = this
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
          quality: 0.4,
          strict: true,
          maxWidth: 200,
          maxHeight: 200,
          convertSize: 0,
          async success(result) {
            const formData = new FormData()
            formData.append(
              'profile_picture',
              result,
              context.$auth.user.username + '.jp2'
            )
            if (context.user.username)
              formData.append('username', context.user.username)
            else formData.append('username', context.$auth.user.username)
            if (context.user.email) formData.append('email', context.user.email)
            if (context.user.bio) formData.append('bio', context.user.bio)
            if (context.user.password)
              formData.append('password', context.user.password)
            else formData.append('password', context.$auth.user.password)

            const response = await apiClient.put(
              '/users/' + context.$auth.user.pk + '/',
              formData
            )
            await context.$auth.setUser(response.data)
            context.$router.push('/users/me')
          }
        })
      } else {
        const formData = new FormData()
        if (this.user.username) formData.append('username', this.user.username)
        else formData.append('username', this.$auth.user.username)
        if (this.user.email) formData.append('email', this.user.email)
        if (this.user.bio) formData.append('bio', this.user.bio)
        if (this.user.password) formData.append('password', this.user.password)
        else formData.append('password', this.$auth.user.password)
        formData.append(
          'follow_post_notifs',
          this.$auth.user.follow_post_notifs
        )
        formData.append('new_follow_notifs', this.$auth.user.new_follow_notifs)
        formData.append('like_notifs', this.$auth.user.like_notifs)
        formData.append('comments_notifs', this.$auth.user.comments_notifs)

        const response = await apiClient.put(
          '/users/' + this.$auth.user.pk + '/',
          formData
        )

        await this.$auth.setUser(response.data)
        this.$router.push('/users/me')
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
  @apply bg-transparent py-2 px-4 mt-2 border border-white transition-colors duration-200;
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
