<template>
  <nuxt-link
    class="cursor-pointer w-full h-full block bg-fixed"
    :to="post_link"
    :style="bg_style"
  >
    <!-- <img class="overflow-hidden" :src="post.src" :alt="post.title" /> -->
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
      return '/groups/' + this.post.group + '/post/' + this.post.id
    },
    bg_style() {
      return {
        background: 'url(' + this.post.src + ') 50% 50% no-repeat',
        paddingTop: '100%',
        backgroundSize: 'cover'
      }
    }
  }
}
</script>

<style scoped></style>
