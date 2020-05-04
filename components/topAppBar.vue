<template>
  <div>
    <header class="w-screen h-12 clearfix bg-grey1 fixed shadow-lg">
      <div class="center-items float-left  h-full w-12">
        <img src="icon.png" alt="icon" class="w-8 h-8" />
      </div>
      <div class="float-left  h-full ml-8 flex items-center">
        <h1 class="text-2xl text-white">
          SOZIAL.IO
        </h1>
      </div>
      <button
        v-if="this.$auth.loggedIn"
        class="float-right bg-grey-2 h-full w-12 center-items"
        @click="toggle"
      >
        <dots-vertical-icon fillColor="#ffffff" />
      </button>
      <div
        v-else
        class="float-right bg-grey-2 h-full w-12 center-items flex-col text-xs font-light"
      >
        <nuxt-link to="/login" class="text-white">
          login
        </nuxt-link>
        <nuxt-link to="/register" class="text-white -mt-1">
          register
        </nuxt-link>
      </div>
      <button class="float-right bg-grey-3 h-full w-12 center-items">
        <magnify-icon fillColor="#ffffff" />
      </button>
    </header>
    <ul
      v-show="opened"
      v-click-outside="close"
      class="w-2/3 max-w-xs z-10 bg-grey3 mt-4 mr-4 text-white right-0 fixed flex flex-col"
    >
      <button @click="$auth.logout()">
        logout
      </button>
      <button>options</button>
      <button>ehre</button>
    </ul>
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
  methods: {
    toggle() {
      setTimeout(() => {
        this.opened = !this.opened
      }, 1)
    },
    close() {
      this.opened = false
    }
  }
}
</script>

<style scoped></style>
