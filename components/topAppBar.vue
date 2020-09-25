<template>
  <div>
    <header class="w-screen h-12 clearfix bg-grey1 fixed shadow-lg z-30">
      <nuxt-link
        v-if="home"
        to="/users/me"
        class="center-items float-left  h-full w-12"
      >
        <img :src="profilepicture" alt="icon" class="w-8 h-8" />
      </nuxt-link>
      <button
        v-else
        class="center-items float-left  h-full w-12"
        @click="$router.go(-1)"
      >
        <arrow-left-icon fillColor="#ffffff" />
      </button>
      <div class="float-left  h-full ml-8 flex items-center">
        <h1 class="text-xl flex text-white">
          <p>
            TSCHAU
          </p>
          <p />
          <p class="text-blue">
            .app
          </p>
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
      <nuxt-link
        v-show="this.$auth.loggedIn"
        to="/search"
        class="float-right bg-grey-3 h-full w-12 center-items"
      >
        <magnify-icon fillColor="#ffffff" />
      </nuxt-link>
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
    <section
      v-if="$nuxt.isOffline"
      class="text-error w-full fixed pt-2 text-center z-10"
    >
      Keine Internetverbindung!
    </section>
    <transition name="scale">
      <ul
        v-show="opened"
        v-click-outside="close"
        class="items-center w-2/3 max-w-xs z-30 bg-grey3 mt-4 mr-4 text-white right-0 fixed flex flex-col"
      >
        <button class="pb-1 hover:underline" @click="logout()">
          Abmelden
        </button>
        <nuxt-link class="pb-1 hover:underline" to="/settings">
          Einstellungen
        </nuxt-link>
        <!-- <button class="pb-1 hover:underline" @click="subscribe()">
          Benachrichtigungen erlauben
        </button> -->
        <nuxt-link class="pb-1 hover:underline" to="/info">
          Info
        </nuxt-link>
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
      if (this.$auth.loggedIn) {
        if (this.$auth.user.profile_picture)
          return this.$auth.user.profile_picture
        else return '/user.png'
      } else return this.$icon(144)
    },
    home() {
      return (
        this.$route.name === 'index' || this.$route.name === 'notifications'
      )
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
    }
    // subscribe() {
    //   this.$OneSignal.push(() => {
    //     this.$OneSignal.showNativePrompt()
    //   })
    // }
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
