<template>
  <div>
    <header class="w-screen h-12 clearfix bg-grey1 fixed shadow-lg">
      <nuxt-link to="/users/me" class="center-items float-left  h-full w-12">
        <img :src="profilepicture" alt="icon" class="w-8 h-8" />
      </nuxt-link>
      <div class="float-left  h-full ml-8 flex items-center">
        <h1 class="text-2xl text-white">
          SOZIAL.IO
        </h1>
      </div>
      <button
        v-show="this.$auth.loggedIn"
        class="float-right bg-grey-2 h-full w-12 center-items"
        @click="toggle"
      >
        <dots-vertical-icon fillColor="#ffffff" />
      </button>
      <div
        v-show="!this.$auth.loggedIn"
        class="float-right bg-grey-2 h-full w-12 center-items flex-col text-xs font-light mr-4"
      >
        <nuxt-link
          to="/register"
          class="text-white border py-1 px-2 hover:text-grey hover:bg-white transition-colors duration-200"
        >
          register
        </nuxt-link>
      </div>
      <button
        v-show="this.$auth.loggedIn"
        class="float-right bg-grey-3 h-full w-12 center-items"
      >
        <magnify-icon fillColor="#ffffff" />
      </button>
      <div
        v-show="!this.$auth.loggedIn"
        class="float-right bg-grey-2 h-full w-12 center-items flex-col text-xs font-light mr-2"
      >
        <nuxt-link
          to="/login"
          class="text-white text-opacity-87 hover:underline"
        >
          login
        </nuxt-link>
      </div>
    </header>
    <transition name="scale">
      <ul
        v-show="opened"
        v-click-outside="close"
        class="w-2/3 max-w-xs z-10 bg-grey3 mt-4 mr-4 text-white right-0 fixed flex flex-col"
      >
        <button @click="logout()">
          logout
        </button>
        <button @click="settings()">
          options
        </button>
        <button @click="subscribe()">
          subscribe
        </button>
      </ul>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  directives: {
    ClickOutside
  },
  data() {
    return {
      opened: false
    }
  },
  // created() {
  //   // eslint-disable-next-line nuxt/no-globals-in-created
  //   window.addEventListener('scroll', this.close)
  // },
  // destroyed() {
  //   window.removeEventListener('scroll', this.close)
  // },
  computed: {
    profilepicture() {
      if (this.$auth.loggedIn) return this.$auth.user.profile_picture
      else return 'icon.png'
    }
  },

  methods: {
    toggle() {
      setTimeout(() => {
        this.opened = !this.opened
      }, 1)
    },
    close() {
      this.opened = false
    },
    logout() {
      this.$auth.logout()
      this.opened = false
    },
    subscribe() {
      this.$OneSignal.push(() => {
        this.$OneSignal.showNativePrompt()
      })
    },
    settings() {
      this.$router.push('settings')
    }
  }
}
</script>

<style scoped>
.scale-enter,
.scale-leave-to {
  @apply transform scale-0 origin-top-right;
}

.scale-enter-to {
  @apply transform scale-100 origin-top-right;
}

.scale-enter-active,
.scale-leave-active {
  @apply transition-transform duration-200 ease-out;
}
</style>
