<template>
  <div>
    <section class="bg-grey max-w-md">
      <div class="bg-grey-3 h-8 w-full clearfix">
        <div class="float-left h-full">
          <img src="icon.png" alt="icon" class="h-8 w-8 border border-white3" />
        </div>
        <div class="float-left h-full">
          <h2 class="text-white ml-3">
            fabian_01
          </h2>
        </div>
        <div class="float-right h-full w-8 center-items">
          <share-icon fillColor="#ffffff" class="" />
        </div>
      </div>
      <img :src="src" :alt="title" class="h-64 w-full" />
      <div class=" h-8 w-full clearfix">
        <div class="h-full float-left center-items ml-3 text-xs">
          <p class="text-white">
            {{ title }}
          </p>
        </div>
        <div class="h-full float-right center-items w-8">
          <chevron-down fillColor="#ffffff" :size="size" />
        </div>
        <div class="h-full float-right center-items w-8">
          <p class="text-s text-white font-light">
            121
          </p>
        </div>
        <div class="h-full float-right center-items w-8">
          <chevron-up fillColor="#ffffff" :size="size" />
        </div>
        <div class="h-full float-right center-items w-8">
          <comment-outline fillColor="#ffffff" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      size: 32
    }
  }
}
</script>

<style scoped></style>
