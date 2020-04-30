<template>
  <div>
    <header class="w-screen h-12 clearfix bg-grey1 fixed">
      <div class="center-items float-left  h-full w-12">
        <img src="icon.png" alt="icon" class="w-8 h-8" />
      </div>
      <div class="float-left  h-full ml-8 flex items-center">
        <h1 class="text-3xl text-white">
          SOZIAL.IO
        </h1>
      </div>
      <div class="float-right bg-grey-2 h-full w-12 center-items">
        <share-icon fillColor="#ffffff" />
      </div>
      <div class="float-right bg-grey-3 h-full w-12 center-items">
        <share-icon fillColor="#FF0000" />
      </div>
    </header>
    <nuxt />
    <nav
      class="w-screen h-12 clearfix bg-grey1 bottom-0 fixed flex items-stretch justify-around"
    >
      <div class="center-items flex-grow">
        <share-icon />
      </div>
      <div class="center-items flex-grow">
        <share-icon />
      </div>
      <div class="center-items flex-grow">
        <share-icon />
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.center-items {
  @apply flex justify-center items-center;
}
</style>
