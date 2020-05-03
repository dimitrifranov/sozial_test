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
        @mouseover="more = true"
        @mouseleave="more = false"
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
      v-if="more"
      class="w-2/3 max-w-xs z-10 bg-grey3 mt-4 mr-4 text-white right-0 fixed"
      @mouseover="more = true"
      @mouseleave="more = false"
    >
      <li @click="$auth.logout()">
        logout
      </li>
      <li>options</li>
      <li>ehre</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      more: false
    }
  }
}
</script>

<style scoped></style>
