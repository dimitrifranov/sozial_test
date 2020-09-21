<template>
  <nuxt-link class="text-white text-2xs font-light" :to="creator_link">
    {{ comment.creator_name }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    creator_link() {
      return '/users/' + this.comment.creator
    }
  }
}
</script>

<style lang="scss" scoped></style>
