<template>
  <div>
    <nav
      class="w-screen h-12 clearfix bg-grey1 bottom-0 fixed flex items-stretch justify-around shadow-lg"
    >
      <nuxt-link to="/" class="center-items flex-grow">
        <home-outline fillColor="#ffffff" :size="size" />
      </nuxt-link>
      <button class="center-items flex-grow" @click="toggle">
        <plus-icon fillColor="#ffffff" :size="size" />
      </button>
      <nuxt-link to="/notifications" class="center-items flex-grow">
        <bell-outline-icon fillColor="#ffffff" :size="size" />
      </nuxt-link>
      <transition name="scale">
        <ul
          v-show="opened"
          v-click-outside="close"
          class="z-10 bg-grey3 text-white bottom-0 fixed flex flex-row h-20 S flex-grow"
        >
          <nuxt-link
            class="center-items font-light bg-transparent h-full w-24 hover:bg-white text-white hover:text-grey py-2 px-4 border border-white hover:border-transparent transition-colors duration-200"
            to="/post/"
            @click.native="close"
          >
            <p>Post</p>
          </nuxt-link>
          <nuxt-link
            class="center-items font-light bg-transparent h-full w-24 hover:bg-white text-white hover:text-grey py-2 px-4 border border-white hover:border-transparent transition-colors duration-200"
            to="/groups/new/"
            @click.native="close"
          >
            <p>Gruppe</p>
          </nuxt-link>
        </ul>
      </transition>
    </nav>
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
      size: 32,
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

<style scoped>
.scale-enter,
.scale-leave-to {
  @apply transform scale-0 origin-bottom;
}

.scale-enter-to {
  @apply transform scale-100 origin-bottom;
}

.scale-enter-active,
.scale-leave-active {
  @apply transition-transform duration-200 ease-out;
}
</style>
