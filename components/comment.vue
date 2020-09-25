<template>
  <div>
    <nuxt-link :to="creator_link" class="flex flex-row">
      <img
        :src="comment.profile_pic"
        class="h-8 w-8 border border-white mr-4"
      />
      <div class="flex flex-col mb-3 h-8">
        <p class="text-white text-2xs font-light">
          {{ comment.creator_name }}
        </p>
        <p class="text-white text-xs">
          {{ comment.comment_content }}
        </p>
      </div>
    </nuxt-link>
  </div>
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
