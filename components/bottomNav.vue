<template>
  <div>
    <nav
      class="w-screen h-12 clearfix bg-grey1 bottom-0 fixed flex items-stretch justify-around shadow-lg"
    >
      <div class="center-items flex-grow">
        <home-outline fillColor="#ffffff" :size="32" />
      </div>
      <div class="center-items flex-grow">
        <plus-icon fillColor="#ffffff" :size="32" />
      </div>
      <div class="center-items flex-grow">
        <share-icon fillColor="#ffffff" :size="32" />
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      '32': 32
    }
  }
}
</script>

<style scoped></style>
