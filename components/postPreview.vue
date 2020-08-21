<template>
  <nuxt-link class="cursor-pointer w-full h-full" :to="post_link">
    <img class="overflow-hidden" :src="post.src" :alt="post.title" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    post_link() {
      return '/post/' + this.post.id
    }
  }
}
</script>

<style scoped></style>
