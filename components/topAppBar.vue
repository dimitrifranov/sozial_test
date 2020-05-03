<template>
  <div>
    <header class="w-screen h-12 clearfix bg-grey1 fixed shadow-lg">
      <div
        v-if="this.$auth.loggedIn"
        class="center-items float-left  h-full w-12"
      >
        <img src="icon.png" alt="icon" class="w-8 h-8" />
      </div>
      <div class="float-left  h-full ml-8 flex items-center">
        <h1 class="text-2xl text-white">
          SOZIAL.IO
        </h1>
      </div>
      <div class="float-right bg-grey-2 h-full w-12 center-items">
        <dots-vertical-icon fillColor="#ffffff" />
      </div>
      <div class="float-right bg-grey-3 h-full w-12 center-items">
        <magnify-icon fillColor="#ffffff" />
      </div>
    </header>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
