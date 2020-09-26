<template>
  <div>
    <nav
      class="w-screen h-12 clearfix bg-grey1 bottom-0 fixed flex flex-col items-stretch justify-between shadow-lg"
    >
      <div class="flex justify-around h-full w-screen">
        <nuxt-link to="/" class="center-items flex-grow">
          <home-outline fillColor="#ffffff" :size="size" />
        </nuxt-link>
        <button class="center-items flex-grow" @click="toggle">
          <plus-icon fillColor="#ffffff" :size="size" />
        </button>
        <transition name="scale">
          <ul
            v-show="opened"
            v-click-outside="close"
            class="z-10 bg-grey3 text-white bottom-0 fixed flex flex-row h-20 flex-grow"
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
        <nuxt-link to="/notifications" class="center-items flex-grow">
          <bell-outline-icon fillColor="#ffffff" :size="size" />
        </nuxt-link>
      </div>
      <div
        class="block bg-white h-px slider w-1/3"
        :style="{ marginLeft: sliderMargin }"
      />
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
  computed: {
    sliderMargin() {
      if (this.isActive('index')) return '0%'
      else if (this.isActive('post') || this.isActive('groups-new'))
        return '33%'
      else return '66%'
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
    isActive(route) {
      return route === this.$route.name
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

.slider {
  transition: margin-left 0.2s ease-in-out;
}
</style>
